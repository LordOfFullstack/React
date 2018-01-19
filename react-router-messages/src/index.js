import ReactDOM from 'react-dom';
import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom'

import AboutPage from './components/AboutPage.jsx';
import InboxPage from './components/InboxPage.jsx';
import App from './App.jsx';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
      <Route path='/about' component={AboutPage} />
      <Route path='/inbox' component={InboxPage} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
