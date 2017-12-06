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
    console.log(localStorage);
    let array = [];

    setTimeout( () => {
      array = JSON.parse(localStorage.getItem('notes'));
      this.setState({ displayedNotes: array })
    })

    const searchQuery = event.target.value.toLowerCase()
    const displayedNotes = this.state.displayedNotes.filter(el => {
      const searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    })

    this.props.searchArray(displayedNotes)
    this.setState({ displayedNotes: array });
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
