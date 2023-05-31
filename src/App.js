import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
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

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
          numberOfEvents: events.length <= 32 ? events.length : 32,
          selectedLocation: 'all',
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
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
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
