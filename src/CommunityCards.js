import Card from './Card.js'

export default function CommunityCards(props) {
    return (
        <div id='community_cards'>
            {props.cards.map(card => (
                <Card key={card.suit + card.value} card={card} />
            ))}
        </div>
    )
}