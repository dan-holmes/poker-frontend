export default function Card(props) {
    let className
    if (props.data.suit === 'H' || props.data.suit === 'D') {
        className = 'redCard'
    } else {
        className = 'blackCard'
    }
    return (
        
        <div className={ className }>
            { props.data.value }
            { props.data.suit }
        </div>
    )
}