import React from 'react';
import { NavLink } from 'react-router-dom';

const StartPage = (props) => {
  return (
    <div className="start-page">
      <h1 className="text-center start-title">React TodoList with React-router 4</h1>
      <NavLink to="/todolist" activeClassName='active' className="btn btn-primary" activeStyle={{ color: '#fff' }}>Start</NavLink>
    </div>
  );
}

export default StartPage;
