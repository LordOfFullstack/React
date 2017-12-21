import React from 'react';
import NoteEditor from './NoteEditor';
import NotesGrid from './NotesGrid';
import NoteSearch from './NoteSearch';
import './NotesApp.css';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    let localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({ notes: localNotes });
    }
  }

  componentDidUpdate() {
    //this._updateLocalStorage();
  }

  handleNoteDelete = note => {
    let storage = JSON.parse(localStorage.getItem('notes'));
    let noteId = note.id;

    let localNotes = storage.filter(function(note) {
      return note.id !== noteId;
    });

    let newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });

    this.setState({ notes: newNotes });
    this._updateLocalStorage(localNotes)
  };

  handleNoteAdd = newNote => {
    let newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes });
    this._updateLocalStorage(newNotes)
  };

  handleSearch = item => {
    this.setState({notes:  item });
  }

  render() {
    return (
      <div className="notes-app">
        <h2 className="app-header">NotesApp</h2>
        <div className='search flex'>
          <p>Найти:</p>
          <NoteSearch notesArray={this.state.notes} searchArray={this.handleSearch} storage={this._updateLocalStorage} />
        </div>
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
      </div>
    );
  }

  _updateLocalStorage = array => {
    let notes = JSON.stringify(array);
    localStorage.setItem('notes', notes);
  }
}

export default NotesApp;
