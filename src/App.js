import './App.css';
import {useState} from 'react';
import Pot from './Pot.js';
import Hands from './Hands.js';
import CommunityCards from './CommunityCards.js'
import BettingForm from './BettingForm.js'
import JoinGameForm from './JoinGameForm.js'
const axios = require('axios');



function App() {
  const [round, setRound] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [token, setToken] = useState(null) 

  if (!(isLoading || isLoaded) && token) {
    setIsLoading(true)
      axios.get('http://localhost:9292/round', {
          headers: {
            'Authorization': `token ${token}`
          }
        })
      .then(function (response) {
        setRound(response)
        setIsLoaded(true)
        setIsLoading(false)
      })
      .catch(function (error) {
        setError(error)
      })
  }

  const refresh = () => {
    setIsLoaded(false)
  }

  const new_round = () => {
    axios.get('http://localhost:9292/round/new')
      .then(() => {
        refresh()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  if (token === null) {
    return <JoinGameForm setToken={setToken} refresh={refresh} />
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (round.data.round === false) {
      return (
        <div className="App">
          <Hands hands={round.data.hands} player_to_bet={null} />
          <button onClick={new_round}>
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
        <BettingForm current_bet={round.data.current_bet} player_to_bet={round.data.player_to_bet} refresh={refresh} winner={round.data.winner} token={token} />
        <button onClick={new_round}>
          New Round
        </button>
      </div>
    )
  }
}

export default App;
