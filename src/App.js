import React, { Component } from 'react';
import './App.css';
import ServerLog from './ServerLog.js';
import { connect as io } from 'socket.io-client';

var socket = io('http://localhost:3001');
socket.connect('http://localhost/foobar', { autoConnect: true});

class App extends Component {
  componentDidMount() {
    const that = this;

    socket.on('user state', function(msg){
      that.setState({gold: msg});
    });
  }

  constructor(props) {
    super(props);
    this.handleActionSubmit = this.handleActionSubmit.bind(this);
    this.handleBetChange = this.handleBetChange.bind(this);

    this.state = {
      gold: 0,
      selectedTarget: "1"
    };
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
        <ServerLog socket={socket} />
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
