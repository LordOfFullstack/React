import React from 'react';
import '../css/TodoNav.less';

import PropTypes from 'prop-types';

class TodoNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      function: this.handleAll,
      checked: false,
      sortFirst: false,
      sortLast: false
    }

    this.setFilter = this.setFilter.bind(this)
  }

  setFilter = filter => {
    this.setState({selected  : filter})
  }

  isActive = value => {
    return 'btn ' + ((value === this.state.selected) ? 'btn-info' : 'btn-default');
  }

  _updateState = () => {
    this.setState({
      checked: this.props.onCheck,
      sortFirst: this.props.onSortFirst,
      sortLast: this.props.onSortLast
    })
  }

  handleFinished = () => {
    this.setState({ function: this.handleFinished})
    this.setFilter('finished')
    let localList = JSON.parse(localStorage.getItem('finished_tasks'));
    this._updateLocalStorage(localList, 'currentItems')

    setTimeout(() => {
      if (this.state.checked) {
        if (localList) {
          let importantItems = localList.filter(el => {
            return el.important === "Важное";
          })

          this.props.changeFilter(importantItems, "")
        }
      }
      else {
        (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.finishedItems))
      }
    })

    this._sortFirst(localList)
    this._sortLast(localList)
  }

  handleAll = () => {
    this.setState({ function: this.handleAll})
    this.setFilter('')
    let localList = JSON.parse(localStorage.getItem('generalItems'));
    this._updateLocalStorage(localList, 'currentItems')

    setTimeout(() => {
      if (this.state.checked) {
        if (localList) {
          let importantItems = localList.filter(el => {
            return el.important === "Важное";
          })

          this.props.changeFilter(importantItems, "")
        }
      }
      else {
        (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter([], ""))
      }
    })

    this._sortFirst(localList)
    this._sortLast(localList)
  }

  handleNew = () => {
    this.setState({ function: this.handleNew})
    this.setFilter('new')
    let localList = JSON.parse(localStorage.getItem('new_tasks'));
    this._updateLocalStorage(localList, 'currentItems')

    setTimeout(() => {
      if (this.state.checked) {
        if (localList) {
          let importantItems = localList.filter(el => {
            return el.important === "Важное";
          })

          this.props.changeFilter(importantItems, "")
        }
      }
      else {
        (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.newItems))
      }
    })

    this._sortFirst(localList)
    this._sortLast(localList)
  }

  _sortFirst = storage => {
    if (storage) {
      setTimeout(() => {
        var sortedArray = storage.slice(0);
        sortedArray.sort(function(a, b) {
          var x = a.important.toLowerCase();
          var y = b.important.toLowerCase();
          return x > y ? -1 : x < y ? 1 : 0;
        });

        this._updateLocalStorage(sortedArray, 'sortedArrayFirst')

        if (this.state.sortFirst) {
          this.props.changeFilter(sortedArray, "")
        }
      })
    }
  }

  _sortLast = storage => {
    if (storage) {
      setTimeout(() => {
        if (this.state.sortLast) {

          var sortedArray = storage.slice(0);
          sortedArray.sort(function(a, b) {
            var x = a.important.toLowerCase();
            var y = b.important.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });

          this._updateLocalStorage(sortedArray, 'sortedArrayLast')

          if (this.state.sortLast) {
            this.props.changeFilter(sortedArray, "")
          }
        }
      })
    }
  }

  _updateLocalStorage = (param, storage) => {
    let list = JSON.stringify(param);
    localStorage.setItem(storage, list);
  }

  render() {
    return (
      <div className="navi">
        <button className={this.isActive('')} onClick={this.handleAll}>Все</button>
        <button className={this.isActive('finished')} onClick={this.handleFinished}>Завершенные</button>
        <button className={this.isActive('new')} onClick={this.handleNew}>Новые</button>
      </div>
    );
  }
}

export default TodoNav

TodoNav.propTypes = {
  changeFilter: PropTypes.func
};
