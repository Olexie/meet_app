import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    warningText: '',
    showWelcomeScreen: undefined,
  };

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEventsFiltered;

      if (location == null) {
        const locationEvents =
          this.state.selectedLocation === 'all'
            ? events
            : events.filter(
                (event) => event.location === this.state.selectedLocation
              );
        locationEventsFiltered = locationEvents.slice(0, eventCount);
        this.setState({
          numberOfEvents: eventCount,
          events: locationEventsFiltered,
        });
      }

      if (eventCount == null) {
        const locationEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        locationEventsFiltered = locationEvents.slice(
          0,
          this.state.numberOfEvents
        );
        this.setState({
          selectedLocation: location,
          events: locationEventsFiltered,
        });
      }
    });
  };

  async componentDidMount() {
    this.mounted = true;
    this.promptOfflineWarning();
    /*getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
          numberOfEvents: events.length <= 32 ? events.length : 32,
          selectedLocation: 'all',
        });
      }
    });*/
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          events = events.slice(0, 32);
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'You are offline, check your internet connection',
      });
    }
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <div className="name">Meet App</div>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <WarningAlert text={this.state.warningText} />
        <h4>Events in each city</h4>

        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={this.getData()} fill="#8884d8" />
        </ScatterChart>
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
