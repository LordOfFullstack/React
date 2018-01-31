import React, { Component } from 'react';

import TodoList from './TodoList.jsx'

class All extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] }
  }
  componentWillMount() {
    let itemStorage = JSON.parse(localStorage.getItem('items'));
    if (itemStorage) {
      this.setState({ items: itemStorage })
    }
  }
  render() {
    return (
      <div className="main">
        <TodoList
          items = {this.state.items}
          route='all'
        />
      </div>
    );
  }
}

export default All;
