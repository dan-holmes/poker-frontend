export default function Player(props) {
    return (
        <div>
            <h4>{props.data.name} ({props.data.stack})</h4>
        </div>
    )
}