import React from 'react';
import './NoteEditor.css';

class NoteEditor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: '#4eb1ba',
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

  selectColor = () => {
    let theInput = document.getElementById("color");
    let theColor = theInput.value;

    this.setState({ color: theColor });
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
          <input id="color" type="color" defaultValue={this.state.color} onChange={this.selectColor} />
          <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
        </div>
      </div>
    );
  }
}

export default NoteEditor;
