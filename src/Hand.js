import Player from './Player.js'
import Card from './Card.js'

export default function Hand(props) {
    let className
    if (props.to_bet) {
        className = 'handToBet'
    } else {
        className = 'hand'
    }
    return (
        <div className={ className }>
            <Player data={props.data.player} />
            {props.data.cards.map(card => (
                <Card key={card.suit + card.value} data={card} />
            ))}
        </div>
    )
}