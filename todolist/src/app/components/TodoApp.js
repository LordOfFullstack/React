import React from 'react';
import TodoList from './TodoList';
import TodoNav from './TodoNav';

import './TodoApp.less';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      finished_tasks: [],
      new_tasks: [],
      generalItems: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let itemStorage = JSON.parse(localStorage.getItem('generalItems'));
    if (itemStorage) {
      this.setState({
        generalItems: itemStorage,
        items: itemStorage
      });
    }

    let newTaskStorage = JSON.parse(localStorage.getItem('new_tasks'));
    if (newTaskStorage) {
      this.setState({ new_tasks: newTaskStorage });
    }

    let finishedTaskStorage = JSON.parse(localStorage.getItem('finished_tasks'));
    if (finishedTaskStorage) {
      this.setState({finished_tasks: finishedTaskStorage });
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
      button_text: 'Завершить',
      button_class: 'to_finish'
    };

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      new_tasks: prevState.new_tasks.concat(newItem),
      generalItems: prevState.generalItems.concat(newItem),
      text: ''
    }), () => {
      this._updateLocalStorage(this.state.generalItems, 'generalItems')
      this._updateLocalStorage(this.state.items, 'list')
      this._updateLocalStorage(this.state.new_tasks, 'new_tasks')
    });
  }

  handleItemOutline = object => {
    let taskId = object.id;
    let newArray = this.state.generalItems.filter(task => {
      return task.id === taskId;
    });

    ( ((object.done === "unfinished") && (object.button_text === "Завершить"))
    ? (object.done = 'finished', object.button_text = "Возобновить", object.button_class = "to_start")
    : (object.done = 'unfinished', object.button_text = "Завершить", object.button_class = "to_finish") )

    newArray.map(el => {
      let index = this.state.generalItems.indexOf(el)
      var removed = this.state.generalItems.splice(index, 1, object);
    })

    this.setState(prevState => ({
      finished_tasks: prevState.finished_tasks.concat(object),
    }));

    setTimeout(() => {
      let finishedArray = this.state.generalItems.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.generalItems.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.generalItems, 'generalItems')
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

    let newArray = this.state.generalItems.filter(item => {
      return item.id === itemId;
    });

    newArray.map(el => {
      let index = this.state.generalItems.indexOf(el)
      var removed = this.state.generalItems.splice(index, 1);
    })

    this.setState({
      items: newItems,
      generalItems: this.state.generalItems
    }, () => {
      let finishedArray = this.state.generalItems.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.generalItems.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.generalItems, 'generalItems')
        this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
        this._updateLocalStorage(this.state.items, 'list')
        this._updateLocalStorage(this.state.new_tasks, 'new_tasks')
      });
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
          ref={instance => { this.child = instance }}
          changeFilter = {this.onChangeFilter}
          items={this.state.items}
          finishedItems = {this.state.finished_tasks}
          newItems = {this.state.new_tasks}
        />
        <TodoList
          items={this.state.items}
          onItemDelete={this.handleItemDelete}
          onItemOutline={this.handleItemOutline}
          onChangeValue={this.state.text}
          display={this.state.isClosed}
        />
        <div className={this.state.isClosed}>
          <p className="new__todo">Добавить задание</p>
          <form onSubmit={this.handleSubmit}>
            <input
              className="input"
              placeholder='Введите задание...'
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button className="ad__button" onClick={() => { this.child.handleAll() }}>Добавить</button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoApp