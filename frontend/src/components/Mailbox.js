import {Link} from "react-router-dom";
import './styles/Mailbox.css';
import {useEffect, useState} from "react";
import {Navigate} from "react-router";

function Mailbox(props) {
    const mailboxId = props.mailbox._id;
    const isAdminSite = window.location.pathname === "/admin";
    const isNotAdminSite = window.location.pathname !== "/admin";
    const isMyMailboxSite = window.location.pathname.startsWith("/mymailbox");
    const [users, setUsers] = useState([]);
    const[userId, setUserId] = useState('');
    const[uploaded, setUploaded] = useState(false);
    const [accessUpdated, setAccessUpdated] = useState(false);

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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();

        if (!userId) {
            alert("Invalid user selected");
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);

        const res = await fetch(`http://localhost:3001/mailboxes/addAccessUser/${mailboxId}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        });

        if (res.status === 400) {
            alert("User already has access to this mailbox");
            return;
        }

        const data = await res.json();

        // props.onMailboxDeleted();
        setUploaded(true);
        setAccessUpdated(true); // Nastavi accessUpdated na true ob klicu onSubmit
    }

    //Za osvežitev kode
    useEffect(() => {
        if (accessUpdated) {
            // Osveži props.mailbox.accessUser na osnovi prejetih podatkov iz strežnika
            const fetchMailbox = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:3001/mailboxes/${mailboxId}`
                    );
                    const data = await response.json();
                    props.mailbox.accessUser = data.accessUser;
                    setAccessUpdated(false); // Ponastavi accessUpdated na false
                } catch (error) {
                    console.error(error);
                }
            };
            fetchMailbox();
        }
    }, [accessUpdated, mailboxId, props.mailbox]);

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
                        <p className="Access">Access: {props.mailbox.accessUser.map(user => user.username).join(', ')}</p>
                    ) : (
                        <p className="Access">Access: /</p>
                    )}


                    {isMyMailboxSite && (
                        <>
                            <Link to={`/mailboxes/${mailboxId}`} className="mailbox-link">
                                More info
                            </Link>
                            <form
                                onSubmit={onSubmit}
                                style={{ maxWidth: "200px" }}
                            >
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name="mailboxUser"
                                        value={userId}
                                        onChange={(e) => {
                                            const selectedUserId = e.target.value;
                                            setUserId(selectedUserId);
                                        }}
                                    >
                                        <option value="">assign to the user</option>
                                        {users.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input className="btn btn-primary" type="submit" name="submit" value="Add access" />
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}


export default Mailbox;
