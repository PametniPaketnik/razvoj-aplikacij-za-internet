function History(props) {
    return (
            <div>
                <h5>Box ID: {props.boxId}</h5>
                <p>Posted date: {props.history.date}</p>
                <p>Open: {props.history.open}</p>
            </div>
    );
}

export default History;