import Hand from './Hand.js'

export default function Hands(props) {
    const style = {
        color: 'blue'
    }
    return (
        <div style={{style}}>
            {props.hands.map(hand => (
                <Hand data={hand} />
            ))}
        </div>
    )
}