export default function CallButton(props) {
    const betToCall = props.current_bet - props.betSoFar

    const callBet = () => {
        props.bet(betToCall)
    }

    const buttonName = () => {
        if (betToCall === 0) {
            return 'Check'
        } else {
            return 'Call (' + betToCall + ')'
        }
    }

    return (
        <button id='callButton' onClick={callBet}>{buttonName()}</button>
    )
}