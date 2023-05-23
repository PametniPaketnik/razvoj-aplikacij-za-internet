import { useState, useEffect } from 'react';
import Mailbox from './Mailbox';

function Mailboxes(){
    const [mailboxes, setMailboxes] = useState([]);
    useEffect(function(){
        const getMailboxes = async function(){
            const res = await fetch("http://localhost:3001");
            const data = await res.json();
            setMailboxes(data);
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

export default Mailboxes;