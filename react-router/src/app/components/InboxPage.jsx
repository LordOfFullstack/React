import React, { Component } from 'react';

import MessagePreview from './MessagePreview.jsx';
import {browserHistory} from 'react-router-dom';
import messages from '../../messages.json';

import '../styles/InboxPage.less';

class InboxPage extends Component {
  // contextTypes: {
  //     router: React.PropTypes.object.isRequired
  // },


  constructor(props){
    super(props);
    this.state = { messages: messages }
  }

  // getInitialState() {
  //   return {
  //     messages
  //   };
  // }



  handlePreviewClick(messageId) {
  //browserHistory.push(`/inbox/messages/${messageId}`);
  }

  render() {

    const { messages } = this.state
    //console.log(this.state);
    //console.log(this.state.messages);
      // const { messageId: selectedMessageId } = this.props.params;

    return (
      <div className='InboxPage'>
        <div className='messages'>
          {
            messages.map(message =>
              <MessagePreview
                key={message.id}
              // selected={message.id === selectedMessageId}
               onClick={this.handlePreviewClick.bind(null, message.id)}
                title={message.subject}
                senderName={message.senderName}
              />
            )
          }
        </div>

        <div className='message-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default InboxPage;
