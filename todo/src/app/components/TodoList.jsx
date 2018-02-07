import React from 'react';
import AdBlock from './AdBlock.jsx'
import TodoNav from './TodoNav.jsx'
import SortFilters from './SortFilters.jsx'
import classNames from 'classnames';
import moment from 'moment';

import TextareaAutosize from "react-textarea-autosize";
import PropTypes from 'prop-types';

import '../css/TodoList.less'

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToDisplay: [],
      itemsCollection: [],
      finishedItems: [],
      unfinishedItems: [],
      classChange: '',
      importantItems: [],
      importantItemsFirst: [],
      importantItemsLast: []
    };
  }

  componentDidMount() {
    const items  = this.props.items
    this._updateState(items)

    let itemStorage = JSON.parse(localStorage.getItem('items'));
    if (itemStorage) {
      this.setState({ itemsCollection: itemStorage }, () => {
        let status = JSON.parse(localStorage.getItem('checkboxStatus'))
        if (status) {
          let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')

          status.importantItemsCheckbox ? this.sortFilter() : ''
          status.importantItemsFirstCheckbox ? this._importantItemsFirstFilter() : ''
          status.importantItemsLastCheckbox ? this._importantItemsLastFilter() : ''
          status.calendarCheckbox ? this.calendarFilter(selectedDate) : ''
        }
      })
    }

    let finishedItemsStorage = JSON.parse(localStorage.getItem('finishedItems'));
    if (finishedItemsStorage) {
      this.setState({ finishedItems: finishedItemsStorage })
    }

    let unfinishedItemsStorage = JSON.parse(localStorage.getItem('unfinishedItems'));
    if (unfinishedItemsStorage) {
      this.setState({ unfinishedItems: unfinishedItemsStorage })
    }

    this.setState({ display: 'none' })
  }

  componentDidUpdate() {
    let finishedItems = this.state.itemsCollection.filter(el => {
      return el.done === "finished";
    });

    let unfinishedItems = this.state.itemsCollection.filter(el => {
      return el.done === "unfinished";
    });

    this._updateLocalStorage(finishedItems, 'finishedItems')
    this._updateLocalStorage(unfinishedItems, 'unfinishedItems')
  }

  handleItemsFilter = field => {
    field =
    (this.props.route === 'all') ? JSON.parse(localStorage.getItem('items')) : '' ||
    (this.props.route === 'finished') ? JSON.parse(localStorage.getItem('finishedItems')) : '' ||
    (this.props.route === 'new') ? JSON.parse(localStorage.getItem('unfinishedItems')) : ''

    let Items = field.filter(el=>{
      return el.important === "Высокий";
    })

    let sortedArrayUp = field.slice();
    sortedArrayUp.sort(function(a, b) {
      let x = a.rating.toLowerCase();
      let y = b.rating.toLowerCase();
      return x > y ? -1 : x < y ? 1 : 0;
    })

    let sortedArrayDown = field.slice();
    sortedArrayDown.sort(function(a, b) {
      let x = a.rating.toLowerCase();
      let y = b.rating.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })

    this.setState({
      importantItems: Items,
      importantItemsFirst: sortedArrayUp,
      importantItemsLast: sortedArrayDown
    })
  }

  handleAddItem = (item) => {
    let itemStorage = JSON.parse(localStorage.getItem('items'));

    this.setState({
      itemsCollection: itemStorage,
      display: 'block'
    }, ()=> {
      this.handleItemsFilter()

      if(this.props.route === 'all') {
        this.setState(prevState => ({ itemsToDisplay: prevState.itemsToDisplay.concat(item) }), () => {

          (this.state.checkbox) ? (this.searchQuery(this.state.importantItems)) : (this.searchQuery(this.state.itemsCollection)) ||
          (this.state.importantFirstCheckbox) ? (this.searchQuery(this.state.importantItemsFirst)) : (this.searchQuery(this.state.itemsCollection)) ||
          (this.state.importantLastCheckbox) ? (this.searchQuery(this.state.importantItemsLast)) : (this.searchQuery(this.state.itemsCollection))

          if (this.state.calendarCheckbox) {
            let status = JSON.parse(localStorage.getItem('checkboxStatus'))
            let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')
            this.calendarFilter(selectedDate)
          }
        })
      }

      if(this.props.route === 'new') {
        this.setState(prevState => ({
          itemsToDisplay: prevState.itemsToDisplay.concat(item),
          unfinishedItems: prevState.unfinishedItems.concat(item)
        }), () => {
          (this.state.checkbox) ? (this.searchQuery(this.state.importantItems)) : (this.searchQuery(this.state.unfinishedItems)) ||
          (this.state.importantFirstCheckbox) ? (this.searchQuery(this.state.importantItemsFirst)) : (this.searchQuery(this.state.unfinishedItems)) ||
          (this.state.importantLastCheckbox) ? (this.searchQuery(this.state.importantItemsLast)) : (this.searchQuery(this.state.unfinishedItems))

          if (this.state.calendarCheckbox) {
            let status = JSON.parse(localStorage.getItem('checkboxStatus'))
            let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')
            this.calendarFilter(selectedDate)
          }
        })
      }
    })

    setTimeout(()=>{ this.setState({display: 'none'}) }, 1000)
  }

  handleItemDelete = item => {
    const itemId = item.id;
    const newItems = this.state.itemsToDisplay.filter(item => {
      return item.id !== itemId;
    })

    const newItemsCollection = this.state.itemsCollection.filter(item => {
      return item.id !== itemId;
    })

    this.setState({
      itemsToDisplay: newItems,
      itemsCollection: newItemsCollection
    }, () => {
      let finishedItems = this.state.itemsCollection.filter(el => {
        return el.done === "finished";
      });

      let unfinishedItems = this.state.itemsCollection.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finishedItems: finishedItems,
        unfinishedItems: unfinishedItems
      }, () => {

        this._updateLocalStorage(this.state.itemsCollection, 'items')
      })
    })
  }

  handleItemOutline = object => {
    let taskId = object.id;
    let items = this.state.itemsCollection.filter(task => {
      return task.id === taskId;
    });

    items.map(el => {
      ( (el.done === "unfinished") && (el.button_symbol === "fa-check") )
      ? (el.done = 'finished', el.button_symbol = 'fa-refresh', el.button_class = "btn-warning", el.button_title = "Возобновить задание", el.buttonDisplay = "none", el.class = "before")
      : (el.done = 'unfinished', el.button_symbol = 'fa-check', el.button_class = "btn-success", el.button_title = "Завершить задание", el.buttonDisplay = "inline-block", el.class = "")
    })

    if (this.props.route === 'all') {
      this.setState({ itemsToDisplay: this.state.itemsCollection }, () => {
        this._updateLocalStorage(this.state.itemsCollection)

        this.state.checkbox ? this.sortFilter() : this.searchQuery(this.state.itemsCollection) ||
        this.state.importantFirstCheckbox ? this._importantItemsFirstFilter() : this.searchQuery(this.state.itemsCollection) ||
        this.state.importantLastCheckbox ? this._importantItemsLastFilter() : this.searchQuery(this.state.itemsCollection)

        if (this.state.calendarCheckbox) {
          let status = JSON.parse(localStorage.getItem('checkboxStatus'))
          let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')
          this.calendarFilter(selectedDate)
        }
      })
    }

    if (this.props.route === 'finished') {
      let finishedItems = this.state.itemsCollection.filter(el => {
        return el.done === "finished";
      })

      this.setState({
        itemsToDisplay: finishedItems,
        finishedItems: finishedItems
      }, () => {
        this._updateLocalStorage(this.state.itemsCollection)

        this.state.checkbox ? this.sortFilter() : this.searchQuery(this.state.finishedItems) ||
        this.state.importantFirstCheckbox ? this._importantItemsFirstFilter() : this.searchQuery(this.state.finishedItems) ||
        this.state.importantLastCheckbox ? this._importantItemsLastFilter() : this.searchQuery(this.state.finishedItems)

        if (this.state.calendarCheckbox) {
          let status = JSON.parse(localStorage.getItem('checkboxStatus'))
          let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')
          this.calendarFilter(selectedDate)
        }
      })
    }

    if (this.props.route === 'new') {
      let unfinishedItems = this.state.itemsCollection.filter(el => {
        return el.done === "unfinished";
      })

      this.setState({
        itemsToDisplay: unfinishedItems,
        unfinishedItems: unfinishedItems
      }, () => {
        this._updateLocalStorage(this.state.itemsCollection)

        this.state.checkbox ? this.sortFilter() : this.searchQuery(this.state.unfinishedItems) ||
        this.state.importantFirstCheckbox ? this._importantItemsFirstFilter() : this.searchQuery(this.state.unfinishedItems) ||
        this.state.importantLastCheckbox ? this._importantItemsLastFilter() : this.searchQuery(this.state.unfinishedItems)

        if (this.state.calendarCheckbox) {
          let status = JSON.parse(localStorage.getItem('checkboxStatus'))
          let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')
          this.calendarFilter(selectedDate)
        }
      })
    }
  }

  handleItemEdit = object => {
    this.state.itemsCollection.map(el => {
      el.editable = false
      el.display = 'flex'
    })

    let itemId = object.id;
    let editedItem = this.state.itemsCollection.filter(item => {
      return item.id === itemId;
    });

    object.editable = true
    object.display = 'none'

    editedItem.map(el => {
      let index = this.state.itemsCollection.indexOf(el)
      let editable = this.state.itemsCollection.splice(index, 1, object);
    })

    this.setState({ itemsCollection: this.state.itemsCollection })
  }

  handleItemSave = object => {
    let itemId = object.id;
    let editedText = this.state.targetValue;
    let savedItem = this.state.itemsCollection.filter(item => {
      return item.id === itemId;
    })

    if(editedText.trim() === "") {
      this.setState({ textareaClass: 'box-shadow' })
      return
    }

    object.editable = false;
    object.text = editedText;
    object.display = 'flex';

    savedItem.map(el => {
      let index = this.state.itemsCollection.indexOf(el)
      let editable = this.state.itemsCollection.splice(index, 1, object);
    })
    setTimeout(() => {
      let finishedArray = this.state.itemsCollection.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.itemsCollection.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.itemsCollection, 'items')

        this.state.checkbox ? this.sortFilter() : this.searchQuery(this.state.unfinishedItems) ||
        this.state.importantFirstCheckbox ? this._importantItemsFirstFilter() : this.searchQuery(this.state.unfinishedItems) ||
        this.state.importantLastCheckbox ? this._importantItemsLastFilter() : this.searchQuery(this.state.unfinishedItems)

        if (this.state.calendarCheckbox) {
          let status = JSON.parse(localStorage.getItem('checkboxStatus'))
          let selectedDate = moment(status.selectedDate).format('DD.MM.YYYY')
          this.calendarFilter(selectedDate)
        }
      })
    })
  }

  handleItemReset = object => {
    let itemId = object.id;
    let editedItem = this.state.itemsCollection.filter(item => {
      return item.id === itemId;
    });

    object.editable = false
    object.display = 'flex'

    editedItem.map(el => {
      let index = this.state.itemsCollection.indexOf(el)
      let editable = this.state.itemsCollection.splice(index, 1, object);
    })

    this.setState({ itemsCollection: this.state.itemsCollection })
  }

  searchQuery = searchField => {
    const searchQuery = this.TodoNav.state.searchQuery
    const displayedTasks = searchField.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })
    this._updateState(displayedTasks)
  }

  getValue = e => {
    this.setState({
      targetValue: e.target.value,
      textareaClass: ''
    })
  }

  dropDownViewChange = item => {
    event.preventDefault()
    if (item.done === 'unfinished') {
      item.dropDownView === "none" ? item.dropDownView = "block" : item.dropDownView = "none"
      this.setState({ classChange: this.state.classChange })
    }
  }

  handleChangePriority = (item, e) => {
    let taskId = item.id;
    let newItem = this.state.itemsCollection.filter(task => {
      return task.id === taskId;
    });

    item.important = e.target.innerText;
    (item.important === "Высокий" ? (item.background = 'item-background-red', item.rating = '3') : '') ||
    (item.important === "Средний" ? (item.background = 'item-background-yellow', item.rating = '2') : '') ||
    (item.important === "Низкий" ? (item.background = '', item.rating = '1') : '')

    newItem.map(el => {
      let index = this.state.itemsCollection.indexOf(el)
      let removed = this.state.itemsCollection.splice(index, 1, item);
    })

    this.setState({ itemsCollection: this.state.itemsCollection }, () => {
      this._updateLocalStorage(this.state.itemsCollection, 'items')

      let importantItems = this.state.itemsCollection.filter(el => {
        return el.important === "Высокий";
      })
      let finishedArray = this.state.itemsCollection.filter(el => {
        return el.done === "finished";
      })
      let unFinishedArray = this.state.itemsCollection.filter(el => {
        return el.done === "unfinished";
      })

      this.setState({
        itemsCollection:this.state.itemsCollection,
        finishedItems: finishedArray,
        unfinishedItems: unFinishedArray
      })

      this._updateLocalStorage(finishedArray, 'finishedItems')
      this._updateLocalStorage(unFinishedArray, 'unfinishedItems')
    })

    this.dropDownViewChange(item)

    this.state.checkbox ? this.sortFilter() : ''
    this.state.importantFirstCheckbox ? this._importantItemsFirstFilter() : ''
    this.state.importantLastCheckbox ? this._importantItemsLastFilter() : ''
  }

  sortFilter = () => {
    this.props.route === 'all' ? this.sortFunction(this.state.itemsCollection) : '' ||
    this.props.route === 'finished' ? this.sortFunction(this.state.finishedItems) : '' ||
    this.props.route === 'new' ? this.sortFunction(this.state.unfinishedItems) : ''
  }

  _importantItemsFirstFilter = field => {
    field =
    this.props.route === 'all' ? this.state.itemsCollection : '' ||
    this.props.route === 'finished' ? this.state.finishedItems : '' ||
    this.props.route === 'new' ? this.state.unfinishedItems : ''

    const filter  = this.filters.state.importantItemsFirstCheckbox
    this.setState({ importantFirstCheckbox: filter}, ()=> {
    })

    if (filter) {
      let sortedArray = field.slice();
      sortedArray.sort(function(a, b) {
        let x = a.rating.toLowerCase();
        let y = b.rating.toLowerCase();
        return x > y ? -1 : x < y ? 1 : 0;
      })

      this.setState({ importantItemsFirst: sortedArray})
      this.searchQuery(sortedArray)
    }
    else {
      this.searchQuery(field)
    }
  }

  _importantItemsLastFilter = field => {
    field =
    this.props.route === 'all' ? this.state.itemsCollection : '' ||
    this.props.route === 'finished' ? this.state.finishedItems : '' ||
    this.props.route === 'new' ? this.state.unfinishedItems : ''

    const filter  = this.filters.state.importantItemsLastCheckbox
    this.setState({ importantLastCheckbox: filter })

    if (filter) {
      let sortedArray = field.slice();
      sortedArray.sort(function(a, b) {
        let x = a.rating.toLowerCase();
        let y = b.rating.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });

      this.setState({ importantItemsLast: sortedArray})
      this.searchQuery(sortedArray)
    }
    else {
      this.searchQuery(field)
    }
  }

  sortFunction = sortItems => {
    const filter  = this.filters.state.importantItemsCheckbox
    this.setState({ checkbox: filter})

    if (filter) {
      let importantItems = sortItems.filter(el => {
        return el.important === "Высокий";
      })

      this.setState({ importantItems: importantItems})
      this.searchQuery(importantItems)
    }
    else {
      this.searchQuery(sortItems)
    }
  }

  handleChangeCalendarFilteredItems = items =>{
    this.setState({ calendarFilteredItems: items })
  }

  calendarFilter = (selectedDate) => {
    let field =
    (this.props.route === 'all' ? this.state.itemsCollection : '') ||
    (this.props.route === 'finished' ? this.state.finishedItems : '') ||
    (this.props.route === 'new' ? this.state.unfinishedItems : '')

    const filter  = this.filters.state.calendarCheckbox
    this.setState({ calendarCheckbox: filter})

    if (filter) {
      this.setState({ selectedDate: selectedDate }, ()=> {

        let itemDate = field.filter(item => {
          return item.date === selectedDate;
        });

        this.setState({ calendarFilteredItems: itemDate})
        this._updateState(itemDate)
        this.searchQuery(itemDate)
      })
    }
    else {
      this._updateState(field)
      this.searchQuery(field)
    }
  }

  _updateState = items => {
    this.setState({ itemsToDisplay: items })
  }

  _updateLocalStorage = (array, storage = 'items') => {
    let items = JSON.stringify(array);
    localStorage.setItem(storage, items);
  }

  render() {
    let styles = {
      items: {
        marginLeft:'5px'
      }
    }
    const classes = classNames({
      "d-block no-task-message": this.state.itemsToDisplay.length == 0,
      "d-none": this.state.itemsToDisplay.length > 0
    })
    const { route: routing } = this.props
    return (
      <main className="d-flex justify-content-between">
        <div className="main__content">
          <TodoNav
            ref={instance => { this.TodoNav = instance }}
            itemsArray = {
              (this.state.checkbox)
              ?
              this.state.importantItems
              :

              (this.state.importantFirstCheckbox)
              ?
              this.state.importantItemsFirst
              :

              (this.state.importantLastCheckbox)
              ?
              this.state.importantItemsLast
              :

              (this.state.calendarCheckbox)
              ?
              this.state.calendarFilteredItems
              :

              (routing === 'all' ? this.state.itemsCollection : '') ||
              (routing === 'finished' ? this.state.finishedItems : '') ||
              (routing === 'new' ? this.state.unfinishedItems : '')
            }
            handleUpdateState={this._updateState}
            onUpdateLocalStorage={this._updateLocalStorage}
          />
          <div className="alert alert-success" style={{display:this.state.display}} role="alert">
            Задание добавлено
          </div>
          <p className={classes}>Нет заданий</p>
          <ol id="list" className="todo__list">
            {this.state.itemsToDisplay.map(item => (
              <li className={`d-flex ${item.class} ${item.background}`} key={item.id}>
                <div className={`item d-flex flex-column ${item.done}`}>
                  {!item.editable
                    ? (<p className='text'>{item.text}</p>)
                    : (
                      <div className="d-flex edit__block align-items-center">
                        <TextareaAutosize
                          className={`textarea ${this.state.textareaClass}`}
                          rows={4}
                          defaultValue={item.text}
                          onInput={this.getValue}
                          onFocus={this.getValue}
                          autoFocus='true'
                          placeholder="Введите задание..."
                        />
                        <div className="edit__buttons">
                          <button className="select-btn btn btn-success save-button" title="Сохранить изменения" style={styles.items} onClick={e => this.handleItemSave(item, e)}>
                            <i className="fa fa-floppy-o" aria-hidden="true"></i>
                          </button>
                          <button className="select-btn btn btn-danger" title="Отменить изменения" style={styles.items} onClick={e => this.handleItemReset(item, e)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    )
                  }
                  <div className="date">
                    <div className="dropdown">
                      <span title="Изменить приоритет" className="importance" onClick={e => this.dropDownViewChange(item, e)}>{item.important}</span>
                      <div className={`dropdown-menu ${item.dropDownView}`} style={{display: item.dropDownView}} onClick={e => this.handleChangePriority(item, e)} >
                        <a className="text-left dropdown-item">Высокий</a>
                        <a className="text-left dropdown-item">Средний</a>
                        <a className="text-left dropdown-item">Низкий</a>
                      </div>
                    </div>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="edit__buttons" style={{display: item.display}}>
                  <button className={`edit__buttons--delete btn btn-info`} title="Редактировать задание" style={{display: item.buttonDisplay}} onClick={e => this.handleItemEdit(item, e)}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button className={`edit__buttons--delete btn ${item.button_class}`} title={`${item.button_title}`} onClick={e => this.handleItemOutline(item, e)}>
                    <i className={`fa ${item.button_symbol}`} aria-hidden="true"></i>
                  </button>
                  <button className="edit__buttons--delete btn btn-danger" title="Удалить задание" onClick={e => this.handleItemDelete(item, e)}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <AdBlock
            handleUpdateState={this._updateState}
            onUpdateLocalStorage={this._updateLocalStorage}
            onAddItem={this.handleAddItem}
            onItemsFilter={this.handleItemsFilter}
          />
        </div>
        <div className="filtes">
          <SortFilters
            ref={instance => { this.filters = instance }}
            showImportantItems={this.sortFilter}
            items={this.state.itemsCollection}
            handleImportantItemsUp={this._importantItemsFirstFilter}
            handleImportantItemsDown={this._importantItemsLastFilter}
            onUpdateLocalStorage={this._updateLocalStorage}
            handleUpdateState={this._updateState}
            handleCalendarFilter={this.calendarFilter}
            onSearchQuery={this.searchQuery}
            onHandleChangeCalendarFilteredItems={this.handleChangeCalendarFilteredItems}
          />
        </div>
      </main>
    );
  }
}

export default TodoList
