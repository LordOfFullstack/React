import React from 'react';
import AdBlock from './AdBlock.jsx'
import TodoNav from './TodoNav.jsx'
import classNames from 'classnames';

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
        this._updateLocalStorage(this.state.finishedItems, 'finishedItems')
        this._updateLocalStorage(this.state.unfinishedItems, 'unfinishedItems')
        //console.log(this.state.finishedItems);
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
      // ( ((object.done === "unfinished") && (object.button_symbol === "glyphicon-ok"))
      // ? (object.done = 'finished', object.button_symbol = "glyphicon-repeat", object.button_class = "btn-warning", object.buttonDisplay = "none", object.class = "before", object.button_title = "Возобновить задание")
      // : (object.done = 'unfinished', object.button_symbol = "glyphicon-ok", object.button_class = "btn-success", object.buttonDisplay = "inline-block", object.class = "", object.button_title = "Завершить задание") )

      ( (el.done === "unfinished")  && (el.button_symbol === "fa-check") )
      ? (el.done = 'finished', el.button_symbol = 'fa-refresh', el.button_class = "btn-warning", el.button_title = "Возобновить задание")
      : (el.done = 'unfinished', el.button_symbol = 'fa-check', el.button_class = "btn-success", el.button_title = "Завершить задание")
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


    //
    // this.setState(prevState => ({
    //   finished_tasks: prevState.finished_tasks.concat(object),
    // }));
    //
    // setTimeout(() => {
    //   let finishedItems = this.state.generalItems.filter(el => {
    //     return el.done === "finished";
    //   });
    //
    //   let unFinishedArray = this.state.generalItems.filter(el => {
    //     return el.done === "unfinished";
    //   });
    //
    //   this.setState({
    //     finished_tasks: finishedItems,
    //     unfinishedItems: unFinishedArray
    //   }, () => {
    //     this._updateLocalStorage(this.state.generalItems, 'generalItems')
    //     this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
    //     this._updateLocalStorage(this.state.itemsToDisplay, 'list')
    //     this._updateLocalStorage(this.state.unfinishedItems, 'unfinishedItems')
    //
    //     let importantItems = this.state.generalItems.filter(el => {
    //       return el.important === "Высокий";
    //     })
    //
    //     this._updateLocalStorage(importantItems, 'importantTasks')
    //     this.navChild.state.function()
    //     this.searchFilter()
    //   });
    // })
  }

  searchQuery = searchField => {
    const searchQuery = this.TodoNav.state.searchQuery
    const displayedTasks = searchField.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })
    this._updateState(displayedTasks)
  }

  _updateState = items => {
    this.setState({ itemsToDisplay: items })
  }

  _updateLocalStorage = (array, storage = 'items') => {
    let items = JSON.stringify(array);
    localStorage.setItem(storage, items);
  }
  render() {
    // console.log(this.state.itemsCollection);
    //  console.log(this.state.currentItems);
    const classes = classNames({
      "d-block no-task-message": this.state.itemsToDisplay.length == 0,
      "d-none": this.state.itemsToDisplay.length > 0
    })
    //console.log(this.state.finishedItems);
    return (
      <main>
        <TodoNav
          ref={instance => { this.TodoNav = instance }}
          itemsArray = {
            (this.props.route === 'all' ? this.state.itemsCollection : '') || (this.props.route === 'finished' ? this.state.finishedItems : '') || (this.props.route === 'new' ? this.state.unfinishedItems : '')
          }
          handleUpdateState={this._updateState}
        />
        <p className={classes}>Нет заданий</p>
        <ol className="todo__list">
          {this.state.itemsToDisplay.map(item => (
            <li className="d-flex" key={item.id}>
              <span className='text'>{item.text}</span>
              <div className="edit-buttons">
                <button className={`edit-buttons__delete btn ${item.button_class}`} title={`${item.button_title}`} onClick={e => this.handleItemOutline(item, e)}>
                  <i className={`fa ${item.button_symbol}`} aria-hidden="true"></i>
                </button>
                <button className="edit-buttons__delete btn btn-danger" title="Удалить задание" onClick={e => this.handleItemDelete(item, e)}>
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
      </main>
    );
  }
}

export default TodoList
