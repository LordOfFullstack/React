import React, { Component } from 'react';

import messages from '../../messages.json';

import '../styles/Message.less';

class Message extends Component {
  // getInitialState() {
  //   const { messageId } = this.props.params;
  //
  //   // return {
  //   //   message: messages.find(message => message.id === messageId)
  //   // };
  // }

  constructor(props){
    super(props);
    this.state = { message: messages.find(message => message.id === messageId) }


  }
componentWillMount() {
  const { messageId } = this.props.params;
}

  componentWillReceiveProps(nextProps) {
    const { messageId: prevId } = this.props.params;
    const { messageId: nextId } = nextProps.params;

    if (prevId !== nextId) {
      this.setState({
        message: messages.find(message => message.id === nextId)
      });
    }
  }

  render() {
      console.log(this.props.params);
    const { message } = this.state;

    return (
      <div className='Message'>
        <p><b>From:</b> {message.senderName} ({message.senderEmail})</p>
        <p><b>To:</b> you</p>
        <p><b>Subject:</b> {message.subject}</p>
        <hr />
        <p>{message.body}</p>
      </div>
    );
  }
};

export default Message;
