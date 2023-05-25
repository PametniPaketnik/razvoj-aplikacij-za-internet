import { useState, useEffect } from 'react';
import Mailbox from './Mailbox';
import {Link} from "react-router-dom";

function Mailboxes(){
    const [mailboxes, setMailboxes] = useState([]);
    const isAdminSite = window.location.pathname === "/admin";
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
            <h3 className="heading">ALL MAILBOXES</h3>
            {isAdminSite && (
                <div className="centered-add">
                <Link to='/publish' className="mailbox-add"></Link>
                </div>
            )}
            <ul>
                {mailboxes.map(mailbox=>(<Mailbox
                    mailbox={mailbox}
                    key={mailbox._id}
                    onMailboxDeleted={() => {
                        const getMailboxes = async function(){
                            const res = await fetch(`http://localhost:3001`);
                            const data = await res.json();
                            setMailboxes(data);
                        }
                        getMailboxes();
                    }}
                ></Mailbox>))}
            </ul>
            
        </div>
    );
}

export default Mailboxes;
