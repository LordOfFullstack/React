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
      sort: false
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
      sort: this.props.onSort
    })
  }

  handleFinished = () => {
    this.setState({ function: this.handleFinished})
    this.setFilter('finished')
    let localList = JSON.parse(localStorage.getItem('finished_tasks'));

    setTimeout(() => {
      if (this.state.checked) {
        let importantItems = localList.filter(el => {
          return el.important === "Важное";
        })

        this.props.changeFilter(importantItems, "")
      }
      else {
        (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.finishedItems))
      }
    })
  }

  handleAll = () => {
    this.setState({ function: this.handleAll})
    this.setFilter('')
    let localList = JSON.parse(localStorage.getItem('generalItems'));

    setTimeout(() => {
      if (this.state.checked) {
        let importantItems = localList.filter(el => {
          return el.important === "Важное";
        })

        this.props.changeFilter(importantItems, "")
      }
      else {
        (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter([], ""))
      }
    })

    setTimeout(() => {
      if (this.state.sort) {
        alert(1)
      }
      else {
        alert(2)
      }
    })
  }

  handleNew = () => {
    this.setState({ function: this.handleNew})
    this.setFilter('new')
    let localList = JSON.parse(localStorage.getItem('new_tasks'));

    setTimeout(() => {
      if (this.state.checked) {
        let importantItems = localList.filter(el => {
          return el.important === "Важное";
        })

        this.props.changeFilter(importantItems, "")
      }
      else {
        (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.newItems))
      }
    })
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
