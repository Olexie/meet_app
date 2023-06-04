import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

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
