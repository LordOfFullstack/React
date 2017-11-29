import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
	constructor(props) {
		super(props),
		this.state = {
			value: null,
		};
	}

	render() {
		return (
			<div>
				<input id="input" type='text' onKeyUp={() => this.getValue()} />
				<button onClick={() => this.getValue()}>Submit</button>
				<p>{this.state.value}</p>
			</div>
		);
	}

	getValue() {
		let val = document.getElementById('input').value
		this.setState({value: val});
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)