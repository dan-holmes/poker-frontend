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
            {props.data.cards.map((card, index) => (
                <Card key={props.data.player + index} data={card} />
            ))}
        </div>
    )
}