import Card from './Card.js'

export default function Hands(props) {
    console.log(props.data)
    return (
        <div id='community_cards'>
            {props.data.map(card => (
                <Card data={card} />
            ))}
        </div>
    )
}