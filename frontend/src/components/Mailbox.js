import {Link} from "react-router-dom";
import './styles/Mailbox.css';

function Mailbox(props) {
    const mailboxId = props.mailbox._id;
    const isAdminSite = window.location.pathname === "/admin";
    const isNotAdminSite = window.location.pathname !== "/admin";
    const isMyMailboxSite = window.location.pathname.startsWith("/mymailbox");

    async function onDelete(e){
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/mailboxes/delete/${props.mailbox._id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log(props.mailbox._id)

        if (res.status === 204) {
            // The response is empty
            props.onMailboxDeleted();
        } else {
            // The response is not empty, parse it as JSON
            const data = await res.json();
            props.onMailboxDeleted();
        }
    }

    return (
        <div>
            {isAdminSite && (
                <div className="mailbox-container-admin">
                    <table className="mailbox-table">
                        <tbody>
                        <tr>
                            <th>Box ID</th>
                            <th>Location</th>
                            <th>Open</th>
                            {isAdminSite && (
                                <>
                                    <th>Read More</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </>
                            )}
                        </tr>
                        <tr>
                            <td>{props.mailbox.boxID}</td>
                            <td>
                                <div className="mailbox-box">
                                    <div className="mailbox-image"></div>
                                    <p className="mailbox-info">
                                        {props.mailbox.street}, {props.mailbox.postcode}, {props.mailbox.post}, {props.mailbox.country}
                                    </p>
                                </div>
                            </td>
                            <td>{props.mailbox.open.toString()}</td>
                            {isAdminSite && (
                                <>
                                    <td>
                                        <Link to={`/mailboxes/${mailboxId}`} className="mailbox-link">
                                            More info
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/update/${mailboxId}`} className="mailbox-link">
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="delete-button" type="button" value="Briši" onClick={onDelete}>
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {isNotAdminSite && (
                <div className="mailbox-container">
                    <h5 className="mailbox-name">Box ID: {props.mailbox.boxID}</h5>
                    <div className="mailbox-box">
                        <div className="mailbox-image"></div>
                        <p className="mailbox-info">
                            {props.mailbox.street}, {props.mailbox.postcode}, {props.mailbox.post}, {props.mailbox.country}
                        </p>
                    </div>
                    <p className="mailbox-info">Open: {props.mailbox.open.toString()}</p>
                    <p className="mailbox-info">Assign to: {props.mailbox.mailboxUser.username}</p>

                    {props.mailbox.accessUser.length > 0 ? (
                        <p className="mailbox-info">Access: {props.mailbox.accessUser.map(user => user.username).join(', ')}</p>
                    ) : (
                        <p className="mailbox-info">Access: /</p>
                    )}


                    {isMyMailboxSite && (
                        <Link to={`/mailboxes/${mailboxId}`} className="mailbox-link">
                            More info
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}


export default Mailbox;
