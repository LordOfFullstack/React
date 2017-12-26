import React from 'react';
import '../css/TodoNav.less';

import PropTypes from 'prop-types';

class TodoNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      function: this.handleAll
    }

    this.setFilter = this.setFilter.bind(this)
  }

  setFilter = filter => {
    this.setState({selected  : filter})
  }

  isActive = value => {
    return 'btn ' + ((value === this.state.selected) ? 'btn-info' : 'btn-default');
  }

  handleFinished = () => {
    this.setState({ function: this.handleFinished})
    this.setFilter('finished')
    let localList = JSON.parse(localStorage.getItem('finished_tasks'));
    (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.finishedItems))


     if (this.props.onCheck) {
    //
    //
    //
    //
    //   let importantItems = localList.filter(el => {
    //     return el.important === "Важное";
    //   })
    //
    //
    //
    console.log('true');
    //
    //   this.props.changeFilter(importantItems, "")
     }
    //
    // if (!this.state.checked) {
    //
    //
    //   //console.log("false");
    //
    //   //let localList = JSON.parse(localStorage.getItem('finished_tasks'));
    //
    //   //(localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.finishedItems))
    //   this.props.changeFilter(localList, "")
    // }
  }

  handleAll = () => {
    this.setState({ function: this.handleAll})
    this.setFilter('')
    let localList = JSON.parse(localStorage.getItem('generalItems'));
    (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter([], ""))
  }

  handleNew = () => {
    this.setState({ function: this.handleNew})
    this.setFilter('new')
    let localList = JSON.parse(localStorage.getItem('new_tasks'));
    (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter(this.props.newItems))
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
