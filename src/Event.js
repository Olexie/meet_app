import React, { Component } from 'react';

class Event extends Component {
  state = { collapsed: true };
  handleItemCkicked = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };
  render() {
    const { event } = this.props;
    // const { collapsed } = this.state;
    return (
      <div className="event">
        <b className="summary">summary: {event.summary}</b>
        {!this.hide && (
          <ul className="eventDetails">
            <li>description: {event.description}</li>
            <li>location: {event.location}</li>
            <li>start: {new Date(event.start.dateTime).toISOString()}</li>
            <li>finish: {new Date(event.end.dateTime).toISOString()}</li>
          </ul>
        )}
        <button
          className="showDetails"
          onClick={() => this.handleItemCkicked()}
        >
          Show Details
        </button>
      </div>
    );
  }
}
export default Event;
