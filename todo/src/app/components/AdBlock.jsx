import React, { Component } from 'react';

import '../css/AdBlock.less'

class AdBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      priority: 'Низкий'
    };
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(()=>{
      let itemStorage = JSON.parse(localStorage.getItem('items'));
      if (itemStorage) {
        this.setState({ items: itemStorage })
      }
    })
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.text.length) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now(),
    }

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }), () => {
      this.props.onUpdateLocalStorage(this.state.items)
      this.props.handleUpdateState(this.state.items)
    })
  }

  setPriority = (event, item) => {
    this.setState({ priority: event.target.value })
  }
  render() {
    return (
      <div className="block-to-add">
        <div className="input-group mb-3">
          <input type="text" className="add-block__input form-control"
            placeholder='Введите задание...'
            onChange={this.handleChange}
            value={this.state.text} aria-label="" aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="button" title="Добавить задание" onClick={this.handleSubmit}><i className="fa fa-plus" aria-hidden="true"></i></button>
          </div>
        </div>
        <div className='priority-block d-flex justify-content-end align-items-center' onChange={this.setPriority}>
          <span>Приоритет:</span>
          <input id="low" ref={instance => { this.lowPriority = instance }} type="radio" defaultChecked value="Низкий" name="Priority" rating='0' /><label htmlFor="low">Низкий</label>
          <input id="middle" ref={instance => { this.middlePriority = instance }} type="radio" value="Средний" name="Priority" rating='1' /><label htmlFor="middle">Средний</label>
          <input id="high" ref={instance => { this.highPriority = instance }} type="radio" value="Высокий" name="Priority" rating='2' /><label htmlFor="high">Высокий</label>
        </div>
      </div>
    );
  }
}

export default AdBlock;
