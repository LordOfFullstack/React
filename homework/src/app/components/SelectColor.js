import React from 'react';

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ff0000'
    };
  }

  selectColor = () => {
    let theInput = document.getElementById("color");
    let theColor = theInput.value;

    this.setState({ color: theColor });
  }

  render() {
    return (
      <input id="color" type="color" defaultValue={this.state.color} onChange={this.selectColor} />
    );
  }
}

export default Color;
