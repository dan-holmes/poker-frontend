import Card from './Card.js'

export default function Hand(props) {
    return (
        <div className="hand">
            <h4>{ props.data.player }</h4>
            {props.data.cards.map(card => (
                <Card data={card} />
            ))}
        </div>
    )
}