import React from 'react';

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ff0000'
    };
  }

  componentDidMount() {
    this.setState({ color: this.state.color }, () => this.props.color(this.state.color));
  }

  setColor = () => {
    let theInput = document.getElementById("color");
    let theColor = theInput.value;

    this.setState({ color: theColor }, () => this.props.color(this.state.color));

  }

  render() {
    return (
      <input id="color" type="color" defaultValue={this.state.color} onChange={this.setColor} />
    );
  }
}

export default Color;
