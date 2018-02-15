import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';

import StartPage from './components/StartPage.jsx';
import All from './components/All.jsx';
import Finished from './components/Finished.jsx';
import New from './components/New.jsx';

import './index.less';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="w-100 context">
          <Switch>
            <Redirect from="/todolist" to="/all" />
            <Route exact path="/" component={StartPage} />
            <Route path="/all" component={All} />
            <Route path="/finished" component={Finished} />
            <Route path="/new" component={New} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
