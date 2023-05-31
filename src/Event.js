import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true,
  };
  handleItemClicked = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };
  render() {
    const { event } = this.props;
    // const { collapsed } = this.state;
    return (
      <div className="event">
        <b className="summary">Summary: {event.summary}</b>
        <ul className="extraInfo">
          <li>location: {event.location}</li>
          <li>start: {new Date(event.start.dateTime).toISOString()}</li>
          <li>finish: {new Date(event.end.dateTime).toISOString()}</li>
        </ul>
        {!this.state.collapsed && (
          <ul className="eventDetails">
            <li>description: {event.description}</li>
          </ul>
        )}
        <button
          className="showDetails"
          onClick={() => this.handleItemClicked()}
        >
          Show Details
        </button>
      </div>
    );
  }
}
export default Event;
