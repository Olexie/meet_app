import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      query: 32,
      errorText: '',
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 1 || value <= 32) {
      this.setState({
        query: value,
        errorText: '',
      });
      this.props.updateEvents(null, value);
    }
    if (value < 1 || value > 32) {
      this.setState({
        query: value,
        errorText: 'Number is not valid',
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <input
          type="number"
          className="numberOfEvents"
          min={1}
          max={32}
          value={this.props.numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert className="errorMessage" text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
