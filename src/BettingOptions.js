import BettingForm from "./BettingForm";
import CallButton from "./CallButton"
import axios from 'axios';

export default function BettingOptions(props) {
    const bet = (amount) => {
        let data = new FormData();
        data.append('amount', amount);
        axios({
            method: "post",
            url: props.backend_url + "/bets",
            data: data,
            headers: { 
              "Content-Type": "multipart/form-data",
              'Authorization': `token ${props.token}`
            },
          })
            .catch(function (response) {
              console.log(response);
            });
    }

    const fold = () => {
        axios({
            method: "post",
            url: props.backend_url + "/folds",
            headers: { 
              "Content-Type": "multipart/form-data",
              'Authorization': `token ${props.token}`
            },
          })
            .catch(function (response) {
              console.log(response);
            });
    }

    const betSoFar = props.round.hands.filter((hand) => { return hand.player.name === props.name })[0].bet_so_far || 0

    if (props.round.winner) {
        return null
      }
      if (props.round.player_to_bet !== props.name) {
        return null
      }

    

    return (
        <div id='bettingOptions'>
            <div id='betSoFar'>Bet so far: { betSoFar }</div>
            <div id='betButtons'>
              <BettingForm betSoFar={betSoFar} current_bet={props.round.current_bet} minRaise={props.round.min_raise} bet={bet} /> 
              <CallButton current_bet={props.round.current_bet} betSoFar={betSoFar} bet={bet}/> 
              <button id='foldButton' onClick={fold}>
                Fold
              </button>
            </div>
            
        </div>
    )   
}