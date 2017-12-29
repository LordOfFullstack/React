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

    this.display = props.display;
  }

  componentWillReceiveProps() {
    this.setState({ classChange: this.state.classChange}, () => {
      (this.ul.childNodes.length == 0)
      ? (this.setState({ classChange: 'show'}))
      : (this.setState({ classChange: 'hide'}))
    })
  }

  dropDownViewChange = item => {
    item.dropDownView === "none" ? item.dropDownView = "block" : item.dropDownView = "none"
    this.setState({ classChange: this.state.classChange })
  }

  handleChangePriority = (item, e) => {
    let itemStorage = JSON.parse(localStorage.getItem('generalItems'));
    let CurrItemsStorage = JSON.parse(localStorage.getItem('currentItems'));
    let taskId = item.id;
    let newArray = itemStorage.filter(task => {
      return task.id === taskId;
    });

    let currArray = CurrItemsStorage.filter(task => {
      return task.id === taskId;
    });

    item.important = e.target.innerText;

    (item.important === "Высокий" ? (item.background = 'item-background-red', item.rating = '3') : '') ||
    (item.important === "Средний" ? (item.background = 'item-background-yellow', item.rating = '2') : '') ||
    (item.important === "Низкий" ? (item.background = '', item.rating = '1') : '')

    newArray.map(el => {
      let index = itemStorage.indexOf(el)
      let removed = itemStorage.splice(index, 1, item);
    })

    currArray.map(el => {
      let curIndex = CurrItemsStorage.indexOf(el)
      let curRemoved = CurrItemsStorage.splice(curIndex, 1, item);
    })

    this.props.onSearch(CurrItemsStorage)

    setTimeout(() => {
      this.setState({ backGround: this.state.backGround }, () => {
        this.props.onUpdateStorage(itemStorage, 'generalItems')
         this.props.onUpdateStorage(CurrItemsStorage, 'currentItems')

        let importantItems = itemStorage.filter(el => {
          return el.important === "Высокий";
        })

        let finishedArray = itemStorage.filter(el => {
          return el.done === "finished";
        });

        let unFinishedArray = itemStorage.filter(el => {
          return el.done === "unfinished";
        });

        this.props.onUpdateStorage(importantItems, 'importantTasks')
        this.props.onUpdateStorage(finishedArray, 'finished_tasks')
        this.props.onUpdateStorage(unFinishedArray, 'new_tasks')
      });
    })

    this.dropDownViewChange(item)
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
                  <div className="dropdown">
                    <span title="Изменить приоритет" ref = {el => this.span = el} className="importance" onClick={e => this.dropDownViewChange(item, e)}>{item.important}</span>
                    <div className={`dropdown-content ${item.dropDownView}`} style={{display: item.dropDownView}} onClick={e => this.handleChangePriority(item, e)} >
                      <a className="text-left">Высокий</a>
                      <a className="text-left border">Средний</a>
                      <a className="text-left">Низкий</a>
                    </div>
                  </div>
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
