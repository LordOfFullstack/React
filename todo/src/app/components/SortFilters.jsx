import React, { Component } from 'react';

import '../css/SortFilters.less'

class SortFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importantItemsCheckbox: false,
      importantItemsFirstCheckbox: false,
      importantItemsLastCheckbox: false
    }
  }

  componentWillMount() {
    let status = JSON.parse(localStorage.getItem('checkboxStatus'))

    this.setState({
      importantItemsCheckbox: status.importantItemsCheckbox,
      importantItemsFirstCheckbox: status.importantItemsFirstCheckbox,
      importantItemsLastCheckbox: status.importantItemsLastCheckbox
    })
  }

  _filter = () => {
    if (this.importantItemsFirst.checked && this.filter.checked) {
      this.importantItemsFirst.checked = !this.importantItemsFirst.checked
      this._importantItemsFirst()
    }

    if (this.importantItemsLast.checked && this.filter.checked) {
      this.importantItemsLast.checked = !this.importantItemsLast.checked
      this._importantItemsLast()
    }

    this.setState({ importantItemsCheckbox: this.filter.checked }, () => {
      this.props.onUpdateLocalStorage(this.state, 'checkboxStatus')
      this.props.showImportantItems()
    })
  }

  _importantItemsFirst = () => {
    if (this.filter.checked && this.importantItemsFirst.checked) {
      this.filter.checked = !this.filter.checked
      this._filter()
    }

    if (this.importantItemsLast.checked && this.importantItemsFirst.checked) {
      this.importantItemsLast.checked = !this.importantItemsLast.checked
      this._importantItemsLast()
    }

    this.setState({ importantItemsFirstCheckbox: this.importantItemsFirst.checked }, () => {
      this.props.onUpdateLocalStorage(this.state, 'checkboxStatus')
      this.props.handleImportantItemsUp()
    })
  }

  _importantItemsLast = () => {
    if (this.filter.checked && this.importantItemsLast.checked) {
      this.filter.checked = !this.filter.checked
      this._filter()
    }

    if (this.importantItemsFirst.checked && this.importantItemsLast.checked) {
      this.importantItemsFirst.checked = !this.importantItemsFirst.checked
      this._importantItemsFirst()
    }

    this.setState({ importantItemsLastCheckbox: this.importantItemsLast.checked }, () => {
      this.props.onUpdateLocalStorage(this.state, 'checkboxStatus')
      this.props.handleImportantItemsDown()
    })
  }

  render() {
    return (
      <div className="sort d-flex flex-column">
        <h3 className="new__todo">Фильтры</h3>
        <div className='d-flex align-items-center'>
          <input
            id="important"
            defaultChecked={this.state.importantItemsCheckbox}
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
            defaultChecked={this.state.importantItemsFirstCheckbox}
            name="sort"
            ref={instance => { this.importantItemsFirst = instance }}
            onChange={this._importantItemsFirst}
            type="checkbox"
          />
          <label htmlFor="importantFirst">По снижению приоритета</label>
        </div>
        <div className='flex'>
          <input
            defaultChecked={this.state.importantItemsLastCheckbox}
            id="importantLast"
            name="sort"
            ref={instance => { this.importantItemsLast = instance }}
            onChange={this._importantItemsLast}
            type="checkbox"
          />
          <label htmlFor="importantLast">По возрастанию приоритета</label>
        </div>
        {/* <div className='flex'>
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
