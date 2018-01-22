import React, { Component } from 'react';

// import { browserHistory } from 'react-router';

class User extends Component {
  OnNavigate = () => {
    browserHistory.push('/home')
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>User page</h3>
        <p>User ID: {this.props.match.params.id}</p>
        {/* <button onClick={this.OnNavigate} className="btn btm-primary">Go Home!</button> */}
      </div>
    );
  }
}

export default User;
