import React from 'react';
import ReactDOM from 'react-dom';

import { NodesApp } from './components/NotesApp'

class App extends React.Component {
    render() {
        return (
            <div>
                <NodesApp/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('mount-point')
);
