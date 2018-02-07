import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../css/TodoNav.less'

class TodoNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      searchQuery: ''
    }
  }

  componentWillMount() {
    let searchQuery = JSON.parse(localStorage.getItem('searchQuery'))
    this.setState({ searchQuery: (searchQuery) ? searchQuery : this.state.searchQuery })
  }

  componentDidMount() {
    this.setState({ searchQuery: this.state.searchQuery }, ()=> {
      const searchQuery = this.state.searchQuery.toLowerCase()
      const displayedTasks = this.state.itemsList.filter(el => {
        const searchValue = el.text.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      })

      this.props.handleUpdateState(displayedTasks)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ itemsList: nextProps.itemsArray })
  }

  handleSearchKey = event => {
    const searchQuery = event.target.value.toLowerCase()
    this.props.onUpdateLocalStorage(searchQuery, 'searchQuery')
    this.setState({ searchQuery: searchQuery })

    const displayedTasks = this.state.itemsList.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })

    this.props.handleUpdateState(displayedTasks)
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <ul className="nav navbar-nav justify-content-center nav-pills nav-fill w-50">
          <li className="nav-item"><NavLink to="/all" activeClassName='navbar-brand' className="nav-link" activeStyle={{ color: '#fff' }}>Все</NavLink></li>
          <li className="nav-item"><NavLink to="/finished" activeClassName='navbar-brand' className="nav-link" activeStyle={{ color: '#fff' }}>Завершенные</NavLink></li>
          <li className="nav-item"><NavLink to="/new" activeClassName='navbar-brand' className="nav-link" activeStyle={{ color: '#fff' }}>Новые</NavLink></li>
        </ul>
        <input
          defaultValue={this.state.searchQuery}
          id="search"
          className="form-control mr-sm-2 w-25 search_input"
          type="search"
          placeholder="Найти"
          aria-label="Search"
          onInput = {this.handleSearchKey}
        />
      </nav>
    );
  }
}

export default TodoNav;
