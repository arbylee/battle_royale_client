import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ServerLog extends Component {
  constructor(props) {
    super(props);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.handleChatTyping = this.handleChatTyping.bind(this);
    this.state = {
      chatMessages: [],
      chatInputValue: ''
    }
  }

  componentDidMount() {
    const that = this;
    that.props.socket.on('chat message', function(msg){
      that.setState({chatMessages: that.state.chatMessages.concat([msg])});
      ReactDOM.findDOMNode(that).scrollTop = 10000000;
    });

    that.props.socket.on('user action', function(msg){
      that.setState({chatMessages: that.state.chatMessages.concat([msg])});
      ReactDOM.findDOMNode(that).scrollTop = 10000000;
    });
  }

  handleChatSubmit(event) {
    event.preventDefault();
    this.props.socket.emit('chat message', this.state.chatInputValue);
    this.setState({chatInputValue: ''});
  }

  handleChatTyping(event) {
    this.setState({chatInputValue: event.target.value});
  }

  render() {
    return (
      <div className="server-log">
        <ul id="messages">
          {this.state.chatMessages.map((message, i) => {
            return <li key={i}>{message}</li>;
          })}
        </ul>
        <form className="chat-form" action="" onSubmit={this.handleChatSubmit}>
          <input id="m" autoComplete="off" value={this.state.chatInputValue} onChange={this.handleChatTyping} />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default ServerLog;

