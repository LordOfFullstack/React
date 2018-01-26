import React, { Component } from 'react';
import TodoList from './TodoList.jsx'

class Finished extends Component {
  render() {
    return (
      <div className="main">
        <TodoList />
        Finished
      </div>
    );
  }
}

export default Finished;
