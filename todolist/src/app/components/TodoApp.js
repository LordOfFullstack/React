import React from 'react';
import TodoList from './TodoList'

let styles = {
  root: {
    margin: '0 auto',
    width: '400px'
  },
  input: {
    width: '250px',
    height: '30px',
    borderRadius: '5px',
    padding: '0 5px',
    marginRight: '8px'
  },
  button: {
    width: '120px',
    height: '30px',
    borderRadius: '5px',
    background: '#333',
    color: '#ff9933'
  },
  headers: {
    textAlign: 'center'
  },
  new: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this._updateLocalStorage();
  }

  componentDidMount() {
    var localList = JSON.parse(localStorage.getItem('list'));
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
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

  handleItemDelete = item => {
    var itemId = item.id;
    var newItems = this.state.items.filter(function(item) {
      return item.id !== itemId;
    });

    this.setState({ items: newItems });
    //console.log(this.state.items);
    //this._updateLocalStorage(newNotes)
  };

  _updateLocalStorage = () => {
    var list = JSON.stringify(this.state.items);
    localStorage.setItem('list', list);
  }

  render() {
    return (
      <div className="todo-list" style={styles.root}>
        <h3 style={styles.headers}>TODO LIST</h3>
        <TodoList
          items={this.state.items}
          point={this.state.items.length}
          onItemDelete={this.handleItemDelete}
        />
        <p className="new__todo" style={styles.new}>Задание №{this.state.items.length + 1}</p>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder='Введите задание...'
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button style={styles.button}>
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default TodoApp
