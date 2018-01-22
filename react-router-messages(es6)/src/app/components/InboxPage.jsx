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

  handlePreviewClick = messageId => {
    this.props.history.push(`/inbox/messages/${messageId}`);
  }

  render() {
    const { messages } = this.state;
    const { messageId: selectedMessageId } = this.props.match.params;

    return (
      <div className='InboxPage'>
        <div className='messages'>
          {
            messages.map(message =>
              <MessagePreview
                key={message.id}
                selected={message.id === selectedMessageId}
                onClick={this.handlePreviewClick.bind(this, message.id)}
                title={message.subject}
                senderName={message.senderName}
              />
            )
          }
        </div>
      </div>
    );
  }
};

export default InboxPage;
