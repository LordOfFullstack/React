import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route} from 'react-router-dom'

import Root from './components/Root.jsx';
import Home from './components/Home.jsx';
import User from './components/User.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Root} />
          <Route path="/user/:id" component={User} />
          <Route path="/home" component={Home} />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
