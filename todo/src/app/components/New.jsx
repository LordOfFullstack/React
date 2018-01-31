import React, { Component } from 'react';
import TodoList from './TodoList.jsx'

class New extends Component {
  constructor(props) {
    super(props);
    this.state = { unfinishedItems: [] }
  }
  componentWillMount() {
    let itemStorage = JSON.parse(localStorage.getItem('items'));

    if (itemStorage) {
      let unfinishedArray = itemStorage.filter(el => {
        return el.done === "unfinished";
      })

      this.setState({ unfinishedItems: unfinishedArray })
    }
  }
  render() {
    return (
      <div className="main">
        <TodoList
          items = {this.state.unfinishedItems}
          route='new'
        />
      </div>
    );
  }
}

export default New;
