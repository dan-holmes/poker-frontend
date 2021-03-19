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

  render() {
    let round = this.state.round
      if (this.state.token === null) {
        return <JoinGameForm setToken={this.setToken} setName={this.setName} getData={this.getData} backend_url={this.state.backend_url} />
      } else if (this.state.round === null) {
          return <div>Loading...</div>; 
      } else {
        if (round.round === false) {
          return (
            <div className="App">
              <Hands hands={round.hands} player_to_bet={null} winner={round.winner} />
              <button onClick={this.new_round}>
                  New Round
                </button>
            </div>
          )
        }
        return (
          <div className="App">
            <Pot value={round.pot} />
            <CommunityCards cards={round.community_cards} />
            <Hands hands={round.hands} player_to_bet={round.player_to_bet} winner={round.winner} />
            <BettingForm round={round} token={this.state.token} name={this.state.name} backend_url={this.state.backend_url}/>
            <button onClick={this.new_round}>
              New Round
            </button>
          </div>
        )
      }
  }
}