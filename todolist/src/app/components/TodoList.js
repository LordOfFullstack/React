import React from 'react';
import '../css/TodoList.less';

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
                ? (<span className={`item ${item.done}`}>{item.text}</span>)
                : (
                  <div className="flex edit__block">
                    <TextareaAutosize
                      rows={4}
                      defaultValue={item.text}
                      onInput={this.getValue}
                      onFocus={this.getValue}
                      autoFocus='true'
                    />
                    <div className="edit__buttons">
                      <button className="select-btn btn btn-success" style={styles.items} onClick={e => this.props.onItemSave(item, e)}><span className="glyphicon glyphicon-floppy-disk"></span></button>
                      <button className="select-btn btn btn-danger" style={styles.items} onClick={e => this.props.onItemReset(item, e)}><span className="glyphicon glyphicon-remove"></span></button>
                    </div>
                  </div>
                )
              }
              <div className="edit__buttons" style={{display: item.display}}>
                <button className="select-btn btn btn-info" style={{display: item.buttonDisplay}} onClick={e => this.props.onItemEdit(item, e)}><span className="glyphicon glyphicon-pencil"></span></button>
                <button className={`select-btn btn ${item.button_class}`} data-action={this.display} style={styles.items} onClick={e => this.props.onItemOutline(item, e)}><span className={`glyphicon ${item.button_text}`}></span></button>
                <button className="select-btn btn btn-danger" style={styles.items} data-action={this.display} onClick={e => this.props.onItemDelete(item, e)}><span className="glyphicon glyphicon-trash"></span></button>
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
