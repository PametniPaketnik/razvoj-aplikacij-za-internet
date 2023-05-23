function Comment(props) {
    return (
            <div>
                <h5>Id: {props.history._id}</h5>
                <p>Posted date: {props.history.date}</p>
                <p>Parent mailbox: {props.history.parentMailBox}</p>
            </div>
    );
}

export default Comment;