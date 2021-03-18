import './App.css';
import React, { Component } from 'react';
import Pot from './Pot.js';
import Hands from './Hands.js';
import CommunityCards from './CommunityCards.js'
import BettingForm from './BettingForm.js'
import JoinGameForm from './JoinGameForm.js'
const axios = require('axios');

export default class App extends Component {
  intervalID;

  state = {
    round: null,
    token: null,
    name: null
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getData = () => {
    console.log(process.env.REACT_APP_BACKEND_URL + '/round')
    axios.get(process.env.REACT_APP_BACKEND_URL + '/round', {
          headers: {
            'Authorization': `token ${this.state.token}`
          }
        })
      .then((response) => {
        this.setState({
          round: response
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
    axios.get(process.env.REACT_APP_BACKEND_URL + '/round/new')
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    let round = this.state.round
      if (this.state.token === null) {
        return <JoinGameForm setToken={this.setToken} setName={this.setName} getData={this.getData} />
      } else if (this.state.round === null) {
          return <div>Loading...</div>; 
      } else {
        if (round.data.round === false) {
          return (
            <div className="App">
              <Hands hands={round.data.hands} player_to_bet={null} />
              <button onClick={this.new_round}>
                  New Round
                </button>
            </div>
          )
        }
        return (
          <div className="App">
            <Pot value={round.data.pot} />
            <CommunityCards data={round.data.community_cards} />
            <Hands hands={round.data.hands} player_to_bet={round.data.player_to_bet} />
            <BettingForm round={round} token={this.state.token} name={this.state.name} />
            <button onClick={this.new_round}>
              New Round
            </button>
          </div>
        )
      }
  }
}