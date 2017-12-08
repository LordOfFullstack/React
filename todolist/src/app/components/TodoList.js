import React from 'react';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classChange: ''
    }
  }

  componentWillReceiveProps() {
    this.setState({ classChange: this.state.classChange}, () => {
      (this.ul.childNodes.length == 0)
      ? (this.setState({ classChange: 'show'}))
      : (this.setState({ classChange: 'hide'}))
    })
  }

  render() {
    let styles = {
      items: {
        marginLeft:'5px'
      },
    }
    return (
      <div className="tasks">
        <p className={this.state.classChange} data-text="empty">Нет заданий</p>
        <ol className="todo__list" ref = {el => this.ul = el}>
          {this.props.items.map(item => (
            <li className="list__item" key={item.id}>
              <span className={item.done}>{item.text}</span>
              <div className="edit__buttons">
                <button className="select-btn" name={item.button_class} data-action={this.props.display} style={styles.items} onClick={this.props.onItemOutline.bind(null, item)}>{item.button_text}</button>
                <button className="select-btn delete" style={styles.items} data-action={this.props.display} onClick={this.props.onItemDelete.bind(null, item)}>Удалить</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default TodoList
