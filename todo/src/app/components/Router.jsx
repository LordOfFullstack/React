import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'

import All from './All.jsx'
import Finished from './Finished.jsx'
import New from './New.jsx'

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="w-100">
          <Switch>
            <Route path="/todolist/all" component={All} />
            <Route path="/todolist/finished" component={Finished} />
            <Route path="/todolist/new" component={New} />
            <Redirect from="/todolist" to="/todolist/all" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
