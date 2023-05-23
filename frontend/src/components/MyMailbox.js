
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import Mailbox from "./Mailbox";
import ShowMailbox from "./ShowMailbox";

function MyMailbox() {
    const { userId } = useParams();
    const [mailboxes, setMailboxes] = useState([]);
    const [mailboxId, setMailboxId] = useState(null);

    useEffect(function(){
        const getMailboxes = async function(){
            const res = await fetch("http://localhost:3001");
            const data = await res.json();
            console.log(data)
            const filteredMailboxes = data.filter(mailbox => mailbox.userId._id === userId);
            const mailboxId = filteredMailboxes.map(mailbox => mailbox._id);
            console.log(mailboxId)
            setMailboxId(mailboxId); //pripravljeno če kako drugace naredili
            setMailboxes(filteredMailboxes);
        }
        getMailboxes();
    }, []);


    return(
        <div>
            <h3>Mailboxes:</h3>
            <ul>
                {mailboxes.map(mailbox=>(<Mailbox mailbox={mailbox} key={mailbox._id}></Mailbox>))}
            </ul>

        </div>
    );
}

export default MyMailbox;
