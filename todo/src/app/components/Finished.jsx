import React, { Component } from 'react';
import TodoList from './TodoList.jsx'

class Finished extends Component {
  constructor(props) {
    super(props);
    this.state = { finishedItems: [] }
  }
  componentWillMount() {
    let itemStorage = JSON.parse(localStorage.getItem('items'));
    if (itemStorage) {
      let finishedArray = itemStorage.filter(el => {
        return el.done === "finished";
      })
      this.setState({ finishedItems: finishedArray })
    }
  }
  render() {
    return (
      <div className="main">
        <TodoList
          items = {this.state.finishedItems}
          route='finished'
        />
      </div>
    );
  }
}

export default Finished;
