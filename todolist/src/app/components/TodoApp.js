import React from 'react';
import TodoList from './TodoList';
import TodoNav from './TodoNav';
import Search from './Search';

import moment from 'moment';

import '../css/TodoApp.less';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      finished_tasks: [],
      new_tasks: [],
      generalItems: [],
      warningMessage: 'none',
      boxShadow: '',
      checked: false,
      sortFirst: false,
      importantTasks: [],
      sortedArrayFirst: [],
      priority: 'Низкий',
      rating: '0'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPriority = this.setPriority.bind(this)
  }

  componentDidMount() {
    let itemStorage = JSON.parse(localStorage.getItem('generalItems'));
    if (itemStorage) {
      this.setState({
        generalItems: itemStorage,
        items: itemStorage
      }, () => {
        this._updateLocalStorage(this.state.items, 'currentItems')
      });
    }

    let newTaskStorage = JSON.parse(localStorage.getItem('new_tasks'));
    if (newTaskStorage) {
      this.setState({ new_tasks: newTaskStorage });
    }

    let finishedTaskStorage = JSON.parse(localStorage.getItem('finished_tasks'));
    if (finishedTaskStorage) {
      this.setState({finished_tasks: finishedTaskStorage });
    }

    let importantTasks = JSON.parse(localStorage.getItem('importantTasks'));
    if (importantTasks) {
      this.setState({importantTasks: importantTasks });
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  }

  onChangeFilter = (filter, className = 'invisible') => {
    this.setState({
      items: filter,
      isClosed: className
    });

    this.searchChild.handleUpdateState(filter)
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.filter.checked) {
      this.filter.checked = !this.filter.checked
      this._filter()
    }

    if (!this.state.text.length) {
      this.setState({
        warningMessage: 'inline-block',
        boxShadow: 'box-shadow'
      })
      return;
    }

    const date = moment().format('DD.MM.YYYY')
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: 'unfinished',
      button_symbol: 'glyphicon-ok',
      button_class: 'btn-success',
      button_title: 'Завершить задание',
      editable: false,
      display: 'flex',
      buttonDisplay: 'inline-block',
      class: '',
      date: date,
      rating: (this.highPriority.checked ? '3' : '') || (this.middlePriority.checked ? '2' : '') || (this.lowPriority.checked ? '1' : ''),
      important: this.state.priority,
      background: (this.highPriority.checked ? 'item-background-red' : '') || (this.middlePriority.checked ? 'item-background-yellow' : ''),
      dropDownView: 'none'
    }

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      new_tasks: prevState.new_tasks.concat(newItem),
      generalItems: prevState.generalItems.concat(newItem),
      text: ''
    }), () => {
      this._updateLocalStorage(this.state.generalItems, 'generalItems')
      this._updateLocalStorage(this.state.items, 'list')
      this._updateLocalStorage(this.state.new_tasks, 'new_tasks')

      this.searchChild.handleUpdateState(this.state.items)
      this.navChild.handleAll()

      let importantItems = this.state.generalItems.filter(el => {
        return el.important === "Высокий";
      })

      this.setState({ importantTasks: importantItems}, () => {
        this._updateLocalStorage(this.state.importantTasks, 'importantTasks')
      })
    })
  }

  handleItemEdit = object => {
    this.state.generalItems.map(el => {
      el.editable = false
      el.display = 'flex'
    })

    let itemId = object.id;
    let editedItem = this.state.generalItems.filter(item => {
      return item.id === itemId;
    });

    object.editable = true
    object.display = 'none'

    editedItem.map(el => {
      let index = this.state.generalItems.indexOf(el)
      let editable = this.state.generalItems.splice(index, 1, object);
    })

    setTimeout(() => {
      this.setState({ generalItems: this.state.generalItems })
    })
  }

  handleItemReset = object => {
    let itemId = object.id;
    let editedItem = this.state.generalItems.filter(item => {
      return item.id === itemId;
    });

    object.editable = false
    object.display = 'flex'

    editedItem.map(el => {
      let index = this.state.generalItems.indexOf(el)
      let editable = this.state.generalItems.splice(index, 1, object);
    })

    setTimeout(() => {
      this.setState({ generalItems: this.state.generalItems })
    })
  }

  handleItemSave = object => {
    let itemId = object.id;
    let editedText = this.listChild.state.targetValue;
    let savedItem = this.state.generalItems.filter(item => {
      return item.id === itemId;
    });

    if(!editedText) {
      return
    }

    object.editable = false;
    object.text = editedText;
    object.display = 'flex';

    savedItem.map(el => {
      let index = this.state.generalItems.indexOf(el)
      let editable = this.state.generalItems.splice(index, 1, object);
    })

    setTimeout(() => {
      let finishedArray = this.state.generalItems.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.generalItems.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.generalItems, 'generalItems')
        this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
        this._updateLocalStorage(this.state.items, 'list')
        this._updateLocalStorage(this.state.new_tasks, 'new_tasks')
      });
    })
  }

  handleItemOutline = object => {
    let taskId = object.id;
    let newArray = this.state.generalItems.filter(task => {
      return task.id === taskId;
    });

    ( ((object.done === "unfinished") && (object.button_symbol === "glyphicon-ok"))
    ? (object.done = 'finished', object.button_symbol = "glyphicon-repeat", object.button_class = "btn-warning", object.buttonDisplay = "none", object.class = "before", object.button_title = "Возобновить задание")
    : (object.done = 'unfinished', object.button_symbol = "glyphicon-ok", object.button_class = "btn-success", object.buttonDisplay = "inline-block", object.class = "", object.button_title = "Завершить задание") )

    newArray.map(el => {
      let index = this.state.generalItems.indexOf(el)
      let removed = this.state.generalItems.splice(index, 1, object);
    })

    this.setState(prevState => ({
      finished_tasks: prevState.finished_tasks.concat(object),
    }));

    setTimeout(() => {
      let finishedArray = this.state.generalItems.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.generalItems.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.generalItems, 'generalItems')
        this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
        this._updateLocalStorage(this.state.items, 'list')
        this._updateLocalStorage(this.state.new_tasks, 'new_tasks')

        let importantItems = this.state.generalItems.filter(el => {
          return el.important === "Высокий";
        })

        this._updateLocalStorage(importantItems, 'importantTasks')

        this.navChild.state.function()
      });

      const searchQuery = this.searchChild.state.inputVal.toLowerCase()
      const displayedTasks = this.state.items.filter(el => {
        const searchValue = el.text.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      })

      this.onChangeView(displayedTasks)
    })
  };

  handleItemDelete = item => {
    let itemId = item.id;
    let newItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    let newArray = this.state.generalItems.filter(item => {
      return item.id === itemId;
    });

    newArray.map(el => {
      let index = this.state.generalItems.indexOf(el)
      let removed = this.state.generalItems.splice(index, 1);
    })

    let curItems = JSON.parse(localStorage.getItem('currentItems'));
    let newCurItems = curItems.filter(item => {
      return item.id !== itemId;
    });

    this._updateLocalStorage(newCurItems, 'currentItems')

    this.setState({
      items: newItems,
      generalItems: this.state.generalItems
    }, () => {
      let finishedArray = this.state.generalItems.filter(el => {
        return el.done === "finished";
      });

      let unFinishedArray = this.state.generalItems.filter(el => {
        return el.done === "unfinished";
      });

      this.setState({
        finished_tasks: finishedArray,
        new_tasks: unFinishedArray
      }, () => {
        this._updateLocalStorage(this.state.generalItems, 'generalItems')
        this._updateLocalStorage(this.state.finished_tasks, 'finished_tasks')
        this._updateLocalStorage(this.state.items, 'list')
        this._updateLocalStorage(this.state.new_tasks, 'new_tasks')

        let importantItems = this.state.generalItems.filter(el => {
          return el.important === "Высокий";
        })

        this.setState({ importantTasks: importantItems}, () => {
          this._updateLocalStorage(this.state.importantTasks, 'importantTasks')
        })
      })

      this.searchFilter()
    })
  }

  _updateSearchTasks = items => {
    this.searchChild.handleUpdateState(items)
  }

  inputOnBlur = () => {
    this.setState({
      warningMessage: 'none',
      boxShadow: ''
    })
  }

  _filter = () => {
    if (this.sortFirst.checked && this.filter.checked) {
      this.sortFirst.checked = !this.sortFirst.checked
      this._sortFirst()
    }

    if (this.sortLast.checked && this.filter.checked) {
      this.sortLast.checked = !this.sortLast.checked
      this._sortLast()
    }

    setTimeout(() => {
      this.setState({ checked: !this.state.checked}, () => {
        this.navChild._updateState()
      })

      let localList = JSON.parse(localStorage.getItem('importantTasks'));

      if (this.filter.checked) {
        let importantItems = this.state.items.filter(el => {
          return el.important === "Высокий";
        })

        this.setState({ items: importantItems }, () => {
          this.searchChild.handleUpdateState(this.state.items)

          const searchQuery = this.searchChild.state.inputVal.toLowerCase()
          const displayedTasks = this.state.items.filter(el => {
            const searchValue = el.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
          })

          this.onChangeView(displayedTasks)
        })
      }
      else {
        this.navChild.state.function()

        setTimeout(() => {
          this.searchFilter()
        })
      }
    })
  }

  _sortFirst = () => {
    if (this.filter.checked && this.sortFirst.checked) {
      this.filter.checked = !this.filter.checked
      this._filter()
    }

    if (this.sortLast.checked && this.sortFirst.checked) {
      this.sortLast.checked = !this.sortLast.checked
      this._sortLast()
    }

    setTimeout(() => {
      this.setState({ sortFirst: !this.state.sortFirst}, () => {
        this.navChild._updateState()
      })

      if (this.sortFirst.checked) {
        setTimeout(() => {
          let sortedArray = this.state.items.slice(0);
          sortedArray.sort(function(a, b) {
            let x = a.rating.toLowerCase();
            let y = b.rating.toLowerCase();
            return x > y ? -1 : x < y ? 1 : 0;
          });

          this.setState({ items: sortedArray}, () => {
            this._updateLocalStorage(sortedArray, 'sortedArrayFirst')
          })
        })
      }

      else {
        this.navChild.state.function()

        setTimeout(() => {
          this.searchFilter()
        })
      }
    })
  }

  _sortLast = () => {
    if (this.filter.checked && this.sortLast.checked) {
      this.filter.checked = !this.filter.checked
      this._filter()
    }

    if (this.sortFirst.checked && this.sortLast.checked) {
      this.sortFirst.checked = !this.sortFirst.checked
      this._sortFirst()
    }

    setTimeout(() => {
      this.setState({ sortLast: !this.state.sortLast}, () => {
        this.navChild._updateState()
      })

      if (this.sortLast.checked) {
        setTimeout(() => {
          let sortedArray = this.state.items.slice(0);
          sortedArray.sort(function(a, b) {
            let x = a.rating.toLowerCase();
            let y = b.rating.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });

          this.setState({ items: sortedArray}, () => {
            this._updateLocalStorage(sortedArray, 'sortedArrayLast')
          })
        })
      }

      else {
        this.navChild.state.function()

        setTimeout(() => {
          this.searchFilter()
        })
      }
    })
  }

  searchFilter = () => {
    const searchQuery = this.searchChild.state.inputVal.toLowerCase()
    const displayedTasks = this.state.items.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })

    this.onChangeView(displayedTasks)
  }

  onChangeView = (items) => {
    this.setState({ items: items })
  }

  _updateLocalStorage = (param, storage) => {
    let list = JSON.stringify(param);
    localStorage.setItem(storage, list);
  }

  setPriority(event, item) {
    this.setState({
      priority: event.target.value
    })
  }

  render() {
    let styles = {
      marginRight: {
        marginRight:'5px'
      }
    }
    return (
      <div className="wrapper">
        <div className="todo-list">
          <h3>Задания</h3>
          <div className="flex search">
            <TodoNav
              ref={instance => { this.navChild = instance }}
              changeFilter = {this.onChangeFilter}
              changeState = {this.onUpdateState}
              items={this.state.items}
              finishedItems = {this.state.finished_tasks}
              newItems = {this.state.new_tasks}
              onCheck = {this.state.checked}
              onSortFirst = {this.state.sortFirst}
              onSortLast = {this.state.sortLast}
              onUpdateStorage={this._updateLocalStorage}
            />
            <Search
              ref={instance => { this.searchChild = instance }}
              handleChangeView={this.onChangeView}
              items={this.state.items}
              importantItems={this.state.importantTasks}
              onCheckedState={this.state.checked}
              onSortFirstState={this.state.sortFirst}
              onSortLastState={this.state.sortLast}
              onUpdateStorage={this._updateLocalStorage}
            />
          </div>
          <TodoList
            ref={instance => { this.listChild = instance }}
            items={this.state.items}
            onItemDelete={this.handleItemDelete}
            onItemOutline={this.handleItemOutline}
            onItemEdit={this.handleItemEdit}
            onItemReset={this.handleItemReset}
            onItemSave={this.handleItemSave}
            onChangeValue={this.state.text}
            display={this.state.isClosed}
            onSearch={this._updateSearchTasks}
            onUpdateStorage={this._updateLocalStorage}
          />
          <p className="new__todo">Добавить задание</p>
          <form onSubmit={this.handleSubmit}>
            <input
              className={`input ${this.state.boxShadow}`}
              placeholder='Введите задание...'
              onChange={this.handleChange}
              value={this.state.text}
              onBlur={this.inputOnBlur}
              onInput={this.inputOnBlur}
            />
            <button id="ad_item" title="Добавить задание" className="btn btn-primary ad__button"><span className="glyphicon glyphicon-plus"></span></button>
          </form>
          <div className="message__block">
            <span style={{display: this.state.warningMessage}} className='warning__message'>Введите задание</span>
            <div className='important text-right'>
              <div className='flex' onChange={this.setPriority} >
                <span style={styles.marginRight}>Приоритет:</span>
                <input id="low" ref={instance => { this.lowPriority = instance }} type="radio" defaultChecked value="Низкий" name="Priority" rating='0' /><label htmlFor="low">Низкий</label>
                <input id="middle" ref={instance => { this.middlePriority = instance }} type="radio" value="Средний" name="Priority" rating='1' /><label htmlFor="middle">Средний</label>
                <input id="high" ref={instance => { this.highPriority = instance }} type="radio" value="Высокий" name="Priority" rating='2' /><label htmlFor="high">Высокий</label>
              </div>
            </div>
          </div>
        </div>
        <div className="sort flex">
          <h3 className="new__todo">Фильтры</h3>
          <div className='flex'>
            <input id="important" name="filter" ref={instance => { this.filter = instance }} onChange={this._filter} type="checkbox" />
            <label htmlFor="important">Показывать только с высоким приоритетом</label>
          </div>
          <div className='flex'>
            <input id="importantFirst" name="sort" ref={instance => { this.sortFirst = instance }} onChange={this._sortFirst} type="checkbox" />
            <label htmlFor="importantFirst">Сначала с высокий приоритетом</label>
          </div>
          <div className='flex'>
            <input id="importantLast" name="sort" ref={instance => { this.sortLast = instance }} onChange={this._sortLast} type="checkbox" />
            <label htmlFor="importantLast">Сначала с низким приоритетом</label>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp
