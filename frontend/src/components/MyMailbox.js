import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import Mailbox from "./Mailbox";
import ShowMailbox from "./ShowMailbox";

function MyMailbox() {
    const { userId } = useParams();
    const [mailboxes, setMailboxes] = useState([]);
    const [mailboxId, setMailboxId] = useState(null);

    useEffect(() => {
        const getMailboxes = async () => {
            const res = await fetch(`http://localhost:3001/mailboxes/showByMailboxUser/${userId}`);
            const data = await res.json();
            console.log(data);

            const filteredMailboxes = data.filter(mailbox => {
                return (
                    mailbox.mailboxUser._id === userId ||
                    mailbox.accessUser.some(user => user._id === userId)
                );
            });

            const mailboxIds = filteredMailboxes.map(mailbox => mailbox._id);
            console.log(mailboxIds);
            setMailboxId(mailboxIds);
            setMailboxes(filteredMailboxes);
        };

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
