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
      unfinishedItems: []
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

    if (filter) {
      let importantItems = sortItems.filter(el => {
        return el.important === "Высокий";
      })

      this._updateState(importantItems)
    }
    else {
      this._updateState(sortItems)
    }
  }

  sortFilter = () => {
    if (this.props.route === 'all') {
      this.sortFunction(this.state.itemsCollection)
    }
    if (this.props.route === 'finished') {
      this.sortFunction(this.state.finishedItems)
    }
    if (this.props.route === 'new') {
      this.sortFunction(this.state.unfinishedItems)
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
    //console.log(this.state.finishedItems);
    return (
      <main className="d-flex justify-content-between">
        <div className="main__content">
          <TodoNav
            ref={instance => { this.TodoNav = instance }}
            itemsArray = { (this.props.route === 'all' ? this.state.itemsCollection : '') || (this.props.route === 'finished' ? this.state.finishedItems : '') || (this.props.route === 'new' ? this.state.unfinishedItems : '') }
            handleUpdateState={this._updateState}
          />
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
                    <span title="Изменить приоритет" className="importance">{item.important}</span>
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
