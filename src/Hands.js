import Hand from './Hand.js'

export default function Hands(props) {
    return (
        <div id='hands'>
            {props.hands.map(hand => (
                <Hand data={hand} />
            ))}
        </div>
    )
}