import React from 'react';
import TodoList from './TodoList';
import TodoNav from './TodoNav';

import './TodoApp.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      finished_tasks: [],
      new_tasks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    //this._updateLocalStorage();
  }

  componentDidMount() {
    let localList = JSON.parse(localStorage.getItem('list'));
    if (localList) {
      this.setState({ items: localList });
    }

    let a = JSON.parse(localStorage.getItem('new_tasks'));
     if (a) {
       this.setState({ new_tasks: a });
     }

     let v = JSON.parse(localStorage.getItem('finished_tasks'));
      if (v) {
        this.setState({finished_tasks: a });
      }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  }

  onChangeFilter = (filter, className = 'invisible') => {
    this.setState({
      items: filter,
      isClosed: className
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: 'unfinished',
      button_text: 'Завершить'
    };

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      new_tasks: prevState.new_tasks.concat(newItem),
      text: ''
    }), () => {
      this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
      this._updateLocalStorage(this.state.items, 'list')
      this._updateLocalStorage(this.state.new_tasks, 'new_tasks')
    });
  }

  handleItemOutline = object => {
    ( ((object.done === "unfinished") && (object.button_text === "Завершить"))
    ? (object.done = 'finished', object.button_text = "Возобновить")
    : (object.done = 'unfinished', object.button_text = "Завершить") )

    let localList = JSON.parse(localStorage.getItem('finished_tasks'));
    if (localList) {
      this.setState({ finished_tasks: localList });
    }

    // let a = JSON.parse(localStorage.getItem('new_tasks'));
    // if (a) {
    //   this.setState({ new_tasks: a });
    // }

    this.setState(prevState => ({
      finished_tasks: prevState.finished_tasks.concat(object),
    }));

    setTimeout(() => {
      let finishedArray = this.state.finished_tasks.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.items.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
        this._updateLocalStorage(this.state.items, 'list')
        this._updateLocalStorage(this.state.new_tasks, 'new_tasks')
      });
    })
  };

  handleItemDelete = item => {
    let itemId = item.id;
    let newItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({ items: newItems }, () => {
      this._updateLocalStorage(this.state.items, 'list')
      this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
    });
  };

  _updateLocalStorage = (param, storage) => {
    let list = JSON.stringify(param);
    localStorage.setItem(storage, list);
  }

  render() {
    return (
      <div className="todo-list">
        <h3>Задания</h3>
        <TodoNav
          changeFilter = {this.onChangeFilter}
          items={this.state.items}
          finishedItems = {this.state.finished_tasks}
        />
        <TodoList
          items={this.state.items}
          onItemDelete={this.handleItemDelete}
          onItemOutline={this.handleItemOutline}
        />
        <div className={this.state.isClosed}>
          <p className="new__todo">Задание №{this.state.items.length + 1}</p>
          <form onSubmit={this.handleSubmit}>
            <input
              className="input"
              placeholder='Введите задание...'
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button className="ad__button">Добавить</button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoApp
