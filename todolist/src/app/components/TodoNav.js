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
  }

  render() {
    return (
      <div className="nav">
        <button className={this.isActive('')} name="nav" onClick={this.setFilter.bind(this, '')}>Все</button>
        <button className={this.isActive('finished')} name="nav" onClick={this.handleFinished}>Завершенные</button>
        <button className={this.isActive('new')} name="nav" onClick={this.setFilter.bind(this, 'new')}>Новые</button>
      </div>
    );
  }
}

export default TodoNav
