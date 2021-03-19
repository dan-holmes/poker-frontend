export default function Player(props) {
    return (
        <div>
            <h4>{props.player.name} ({props.player.stack})</h4>
        </div>
    )
}