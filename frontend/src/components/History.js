function Comment(props) {
    return (
            <div>
                <h5>ID: {props.history._id}</h5>
                <p>Posted date: {props.history.date}</p>
            </div>
    );
}

export default Comment;