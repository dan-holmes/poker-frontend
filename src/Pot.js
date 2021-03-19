export default function Pot(props){
    return(
        <div id='pot'>
            <div id='potTitle'>Pot</div>
            <div id='potValue'>{props.value}</div>
            <div id='currentBet'>Current bet: {props.current_bet}</div>
        </div>
    )
}