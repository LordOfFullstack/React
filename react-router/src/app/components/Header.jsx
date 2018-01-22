import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <nav className='nav nav-bar'>
      <div className="container">
        <ul className="nav navbar-nav">
          <li><NavLink to="/home" activeClassName='active' activeStyle={{ color: 'red' }}>Home</NavLink></li>
          <li><NavLink to="/user/act" activeClassName='active' activeStyle={{ color: 'red' }}>User</NavLink></li>
          <li><NavLink to="/user/react" activeClassName='active' activeStyle={{ color: 'red' }}>ResUser</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
