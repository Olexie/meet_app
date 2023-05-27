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
          events: locationEventsFiltered,
        });
      }
    });
  };

  updateNumEvents = (num_events) => {
    this.setState({
      events_num_filtered: this.state.events.slice(0, num_events),
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
          numberOfEvents: 32,
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
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;
