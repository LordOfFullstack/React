import React from 'react';
import './NoteSearch.css'

let array;

class NoteSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            displayedNotes: [],
        }
    }

    updateState = () => {
        array = this.props.notesArray.slice();
        let notes = JSON.stringify(array);
        localStorage.setItem('notes', notes);

        this.setState({
            displayedNotes: this.props.notesArray,
        })
    }

    componentDidMount() {
        setTimeout(()=>{
            array = this.props.notesArray.slice();
            // let notes = JSON.stringify(array);
            // localStorage.setItem('notes', notes);
            console.log(array);

            this.setState({ displayedNotes: this.props.notesArray })
        })
    }

    handleSearchKey = event => {
        console.log(this.state.displayedNotes);

        const props = this.props.notesArray

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
                <input type='search' onChange={this.handleSearchKey} />
            </div>
        );
    }
}

export default NoteSearch;
