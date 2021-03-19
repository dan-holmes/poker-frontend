const hashCode = function(string) {
    var hash = 0;
    if (string.length == 0) {
        return hash;
    }
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export default function Player(props) {
    const status = () => {
        if (props.winner === props.player.name) {
            return 'Winner! +' + props.pot
        } else if (props.winner) {
            return 'Loser'
        } else if (props.bet) {
            return "Bet " + props.bet
        } else {
            return "..."
        }
    }

    const backgroundColor = () => {
        const options = ['Aqua', 'CornflowerBlue', 'Brown', 'OrangeRed', 'DarkOrchid', 'IndianRed', 'Ivory', 'Plum', 'MediumTurquoise', 'DarkGreen', 'LightGrey', 'Violet', 'DarkMagenta']
        return options[hashCode(props.player.name) % options.length]
    }
    return (
        <div className='player' style={{backgroundColor: backgroundColor()}}>
            <div className='playerName'>{props.player.name}</div>
            <div className='playerStack'>{props.player.stack}</div>
            <div className='playerStatus'>{ status() }</div>
        </div>
    )
}