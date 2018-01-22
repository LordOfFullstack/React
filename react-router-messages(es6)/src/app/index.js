import ReactDOM from 'react-dom';
import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom'

import AboutPage from './components/AboutPage.jsx';
import InboxPage from './components/InboxPage.jsx';
import App from '../App.jsx';
import Message from './components/Message.jsx';

ReactDOM.render(
  <BrowserRouter>
    <div className='router'>
      <Route path='/' component={App} />
      <Route path='/about' component={AboutPage} />
      <div className="flex">
        <Route path='/inbox' component={InboxPage} />
        <div className="message-container">
          <Route path='/inbox/messages/:messageId' component={Message} />
        </div>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
