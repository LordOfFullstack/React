import React from 'react';
import './TodoList.css';

class TodoList extends React.Component {

  done = value => {
    return 'btn ' + ((value===this.state.outlined) ? 'active' : 'default');
  }

  render() {
    let styles = {
      items: {
        float: 'right',
        marginLeft:'5px'
      },
    }
    return (
      <ol className="todo__list">
        {this.props.items.map(item => (
          <li className="list__item" key={item.id}>
            <span className={item.done}>{item.text}</span>
            <button className="select-btn delete" style={styles.items} onClick={this.props.onItemDelete.bind(null, item)}>Удалить</button>
            <button className="select-btn" style={styles.items} onClick={this.props.onItemOutline.bind(null, item)}>{item.button_text}</button>
          </li>
        ))}
      </ol>
    );
  }
}

export default TodoList
