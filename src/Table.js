import Hand from './Hand.js'
import CommunityCards from './CommunityCards.js'
import Pot from './Pot.js'

export default function Table(props) {
    let hands = props.round.hands
    let myHand;
    let handsBeforeMine = [];
    let handsAfterMine = [];
    let afterMyHand = false;
    for (let i = 0; i < hands.length; i++) {
        if (hands[i].player.name === props.name) {
            myHand = hands[i]
            afterMyHand = true
        } else if (afterMyHand) {
            handsAfterMine.push(hands[i])
        } else {
            handsBeforeMine.push(hands[i])
        }
    }
    let otherHands = handsAfterMine.concat(handsBeforeMine);

    const myHandView = () => {
        if (myHand) {
            return <Hand key={myHand.player.name} hand={myHand} player_to_bet={props.round.player_to_bet} winner={props.round.winner} pot={props.round.pot} />
        }
    }

    const otherHandsView = () => {
        return otherHands.map(hand => (
            <Hand key={hand.player.name} hand={hand} player_to_bet={props.round.player_to_bet} winner={props.round.winner} pot={props.round.pot} />
        ))
    }

    const communityCardsView = () => {
        if (props.round.round) {
            return <CommunityCards cards={props.round.community_cards} />
        }
    }
    const potView = () => {
        if (props.round.round) {
            return <Pot value={props.round.pot} current_bet={props.round.current_bet}/>
        }
    }

    return (
        <div id='table'>
            <div id='otherHands'>
                { otherHandsView() }
            </div>
            <div id='middleTable'>
                { communityCardsView() }
                { potView() }
            </div>
            <div id='myHand'>
                { myHandView() }
            </div>
        </div>
    )
}