import Hand from './Hand.js'

export default function Hands(props) {
    return (
        <div id='hands'>
            {props.hands.map(hand => (
                <Hand key={hand.player} data={hand} to_bet={props.player_to_bet === hand.player} />
            ))}
        </div>
    )
}