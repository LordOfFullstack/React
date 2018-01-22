import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.less';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='menu-bar'>
          <div className='menu-item'>
            <Link className='menu-item-link' to='/about'>About</Link>
          </div>

          <div className='menu-item'>
            <Link className='menu-item-link' to='/inbox'>Inbox</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
