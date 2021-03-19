import Hand from './Hand.js'

export default function Hands(props) {
    return (
        <div id='hands'>
            {props.hands.map(hand => (
                <Hand key={hand.player.name} hand={hand} player_to_bet={props.player_to_bet} winner={props.winner} />
            ))}
        </div>
    )
}