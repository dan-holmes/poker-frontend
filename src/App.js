import './App.css';
import {useState} from 'react';
import Pot from './Pot.js';
import Hands from './Hands.js';
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
    
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <Pot value={round.data.pot} />
        <Hands hands={round.data.hands} />
      </div>
    )
  }
}

export default App;
