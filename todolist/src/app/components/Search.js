import React from 'react';
import '../css/Search.less';

import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inputVal: ''
    }
  }

  componentDidMount() {
    let itemStorage = JSON.parse(localStorage.getItem('generalItems'));
    if (itemStorage) {
      this.setState({ tasks: itemStorage });
    }
  }

  handleUpdateState = (filter, inputVal) => {
    console.log(this.state.inputVal);
    this.setState({
      tasks: filter,
      //inputVal: inputVal
    })

    //this.input.value = ""
  }

  handleSearchKey = event => {
    const searchQuery = event.target.value.toLowerCase()
    this.setState({ inputVal: searchQuery })

    const displayedTasks = this.state.tasks.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })

    this.props.handleChangeView(displayedTasks)
  }

  render() {
    return (
      <div className="input__search">
        <label>Найти:</label>
        <input
          type ='search'
          onChange = {this.handleSearchKey}
          ref={el => this.input = el}
        />
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  handleChangeView: PropTypes.func,
  items: PropTypes.array
};
