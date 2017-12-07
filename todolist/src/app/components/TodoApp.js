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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this._updateLocalStorage();
  }

  componentDidMount() {
    let localList = JSON.parse(localStorage.getItem('list'));
    if (localList) {
      this.setState({ items: localList });
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
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
      text: ''
    }));
  }

  handleItemOutline = object => {
    ( ((object.done === "unfinished") && (object.button_text === "Завершить"))
    ? (object.done = 'finished', object.button_text = "Возобновить")
    : (object.done = 'unfinished', object.button_text = "Завершить") )

    this.setState(prevState => ({
      finished_tasks: prevState.finished_tasks.concat(object),
    }));

    setTimeout(() => {
      let finishedArray = this.state.finished_tasks.filter(el => {
        return el.done === "finished";
      });

      this.setState({
        finished_tasks: finishedArray,
      });
    })
  };

  handleItemDelete = item => {
    let itemId = item.id;
    let newItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({ items: newItems });
    //console.log(this.state.items);
    //this._updateLocalStorage(newNotes)
  };

  _updateLocalStorage = () => {
    let list = JSON.stringify(this.state.items);
    localStorage.setItem('list', list);
  }

  render() {
    return (
      <div className="todo-list">
        <h3>Задания</h3>
        <TodoNav />
        <TodoList
          items={this.state.items}
          finished = {this.state.button_text}
          point={this.state.items.length}
          onItemDelete={this.handleItemDelete}
          onItemOutline={this.handleItemOutline}
        />
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
    );
  }
}

export default TodoApp
