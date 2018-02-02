import React from 'react';
import AdBlock from './AdBlock.jsx'
import TodoNav from './TodoNav.jsx'
import SortFilters from './SortFilters.jsx'
import classNames from 'classnames';

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
      classChange: ''
    };
  }

  componentDidMount() {
    const items  = this.props.items
    this._updateState(items)

    let itemStorage = JSON.parse(localStorage.getItem('items'));
    if (itemStorage) {
      this.setState({ itemsCollection: itemStorage })
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

  handleAddItem = (item) => {
    let itemStorage = JSON.parse(localStorage.getItem('items'));
    this.setState({ itemsCollection: itemStorage })

    if(this.props.route !== 'finished') {
      this.setState(prevState => ({
        itemsToDisplay: prevState.itemsToDisplay.concat(item),
        unfinishedItems: prevState.unfinishedItems.concat(item)
      }), () => { (this.props.route === 'new') ? this.searchQuery(this.state.unfinishedItems) : this.searchQuery(this.state.itemsCollection) })
    }
    else {
      this.setState({ display: 'block' })
    }
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

      //console.log(this.state.finishedItems);

      //
      // const searchQuery = this.TodoNav.state.searchQuery
      // const displayedTasks = this.state.itemsCollection.filter(el => {
      //   const searchValue = el.text.toLowerCase();
      //   return searchValue.indexOf(searchQuery) !== -1;
      // })
      // this._updateState(displayedTasks)
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
        this.searchQuery(this.state.itemsCollection)
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
        this.searchQuery(this.state.finishedItems)
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
        this.searchQuery(this.state.unfinishedItems)
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

    if(!editedText) {
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
    //
    // this.handleCurentItemSave(object)
    //
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
      }, () => { this._updateLocalStorage(this.state.itemsCollection, 'items') })
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

  sortFunction = sortItems => {
    const filter  = this.filters.state.sort
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

  dropDownViewChange = item => {
    event.preventDefault()
    if (item.done === 'unfinished') {
      item.dropDownView === "none" ? item.dropDownView = "block" : item.dropDownView = "none"
      this.setState({ classChange: this.state.classChange })
    }
  }

  handleChangePriority = (item, e) => {
    //let itemStorage = this.state.itemsCollection
    // let CurrItemsStorage = JSON.parse(localStorage.getItem('currentItems'));
    let taskId = item.id;
    let newItem = this.state.itemsCollection.filter(task => {
      return task.id === taskId;
    });

    //
    // let currArray = CurrItemsStorage.filter(task => {
    //   return task.id === taskId;
    // });
    //


    // console.log(e.target.innerText);
    //
    item.important = e.target.innerText;
    (item.important === "Высокий" ? (item.background = 'item-background-red', item.rating = '3') : '') ||
    (item.important === "Средний" ? (item.background = 'item-background-yellow', item.rating = '2') : '') ||
    (item.important === "Низкий" ? (item.background = '', item.rating = '1') : '')
    //
    newItem.map(el => {
      let index = this.state.itemsCollection.indexOf(el)
      let removed = this.state.itemsCollection.splice(index, 1, item);
    })

    //
    // currArray.map(el => {
    //   let curIndex = CurrItemsStorage.indexOf(el)
    //   let curRemoved = CurrItemsStorage.splice(curIndex, 1, item);
    // })
    //
    // this.props.onSearch(CurrItemsStorage)
    //
    // setTimeout(() => {
    this.setState({ itemsCollection: this.state.itemsCollection }, () => {
      this._updateLocalStorage(this.state.itemsCollection, 'items')
      //      this.props.onUpdateStorage(CurrItemsStorage, 'currentItems')
      //
      let importantItems = this.state.itemsCollection.filter(el => {
        return el.important === "Высокий";
      })
      //
      let finishedArray = this.state.itemsCollection.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.itemsCollection.filter(el => {
        return el.done === "unfinished";
      });
      //
      //  this._updateState(importantItems, 'importantTasks')
      this._updateLocalStorage(finishedArray, 'finishedItems')
      this._updateLocalStorage(unFinishedArray, 'unfinishedItems')
      //   });
    })
    //
    this.dropDownViewChange(item)
    this.sortFilter()
  }

  sortFilter = () => {
    this.props.route === 'all' ? this.sortFunction(this.state.itemsCollection) : '' ||
    this.props.route === 'finished' ? this.sortFunction(this.state.finishedItems) : '' ||
    this.props.route === 'new' ? this.sortFunction(this.state.unfinishedItems) : ''
  }

  _updateState = items => {
    this.setState({ itemsToDisplay: items })
  }

  _updateLocalStorage = (array, storage = 'items') => {
    let items = JSON.stringify(array);
    localStorage.setItem(storage, items);
  }

  render() {
    //console.log(this.state.itemsCollection);
    //  console.log(this.state.currentItems);
    const classes = classNames({
      "d-block no-task-message": this.state.itemsToDisplay.length == 0,
      "d-none": this.state.itemsToDisplay.length > 0
    })
    let styles = {
      items: {
        marginLeft:'5px'
      }
    }
    return (
      <main className="d-flex justify-content-between">
        <div className="main__content">
          <TodoNav
            ref={instance => { this.TodoNav = instance }}
            itemsArray = {(!this.state.checkbox) ?
              (this.props.route === 'all' ? this.state.itemsCollection : '') ||
              (this.props.route === 'finished' ? this.state.finishedItems : '') ||
              (this.props.route === 'new' ? this.state.unfinishedItems : '')
              :
              this.state.importantItems
            }
            handleUpdateState={this._updateState}
          />
          <div className="alert alert-success" style={{display:this.state.display}} role="alert">
            Задание добавлено
          </div>
          <p className={classes}>Нет заданий</p>
          <ol className="todo__list">
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
          />
        </div>
        <div className="filtes">
          <SortFilters
            ref={instance => { this.filters = instance }}
            sort={this.sortFilter}
          />
        </div>
      </main>
    );
  }
}

export default TodoList
