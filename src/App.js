import './App.css';
import React, { Component } from 'react';
import Table from './Table.js';
import BettingOptions from './BettingOptions.js'
import JoinGameForm from './JoinGameForm.js'
const axios = require('axios');

export default class App extends Component {
  intervalID;
  
  state = {
    round: null,
    token: null,
    name: null,
    backend_url: null
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  componentDidMount() {
    switch(process.env.NODE_ENV) {
      case 'production':
        this.setState({
          backend_url: 'https://dh-poker.herokuapp.com'
        })
        break;
      case 'development':
        this.setState({
          backend_url: 'http://localhost:9292'
        })
        break;
      default:
        this.setState({
          backend_url: 'https://dh-poker.herokuapp.com'
        })
    }
  }

  getData = () => {
    axios.get(this.state.backend_url + '/round', {
          headers: {
            'Authorization': `token ${this.state.token}`
          }
        })
      .then((response) => {
        console.log(response.data)
        this.setState({
          round: response.data
        })
        this.intervalID = setTimeout(this.getData.bind(this), 1000);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  setToken = (token) => {
    this.setState({
      token: token
    })
  }

  setName = (name) => {
    this.setState({
      name: name
    })
  }

  new_round = () => {
    axios.get(this.state.backend_url + '/round/new')
      .catch((error) => {
        console.log(error)
      })
  }

  leave_table = () => {
    axios({
      method: "post",
      url: this.state.backend_url + "/leave",
      headers: { 
        "Content-Type": "multipart/form-data",
        'Authorization': `token ${this.state.token}`
      },
    })
      .then(() => {
        this.setState({
          name: null,
          token: null
        })
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  bettingOptionsView = () => {
    if (this.state.round.hands.map(hand => hand.player.name).includes(this.state.name)) {
      return <BettingOptions round={this.state.round} token={this.state.token} name={this.state.name} backend_url={this.state.backend_url} />
    }
  }

  render() {
    let round = this.state.round
      if (this.state.token === null) {
        return <JoinGameForm setToken={this.setToken} setName={this.setName} getData={this.getData} backend_url={this.state.backend_url} />
      } else if (this.state.round === null) {
          return <div>Loading...</div>; 
      } else {
        return (
          <div className="App">
            <Table round={round} name={this.state.name} />
            {this.bettingOptionsView()}
            <button onClick={this.new_round}>
              New Round
            </button>
            <button onClick={this.leave_table}>
              Leave Table
            </button>
          </div>
        )
      }
  }
}