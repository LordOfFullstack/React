import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../css/TodoNav.less'

class TodoNav extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.itemsArray })
  }

  handleSearchKey = event => {
    const searchQuery = event.target.value.toLowerCase()
    // this.setState({ inputVal: searchQuery })

    const displayedTasks = this.state.items.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })

    this.props.handleUpdateState(displayedTasks)
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <ul className="nav navbar-nav justify-content-center nav-pills nav-fill w-50">
          <li className="nav-item"><NavLink to="/todolist/all" activeClassName='navbar-brand' className="nav-link" activeStyle={{ color: '#fff' }}>Все</NavLink></li>
          <li className="nav-item"><NavLink to="/todolist/finished" activeClassName='navbar-brand' className="nav-link" activeStyle={{ color: '#fff' }}>Завершенные</NavLink></li>
          <li className="nav-item"><NavLink to="/todolist/new" activeClassName='navbar-brand' className="nav-link" activeStyle={{ color: '#fff' }}>Новые</NavLink></li>
        </ul>
        <input
          id="search"
          className="form-control mr-sm-2 w-25 search_input"
          type="search"
          placeholder="Найти"
          aria-label="Search"
          onChange = {this.handleSearchKey}
        />
      </nav>
    );
  }
}

export default TodoNav;
