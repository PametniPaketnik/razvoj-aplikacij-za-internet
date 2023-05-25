import './styles/History.css'
function History(props) {
    const openStatus = props.history.open === 'Successful' ? 'success' : 'failure';
    return (
            <div className="history-container">
                <h5>Box ID: {props.boxId}</h5>
                <p>Posted date: {props.history.date}</p>
                <div className="open-info">
                    Open: <span className={openStatus}> {props.history.open}</span>
                </div>
            </div>
    );
}

export default History;