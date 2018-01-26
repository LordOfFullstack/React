import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, NavLink, Switch, Redirect, Route} from 'react-router-dom'

import StartPage from './components/StartPage.jsx'
import Router from './components/Router.jsx';

import './index.less';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="context">
            <Route exact path="/" component={StartPage} />
            <Route path="/todolist" component={Router} />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
