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

    const betSoFar = props.round.hands.filter((hand) => { return hand.player.name === props.name })[0].bet

    if (props.round.winner) {
        return null
      }
      if (props.round.player_to_bet !== props.name) {
        return null
      }

    

    return (
        <div id='bettingOptions'>
            Bet so far: { betSoFar }
            <CallButton current_bet={props.round.current_bet} betSoFar={betSoFar} bet={bet}/>
            <BettingForm betSoFar={betSoFar} current_bet={props.round.current_bet} bet={bet} />
            <button onClick={fold}>
            Fold
            </button>
        </div>
    )   
}