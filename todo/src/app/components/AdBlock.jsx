import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import '../css/AdBlock.less';

class AdBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      priority: 'Низкий'
    };
  }

  componentWillReceiveProps() {
    setTimeout(()=>{
      let itemStorage = JSON.parse(localStorage.getItem('items'));
      if (itemStorage) {
        this.setState({ items: itemStorage });
      }
      this.setState({
        warningMessage: '',
        boxShadow: 'none'
      });
    });
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
      warningMessage: '',
      boxShadow: ''
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.text.trim() === '') {
      this.setState({
        text: '',
        warningMessage: 'Введите задание',
        boxShadow: 'box-shadow'
      });
      return;
    }

    const date = moment().format('DD.MM.YYYY');
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: 'unfinished',
      button_symbol: 'fa-check',
      button_class: 'btn-success',
      button_title: 'Завершить задание',
      rating: (this.highPriority.checked ? '3' : '') || (this.middlePriority.checked ? '2' : '') || (this.lowPriority.checked ? '1' : ''),
      background: (this.highPriority.checked ? 'item-background-red' : '') || (this.middlePriority.checked ? 'item-background-yellow' : ''),
      class: '',
      date: date,
      editable: false,
      display: 'flex',
      buttonDisplay: 'inline-block',
      dropDownView: 'none',
      important: this.state.priority
    };

    this.setState(prevState => {return {
      items: prevState.items.concat(newItem),
      text: ''
    };}, () => {
      this.props.onUpdateLocalStorage(this.state.items);
      this.props.onAddItem(newItem);
    });

    setTimeout(()=>{
      let listItem = document.getElementById('list');
      listItem.lastChild.classList.add('item-highlight');
    });
  }

  setPriority = event => {
    this.setState({ priority: event.target.value });
  }
  render() {
    return (
      <div className="block-to-add">
        <h3 className="new__todo">Добавить задание</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className={`add-block__input form-control ${this.state.boxShadow}`}
            placeholder='Введите задание...'
            onChange={this.handleChange}
            value={this.state.text}
            aria-label=""
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button id="ad_item" className="btn btn-outline-info" type="button" title="Добавить задание" onClick={this.handleSubmit}><i className="fa fa-plus" aria-hidden="true"></i></button>
          </div>
        </div>
        <div className="d-flex justify-content-between additional-text">
          <span className='warning__message'>{this.state.warningMessage}</span>
          <div className='priority-block d-flex justify-content-end align-items-center' onChange={this.setPriority}>
            <span>Приоритет:</span>
            <input id="low" ref={instance => { this.lowPriority = instance; }} type="radio" defaultChecked value="Низкий" name="Priority" rating='0' /><label htmlFor="low">Низкий</label>
            <input id="middle" ref={instance => { this.middlePriority = instance; }} type="radio" value="Средний" name="Priority" rating='1' /><label htmlFor="middle">Средний</label>
            <input id="high" ref={instance => { this.highPriority = instance; }} type="radio" value="Высокий" name="Priority" rating='2' /><label htmlFor="high">Высокий</label>
          </div>
        </div>
      </div>
    );
  }
}

export default AdBlock;

AdBlock.propTypes = {
  onAddItem: PropTypes.func,
  onUpdateLocalStorage: PropTypes.func
};
