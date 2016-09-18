import React, { Component } from 'react';
import './App.css';
import ServerLog from './ServerLog.js';
import UserActions from './UserActions.js';
import { connect as io } from 'socket.io-client';

var socket = io('http://localhost:3001');
socket.connect('http://localhost/foobar', { autoConnect: true});

class App extends Component {
  render() {
    return (
      <div className="container">
        <ServerLog socket={socket} />
        <UserActions socket={socket} />
      </div>
    );
  }
}

export default App;

