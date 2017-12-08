import React from 'react';
import './TodoNav.css';

class TodoNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }

    this.setFilter = this.setFilter.bind(this)
  }

  setFilter = filter => {
    this.setState({selected  : filter})
  }

  isActive = value => {
    return 'btn ' + ((value === this.state.selected) ? 'active' : 'default');
  }

  handleFinished = () => {
    this.setFilter('finished')
    let localList = JSON.parse(localStorage.getItem('finished_tasks'));
    (localList) ? (this.props.changeFilter(localList)) : (this.props.changeFilter(this.props.finishedItems))
  }

  handleAll = () => {
    this.setFilter('')
    let localList = JSON.parse(localStorage.getItem('list'));
    (localList) ? (this.props.changeFilter(localList, "")) : (this.props.changeFilter([], ""))
  }

  handleNew = () => {
    this.setFilter('new')
    let localList = JSON.parse(localStorage.getItem('new_tasks'));
    (localList) ? (this.props.changeFilter(localList)) : (this.props.changeFilter(this.props.newItems))
  }

  render() {
    return (
      <div className="nav">
        <button className={this.isActive('')} name="nav" onClick={this.handleAll}>Все</button>
        <button className={this.isActive('finished')} name="nav" onClick={this.handleFinished}>Завершенные</button>
        <button className={this.isActive('new')} name="nav" onClick={this.handleNew}>Новые</button>
      </div>
    );
  }
}

export default TodoNav
