import React, { Component } from 'react';

import '../css/SortFilters.less'

class SortFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { sort: '' }
  }

  _filter = () => {
    this.setState({ sort: this.filter.checked }, () => this.props.sort())
  }

  render() {
    // const { ret: this.filter.checked } = this.props
    return (
      <div className="sort d-flex flex-column">
        <h3 className="new__todo">Фильтры</h3>
        <div className='d-flex align-items-center'>
          <input
            id="important"
            name="filter"
            ref={instance => { this.filter = instance }}
            onChange={this._filter}
            type="checkbox"
          />
          <label htmlFor="important">Показывать только с высоким приоритетом</label>
        </div>
        <div className='d-flex align-items-center'>
          <input
            id="importantFirst"
            name="sort"
            ref={instance => { this.sortFirst = instance }}
            onChange={this._sortFirst}
            type="checkbox"
          />
          <label htmlFor="importantFirst">По снижению приоритета</label>
        </div>
        {/* <div className='flex'>
        <input id="importantLast" name="sort" ref={instance => { this.sortLast = instance }} onChange={this._sortLast} type="checkbox" />
        <label htmlFor="importantLast">По возрастанию приоритета</label>
      </div>
      <div className='flex'>
      <input id="toggle__calendar" name="sort" ref={instance => { this.toggleCalendar = instance }} onChange={this._toggleCalendar} type="checkbox" />
      <label htmlFor="toggle__calendar">Выбрать задания по дате</label>
    </div>
    <div className="calendar" style={{display: this.state.calendarDisplay}}>
    <DatePicker
    inline
    disabledKeyboardNavigation
    selected={this.state.selectedDate}
    onChange={this.handleChangeDate}
    locale="ru"
    maxDate={moment()}
    todayButton={"Сегодня"}
  />
</div> */}
</div>
);
}
}

export default SortFilters;
