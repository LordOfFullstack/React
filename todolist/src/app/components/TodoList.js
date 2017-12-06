import React from 'react';
import './TodoList.css';

let styles = {
  list : {
    listStylePosition: 'inside',
    WebkitPaddingStart: '0',
    marginBottom: '40px'
  },
  items: {
    float: 'right',
    marginLeft:'5px'
  },
  done: {

  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  setFilter = filter => {
    this.setState({selected  : filter})
  }

  done = value => {
    return 'btn ' + ((value===this.state.selected) ? 'active' : 'default');
  }

  render() {
    return (
      <ol style={styles.list}>
        {this.props.items.map(item => (
          <li key={item.id}>
            <span className={this.done(item)}>{item.text}</span>
            <button style={styles.items} onClick={this.props.onItemDelete.bind(null, item)}>Удалить</button>
            <button style={styles.items} onClick={this.setFilter.bind(null, item)}>Вычеркнуть</button>
            <hr />
          </li>
        ))}
      </ol>
    );
  }
}

export default TodoList
