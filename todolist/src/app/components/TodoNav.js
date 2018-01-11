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
      sortLast: false,
      itemsInCategory: JSON.parse(localStorage.getItem('generalItems'))
    }

    this.setFilter = this.setFilter.bind(this)
  }

  setFilter = filter => {
    this.setState({selected: filter})
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
    let localList = JSON.parse(localStorage.getItem('finished_tasks'));
    this.setState({
      function: this.handleFinished,
      itemsInCategory: localList
    })

    this.setFilter('finished')
    this.props.onUpdateStorage(localList, 'currentItems')

    setTimeout(() => {
      if (this.state.checked) {
        if (localList) {
          let importantItems = localList.filter(el => {
            return el.important === "Высокий";
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
    let localList = JSON.parse(localStorage.getItem('generalItems'));
    this.setState({
      function: this.handleAll,
      itemsInCategory: localList
    })

    this.setFilter('')
    this.props.onUpdateStorage(localList, 'currentItems')

    setTimeout(() => {
      if (this.state.checked) {
        if (localList) {
          let importantItems = localList.filter(el => {
            return el.important === "Высокий";
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
    let localList = JSON.parse(localStorage.getItem('new_tasks'));
    this.setState({
      function: this.handleNew,
      itemsInCategory: localList
    })

    this.setFilter('new')
    this.props.onUpdateStorage(localList, 'currentItems')

    setTimeout(() => {
      if (this.state.checked) {
        if (localList) {
          let importantItems = localList.filter(el => {
            return el.important === "Высокий";
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
        let sortedArray = storage.slice(0);
        sortedArray.sort(function(a, b) {
          let x = a.rating.toLowerCase();
          let y = b.rating.toLowerCase();
          return x > y ? -1 : x < y ? 1 : 0;
        });

        this.props.onUpdateStorage(sortedArray, 'sortedArrayFirst')

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

          let sortedArray = storage.slice(0);
          sortedArray.sort(function(a, b) {
            let x = a.rating.toLowerCase();
            let y = b.rating.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });

          this.props.onUpdateStorage(sortedArray, 'sortedArrayLast')

          if (this.state.sortLast) {
            this.props.changeFilter(sortedArray, "")
          }
        }
      })
    }
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
