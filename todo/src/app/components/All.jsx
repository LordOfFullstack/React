import React, { Component } from 'react';

import TodoList from './TodoList.jsx'

class All extends Component {

  render() {
    return (
      <div className="main">
        <TodoList />
      </div>
    );
  }
}

export default All;
