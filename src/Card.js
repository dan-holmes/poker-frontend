export default function Card(props) {
    let className
    if (props.card.suit === 'H' || props.card.suit === 'D') {
        className = 'redCard'
    } else {
        className = 'blackCard'
    }

    const suit = () => {
        switch(props.card.suit) {
            case 'H':
                return '♥'
            case 'D':
                return '♦'
            case 'S':
                return '♠'
            case 'C':
                return '♣'
            default:
                return ''
        }
    }

    const suitsGrid = () => {
        switch(props.card.value) {
            case '10':
                return [3,4,3]
            case '9':
                return [3,3,3]
            case '8':
                return [3,2,3]
            case '7':
                return [2,3,2]
            case '6':
                return [2,2,2]
            case '5':
                return [2,1,2]
            case '4':
                return [2,0,2]
            case '3':
                return [1,1,1]
            case '2':
                return [1,1]
            default:
                return []
        }
    }

    const suitsDisplay = () => {
        return suitsGrid().map((rowCount, index) => {
            return <div className='suitRow' key={ index }> { Array(rowCount).fill(suit()).join(' ') } </div>
        })
    }

    const picture = () => {
        switch(props.card.value) {
            case 'A':
                return suit()
            case 'K':
                return 'K'
            case 'Q':
                return 'Q'
            case 'J':
                return 'J'
            default:
                return suitsDisplay()
        }
    }

    const cardGraphic = () => {
        switch(props.card.value) {
            case 'A':
            case 'K':
            case 'Q':
            case 'J':
                return 'cardPicture'
            default:
                return 'cardSuits'
        }
    }

    return (
        
        <div className={ className }>
            <div className = 'upperCard'>
                { props.card.value }
                { suit() }
            </div>
            <div className = 'middleCard'>
                <div className={ cardGraphic() }>
                    { picture() }
                </div>
            </div>
            <div className = 'lowerCard'>
                { props.card.value }
                { suit() }
            </div>
        </div>
    )
}