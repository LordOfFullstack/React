import React from 'react';
import '../css/Search.less';

import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inputVal: '',
      importantItems: []
    }
  }

  componentDidMount() {
    let itemStorage = JSON.parse(localStorage.getItem('currentItems'));

    if (itemStorage) {
      this.setState({ tasks: itemStorage });
    }

    setTimeout(() => {
      this.setState({ importantItems: this.props.importantItems })
    })
  }

  componentWillReceiveProps() {
    let items = JSON.parse(localStorage.getItem('currentItems'))

    if(items) {
      this.setState({ tasks: items });
      let sortedArrayFirst = items.slice(0);
      sortedArrayFirst.sort(function(a, b) {
        let x = a.rating.toLowerCase();
        let y = b.rating.toLowerCase();
        return x > y ? -1 : x < y ? 1 : 0;
      })

      if (this.props.onSortFirstState === true) {
        this.setState({ tasks: sortedArrayFirst });
      }

      let sortedArrayLast = items.slice(0);
      sortedArrayLast.sort(function(a, b) {
        let x = a.rating.toLowerCase();
        let y = b.rating.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })

      if (this.props.onSortLastState === true) {
        this.setState({ tasks: sortedArrayLast });
      }
    }

    if (this.input.value) {
      this.setState({ inputVal: '' })
    }

    this.setState({ inputVal: this.input.value })

    if (this.props.onCheckedState === true) {
      this.setState({ tasks: this.state.importantItems });
    }
  }

  handleUpdateState = (filter) => {
    this.setState({ tasks: filter }, () => {
      let importantItems = this.state.tasks.filter(el => {
        return el.important === "Высокий";
      })

      this.setState({ importantItems: importantItems}, () => {
      })
    })
  }

  getInputValue = () => {
    this.input.value = '';
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
          className='search_input'
          type ='search'
          onChange = {this.handleSearchKey}
          ref={el => this.input = el}
        />
      </div>
    )
  }
}

export default Search;

Search.propTypes = {
  handleChangeView: PropTypes.func,
  items: PropTypes.array
};
