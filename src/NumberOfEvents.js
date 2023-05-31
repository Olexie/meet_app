import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    query: 1,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      query: value,
    });
    this.props.updateEvents(null, value);
  };

  render() {
    return (
      <div>
        <input
          type="number"
          className="numberOfEvents"
          min={1}
          max={32}
          value={this.props.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
