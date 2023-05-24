import React, { Component } from 'react';

class CitySearch extends Component {
  constructor() {
    super();
    this.state = {
      query: 'Munich',
    };
    render();
    {
       return (
      <div className="CitySearch">
        value={this.state.query}
        <input type="text" className="city" value={this.state.query} />
        <ul className="suggestions"></ul>
      </div>;
      // );
    }
  }
}

export default CitySearch;
