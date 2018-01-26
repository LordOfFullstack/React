import React from 'react';
import AdBlock from './AdBlock.jsx'
import TodoNav from './TodoNav.jsx'
import classNames from 'classnames';

import '../css/TodoList.less'

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let itemStorage = JSON.parse(localStorage.getItem('items'));
    if (itemStorage) {
      this.setState({ items: itemStorage })
    }
  }

  _updateState = items => {
    this.setState({ items: items })
  }

  handleItemDelete = item => {
    let itemId = item.id;
    let newItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({ items: newItems }, () => this._updateLocalStorage(this.state.items))
  }

  _updateLocalStorage = array => {
    let items = JSON.stringify(array);
    localStorage.setItem('items', items);
  }

  render() {
    const itemStorage = JSON.parse(localStorage.getItem('items'));
    const classes = classNames({
      "d-block no-task-message": this.state.items.length == 0,
      "d-none": this.state.items.length > 0
    })
    return (
      <main>
        <TodoNav
          itemsArray = {itemStorage}
          handleUpdateState={this._updateState}
        />
        <p className={classes}>Нет заданий</p>
        <ol className="todo__list">
          {this.state.items.map(item => (
            <li className="d-flex" key={item.id}>
              <span className='text'>{item.text}</span>
              <div className="edit-buttons">
                <button className="edit-buttons__delete btn btn-danger" title="Удалить задание" onClick={e => this.handleItemDelete(item, e)}>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          ))}
        </ol>
        <AdBlock
          handleUpdateState={this._updateState}
          onUpdateLocalStorage={this._updateLocalStorage}
        />
      </main>
    );
  }
}

export default TodoList
