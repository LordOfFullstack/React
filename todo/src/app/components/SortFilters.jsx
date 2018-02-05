import React, { Component } from 'react';

import '../css/SortFilters.less'

class SortFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { importantItemsCheckbox: false }
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

    this.setState({ importantItemsCheckbox: this.filter.checked }, () => this.props.showImportantItems())
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

    this.setState({ importantItemsFirstCheckbox: this.importantItemsFirst.checked }, () => this.props.handleImportantItemsUp())

    //     //alert(1)
    //     // this._toggleCheckBoxes(this.filter, this.sortFirst, this._filter)
    //     // this._toggleCheckBoxes(this.sortLast, this.sortFirst, this._sortLast)
    //     // this._toggleCheckBoxes(this.toggleCalendar, this.sortFirst, this._handleSelectDateOption)
    //     //
    //     // setTimeout(() => {
    //     //   this.setState({ sortFirst: !this.state.sortFirst}, () => {
    //     //     this.navChild._updateState()
    //     //   })
    //     //
    // //    console.log(this.props.items);
    //        if (this.importantItemsFirst.checked) {
    //     //     setTimeout(() => {
    //            let sortedArray = this.props.items.slice();
    //            sortedArray.sort(function(a, b) {
    //              let x = a.rating.toLowerCase();
    //              let y = b.rating.toLowerCase();
    //              return x > y ? -1 : x < y ? 1 : 0;
    //            });
    //
    //            this.props.onUpdateState(sortedArray)
    //     //
    //     //       this.setState({ items: sortedArray }, () => {
    //     //         this._updateLocalStorage(sortedArray, 'sortedArrayFirst')
    //     //       })
    //     //
    //     //       this.searchFilter()
    //     //     })
    //        }
    //        else {
    //          console.log(this.props.items);
    //
    //          this.props.onUpdateState(this.props.items)
    //     //     this.setState({ items: (this.filter.checked || this.sortLast.checked || this.toggleCalendar.checked) ? this.state.items : this.state.itemsForDateFilter }, () => {
    //     //       this.searchChild.handleUpdateState(this.state.items)
    //     //       this.searchFilter()
    //     //     })
    //        }
    //     // })
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

    this.setState({ importantItemsLastCheckbox: this.importantItemsLast.checked }, () => this.props.handleImportantItemsDown())

    //     //alert(1)
    //     // this._toggleCheckBoxes(this.filter, this.sortFirst, this._filter)
    //     // this._toggleCheckBoxes(this.sortLast, this.sortFirst, this._sortLast)
    //     // this._toggleCheckBoxes(this.toggleCalendar, this.sortFirst, this._handleSelectDateOption)
    //     //
    //     // setTimeout(() => {
    //     //   this.setState({ sortFirst: !this.state.sortFirst}, () => {
    //     //     this.navChild._updateState()
    //     //   })
    //     //
    // //    console.log(this.props.items);
    //        if (this.importantItemsFirst.checked) {
    //     //     setTimeout(() => {
    //            let sortedArray = this.props.items.slice();
    //            sortedArray.sort(function(a, b) {
    //              let x = a.rating.toLowerCase();
    //              let y = b.rating.toLowerCase();
    //              return x > y ? -1 : x < y ? 1 : 0;
    //            });
    //
    //            this.props.onUpdateState(sortedArray)
    //     //
    //     //       this.setState({ items: sortedArray }, () => {
    //     //         this._updateLocalStorage(sortedArray, 'sortedArrayFirst')
    //     //       })
    //     //
    //     //       this.searchFilter()
    //     //     })
    //        }
    //        else {
    //          console.log(this.props.items);
    //
    //          this.props.onUpdateState(this.props.items)
    //     //     this.setState({ items: (this.filter.checked || this.sortLast.checked || this.toggleCalendar.checked) ? this.state.items : this.state.itemsForDateFilter }, () => {
    //     //       this.searchChild.handleUpdateState(this.state.items)
    //     //       this.searchFilter()
    //     //     })
    //        }
    //     // })
  }

  render() {
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
            ref={instance => { this.importantItemsFirst = instance }}
            onChange={this._importantItemsFirst}
            type="checkbox"
          />
          <label htmlFor="importantFirst">По снижению приоритета</label>
        </div>
        <div className='flex'>
          <input
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
