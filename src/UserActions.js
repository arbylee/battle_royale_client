import React, { Component } from 'react';

class UserActions extends Component {
  constructor(props) {
    super(props);
    this.handleActionSubmit = this.handleActionSubmit.bind(this);
    this.handleBetChange = this.handleBetChange.bind(this);

    this.state = {
      gold: 0,
      selectedTarget: "1",
      imgData: ""
    };
  }

  componentDidMount() {
    const that = this;
    that.props.socket.on('user state', function(msg){
      that.setState({gold: msg});
    });

    that.props.socket.on('map state', function(msg){
      let reader = new FileReader();
      let blob = new Blob([msg], {type: "image/png"});
      reader.onload = function(e) {
        that.setState({imageData: e.target.result});
      };
      reader.readAsDataURL(blob);
    });
  }

  handleActionSubmit(event) {
    event.preventDefault();
    this.props.socket.emit('user action', this.state.selectedTarget);
    this.setState({chatInputValue: ''});
  }

  handleBetChange(event){
    this.setState({selectedTarget: event.target.value})
  }

  render() {
    return (
      <div className="user-actions">
        <div className="gold">Gold: {this.state.gold}</div>
        <img src={this.state.imageData} role="presentation"></img>
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
    )
  }
}

export default UserActions;

