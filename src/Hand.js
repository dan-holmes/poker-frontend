import Player from './Player.js'
import Card from './Card.js'

export default function Hand(props) {
    const to_bet = () => {
        return props.hand.player.name === props.player_to_bet
    }

    const winner = () => {
        if (props.winner === false) {
            return false
        } else {
            return props.hand.player.name === props.winner
        }
    }

    const className = () => {
        if (winner()) {
            return 'handWinner'
        } else if (to_bet()) {
            return 'handToBet'
        } else {
            return 'hand'
        }
    }
    return (
        <div className={ className() }>
            <Player player={props.hand.player} />
            {props.hand.cards.map((card, index) => (
                <Card key={props.hand.player + index} card={card} />
            ))}
        </div>
    )
}