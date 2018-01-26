import React, { Component } from 'react';
import TodoList from './TodoList.jsx'

class New extends Component {
  render() {
    return (
      <div className="main">
        <TodoList />
        New
      </div>
    );
  }
}

export default New;
