import './App.css';
import {useState} from 'react';
import Pot from './Pot.js';
import Hands from './Hands.js';
import CommunityCards from './CommunityCards.js'
import BettingForm from './BettingForm.js'
const axios = require('axios');



function App() {
  const [round, setRound] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!(isLoading || isLoaded)) {
    setIsLoading(true)
    axios.get('http://localhost:9292/round')
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
    
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <Pot value={round.data.pot} />
        <CommunityCards data={round.data.community_cards} />
        <Hands hands={round.data.hands} player_to_bet={round.data.player_to_bet} />
        <BettingForm current_bet={round.data.current_bet} player_to_bet={round.data.player_to_bet} refresh={refresh} winner={round.data.winner} />
        <button onClick={new_round}>
          New Round
        </button>
      </div>
    )
  }
}

export default App;
