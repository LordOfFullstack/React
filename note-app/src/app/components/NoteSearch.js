import React from 'react';
import './NoteSearch.css';

class NoteSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayedNotes: [],
    }
  }

  handleUpdateState = () => {
    array = this.props.notesArray.slice();
    this.props.storage(array)
    this.setState({
      displayedNotes: this.props.notesArray,
    })
  }

  handleSearchKey = event => {
    let array = [];
    array = JSON.parse(localStorage.getItem('notes'));

    const searchQuery = event.target.value.toLowerCase()

    this.setState({ displayedNotes: array }, () => {
      const displayedNotes = this.state.displayedNotes.filter(el => {
        const searchValue = el.text.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      })

      this.props.searchArray(displayedNotes)
    })
  }

  render() {
    return (
      <div className="note-search">
        <input
          className = 'input__search'
          type ='search'
          onChange = {this.handleSearchKey} />
        </div>
      );
    }
  }

  export default NoteSearch;
