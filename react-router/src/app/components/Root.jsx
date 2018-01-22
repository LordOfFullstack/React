import React, { Component } from 'react';

import Header from './Header.jsx'

class Root extends Component {
  render() {
    return (
      <div className="container">
        <div className="root">
          <Header />
        </div>
      </div>
    );
  }
}

export default Root;
