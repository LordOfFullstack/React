import React from 'react';
import '../css/TodoList.less';

import TextareaAutosize from "react-textarea-autosize";
import PropTypes from 'prop-types';

import Moment from 'react-moment';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classChange: '',
      targetValue: '',
      backGround: ''
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
      }
    }
    return (
      <div className="tasks">
        <p className={`empty ${this.state.classChange}`}>Нет заданий</p>
        <ol className="todo__list" ref = {el => this.ul = el}>
          {this.props.items.map(item => (
            <li className={`list__item ${item.class} ${item.background}`} key={item.id}>
              <div className={`item ${item.done}`}>
                {!item.editable
                  ? (<span className='text'>{item.text}</span>)
                  : (
                    <div className="flex edit__block">
                      <TextareaAutosize
                        className='textarea'
                        rows={4}
                        defaultValue={item.text}
                        onInput={this.getValue}
                        onFocus={this.getValue}
                        autoFocus='true'
                        placeholder="Введите задание..."
                      />
                      <div className="edit__buttons">
                        <button className="select-btn btn btn-success save-button" title="Сохранить изменения" style={styles.items} onClick={e => this.props.onItemSave(item, e)}><span className="glyphicon glyphicon-floppy-disk"></span></button>
                        <button className="select-btn btn btn-danger" title="Отменить изменения" style={styles.items} onClick={e => this.props.onItemReset(item, e)}><span className="glyphicon glyphicon-remove"></span></button>
                      </div>
                    </div>
                  )
                }
                <div className="date">
                  <span ref = {el => this.span = el} className="importance">{item.important}</span>
                  <span>{item.date}</span>
                </div>


              </div>
              <div className="edit__buttons" style={{display: item.display}}>
                <button className="select-btn btn btn-info" title="Редактировать задание" style={{display: item.buttonDisplay}} onClick={e => this.props.onItemEdit(item, e)}><span className="glyphicon glyphicon-pencil"></span></button>
                <button className={`select-btn btn ${item.button_class}`} title={item.button_title} data-action={this.display} style={styles.items} onClick={e => this.props.onItemOutline(item, e)}><span className={`glyphicon ${item.button_symbol}`}></span></button>
                <button className="select-btn btn btn-danger" style={styles.items} title="Удалить задание" data-action={this.display} onClick={e => this.props.onItemDelete(item, e)}><span className="glyphicon glyphicon-trash"></span></button>
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
