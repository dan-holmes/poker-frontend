export default function CallButton(props) {
    const betToCall = props.current_bet - props.betSoFar

    const callBet = () => {
        props.bet(betToCall)
    }
    return (
        <button onClick={callBet}>Call ({betToCall})</button>
    )
}