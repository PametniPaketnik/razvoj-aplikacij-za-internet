import { useState, useEffect } from 'react';
import Mailbox from './Mailbox';
import {Link} from "react-router-dom";

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
            <Link to='/publish' className="nav-link">Add mailbox</Link>
            <ul>
                {mailboxes.map(mailbox=>(<Mailbox mailbox={mailbox} key={mailbox._id}></Mailbox>))}
            </ul>
        </div>
    );
}

export default Mailboxes;