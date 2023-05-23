import {Link} from "react-router-dom";
import DeleteButton from "./DeleteButton";
import {useState} from "react";
import './styles/Mailbox.css';

function Mailbox(props){
    const mailboxId = props.mailbox._id;

    return (
        <div className="mailbox-container">
            <h5 className="mailbox-name">ID: {props.mailbox.name}</h5>
            <p className="mailbox-info">Street: {props.mailbox.street}</p>
            <p className="mailbox-info">Postcode: {props.mailbox.postcode}</p>
            <p className="mailbox-info">Post: {props.mailbox.post}</p>
            <p className="mailbox-info">Open: {props.mailbox.open.toString()}</p>
            <p className="mailbox-info">Date: {props.mailbox.date}</p>
            <p className="mailbox-info">Added: {props.mailbox.userId.username}</p>

            <Link to={`/mailboxes/${mailboxId}`} className="mailbox-link">
                More info
            </Link>

            <DeleteButton
                id={props.mailbox._id}
                text="Delete mailbox"
            />
        </div>
    );
}

export default Mailbox;