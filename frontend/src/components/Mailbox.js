import {Link} from "react-router-dom";

function Mailbox(props){
    const mailboxId = props.mailbox._id;

    return (
        <div>
            <h5>ID: {props.mailbox.name}</h5>
            <p>Street: {props.mailbox.street}</p>
            <p>Postcode: {props.mailbox.postcode}</p>
            <p>Post: {props.mailbox.post}</p>
            <p>Open: {props.mailbox.open.toString()}</p>
            <p>Date: {props.mailbox.date}</p>
            <p>Added: {props.mailbox.userId.username}</p>

            <Link to={`/mailboxes/${mailboxId}`}>
                <button>Preberi več</button>
            </Link>
        </div>
    );
}

export default Mailbox;