import Player from './Player.js'
import Card from './Card.js'

export default function Hand(props) {
    const to_bet = () => {
        return props.hand.player.name === props.player_to_bet
    }

    const className = () => {
        if (props.hand.status[0] === 'W') {
            return 'handWinner'
        } else if (to_bet()) {
            return 'handToBet'
        } else {
            return 'hand'
        }
    }

    const opacity = () => {
        if (props.hand.status === 'Folded') {
            return 0.5
        } else {
            return 1
        }
    }

    return (
        <div className={ className() } style={{opacity: opacity()}}>
            <Player player={props.hand.player} status={props.hand.status}/>
            {props.hand.cards.map((card, index) => (
                <Card key={props.hand.player + index} card={card} />
            ))}
        </div>
    )
}