import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query: '',
  };
  render() {
    return (
      <div className="CitySearch">
        value={this.state.query}
        <input type="text" className="city" value={this.state.query} />
        <ul className="suggestions"></ul>
      </div>
    );
  }
}

export default CitySearch;
