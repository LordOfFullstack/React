import React from 'react';
import './NoteEditor.css';

import Color from './SelectColor';

class NoteEditor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: '',
    };
  }

  handleTextChange = event => {
    this.setState({ text: event.target.value });
  };

  handleNoteAdd = () => {
    var newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now()
    };

    this.props.onNoteAdd(newNote);
    this.setState({ text: '' });
  };

  handleSelectColor = color => {
    this.setState({ color: color });
  }

  render() {
    return (
      <div className="note-editor">
        <textarea
          placeholder="Enter your note here..."
          rows={5}
          className="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="flex">
          <Color color={this.handleSelectColor} />
          <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
        </div>
      </div>
    );
  }
}

export default NoteEditor;
