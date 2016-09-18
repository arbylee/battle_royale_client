import React, { Component } from 'react';
import './App.css';
import { connect as io } from 'socket.io-client';

var socket = io('http://localhost:3001');
socket.connect('http://localhost/foobar', { autoConnect: true});

class App extends Component {
  componentDidMount() {
    const that = this;
    socket.on('chat message', function(msg){
      that.setState({chatMessages: that.state.chatMessages.concat([msg])});
    });

    socket.on('user action', function(msg){
      that.setState({chatMessages: that.state.chatMessages.concat([msg])});
    });

    socket.on('user state', function(msg){
      that.setState({gold: msg});
    });
  }

  constructor(props) {
    super(props);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.handleChatTyping = this.handleChatTyping.bind(this);
    this.handleActionSubmit = this.handleActionSubmit.bind(this);
    this.handleBetChange = this.handleBetChange.bind(this);

    this.state = {
      chatMessages: [],
      chatInputValue: '',
      gold: 0,
      selectedTarget: "1"
    };
  }

  handleChatTyping(event) {
    this.setState({chatInputValue: event.target.value});
  }

  handleChatSubmit(event) {
    event.preventDefault();
    socket.emit('chat message', this.state.chatInputValue);
    this.setState({chatInputValue: ''});
  }

  handleActionSubmit(event) {
    event.preventDefault();
    socket.emit('user action', this.state.selectedTarget);
    this.setState({chatInputValue: ''});
  }

  handleBetChange(event){
    this.setState({selectedTarget: event.target.value})
  }

  render() {
    return (
      <div className="container">
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
        <div className="user-actions">
          <div className="gold">Gold: {this.state.gold}</div>
          <form className="action-form" action="" onSubmit={this.handleActionSubmit}>
            <select value={this.state.selectedTarget} onChange={this.handleBetChange}>
              <option value="1">Jam</option>
              <option value="2">Morning Fresh</option>
              <option value="3">Lune</option>
              <option value="4">Pixie</option>
              <option value="5">Madden</option>
              <option value="6">Oscar</option>
              <option value="7">Vitesse</option>
              <option value="8">Pharoah</option>
              <option value="9">Elsa</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
