import Card from './Card.js'

export default function Hands(props) {
    return (
        <div id='community_cards'>
            {props.data.map(card => (
                <Card key={card.suit + card.value} data={card} />
            ))}
        </div>
    )
}