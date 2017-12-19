import React from 'react';
import './TodoList.less';

import TextareaAutosize from "react-textarea-autosize";
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classChange: '',
      targetValue: ''
    }

    this.display = props.display
  }

  componentWillReceiveProps() {
    this.setState({ classChange: this.state.classChange}, () => {
      (this.ul.childNodes.length == 0)
      ? (this.setState({ classChange: 'show'}))
      : (this.setState({ classChange: 'hide'}))
    })
  }

  getNewText = () => {
    let val = this.state.targetValue;
    return val
  }

  getValue = e => {
    this.setState({ targetValue: e.target.value })
  }

  render() {
    let styles = {
      items: {
        marginLeft:'5px'
      },
    }
    return (
      <div className="tasks">
        <p className={`empty ${this.state.classChange}`}>Нет заданий</p>
        <ol className="todo__list" ref = {el => this.ul = el}>
          {this.props.items.map(item => (
            <li className="list__item" key={item.id}>
              {!item.editable
                ? (<span ref="newSpan" className={item.done}>{item.text}</span>)
                : (
                  <div className="flex edit__block">
                    <TextareaAutosize
                      rows={4}
                      defaultValue={item.text}
                      onChange={this.getValue}
                      onFocus={this.getValue}
                      autoFocus='true'
                    />
                    <div className="edit__buttons">
                      <button className="select-btn btn save" style={styles.items} onClick={this.props.onItemSave.bind(null, item)}>Сохранить</button>
                      <button className="select-btn btn reset" style={styles.items} onClick={this.props.onItemReset.bind(null, item)}>Отменить</button>
                    </div>
                  </div>
                )
              }
              <div className="edit__buttons" style={{display: item.display}}>
                <button className="select-btn btn to_edit" style={{display: item.buttonDisplay}} onClick={e => this.props.onItemEdit(item, e)}>Редактировать</button>
                <button className={`select-btn btn ${item.button_class}`} data-action={this.display} style={styles.items} onClick={this.props.onItemOutline.bind(null, item)}>{item.button_text}</button>
                <button className="select-btn btn delete" style={styles.items} data-action={this.display} onClick={e => this.props.onItemDelete(item, e)}>Удалить</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default TodoList

TodoList.propTypes = {
  items: PropTypes.array,
  onItemSave: PropTypes.func
};
