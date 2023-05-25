import {useContext, useEffect, useState} from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';
import './styles/AddMailbox.css';
import {useParams} from "react-router-dom";

function UpdateMailbox(props) {
    const { id } = useParams();
    const userContext = useContext(UserContext);
    const[boxID, setBoxID] = useState('');
    const[street, setStreet] = useState('');
    const[postcode, setPostcode] = useState('');
    const[post, setPost] = useState('');
    const[open, setOpen] = useState('');
    const[mailboxUser, setMailboxUser] = useState('');
    const [users, setUsers] = useState([]);
    const[uploaded, setUploaded] = useState(false);

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

    useEffect(() => {
        const fetchMailbox = async () => {
            try {
                const response = await fetch(`http://localhost:3001/mailboxes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch mailbox');
                }
                const data = await response.json();
                const mailboxData = data; // Assuming the response directly contains the mailbox data without any additional nesting
                setBoxID(mailboxData.boxID);
                setStreet(mailboxData.street);
                setPostcode(mailboxData.postcode);
                setPost(mailboxData.post);
                setOpen(mailboxData.open);
                setMailboxUser(mailboxData.mailboxUser._id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMailbox();
    }, [id]);

    async function onSubmit(e) {
        e.preventDefault();

        if (!boxID) {
            alert("Vnesite boxID!");
            return;
        }

        if (!mailboxUser) {
            alert("Invalid user selected");
            return;
        }

        const formData = new FormData();
        formData.append('boxID', boxID);
        formData.append('street', street);
        formData.append('postcode', postcode);
        formData.append('post', post);
        formData.append('open', open);
        formData.append('mailboxUser', mailboxUser);

        const res = await fetch(`http://localhost:3001/mailboxes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <div className="form-container">
            <div className="form-heading">
                <h2>Add new mailbox</h2>
            </div>
            <form className="form-group mx-auto" onSubmit={onSubmit} style={{ maxWidth: "400px" }}>
                {!userContext.user ? <Navigate replace to="/login" /> : ""}
                {uploaded ? <Navigate replace to="/" /> : ""}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="boxID"
                        placeholder="BoxID"
                        value={boxID}
                        onChange={(e) => { setBoxID(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="street"
                        placeholder="Street"
                        value={street}
                        onChange={(e) => { setStreet(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="postcode"
                        placeholder="Postcode"
                        value={postcode}
                        onChange={(e) => { setPostcode(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="post"
                        placeholder="Post"
                        value={post}
                        onChange={(e) => { setPost(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="open"
                        placeholder="Open"
                        value={open}
                        onChange={(e) => { setOpen(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        name="mailboxUser"
                        value={mailboxUser}
                        onChange={(e) => {
                            const selectedUserId = e.target.value;
                            setMailboxUser(selectedUserId);
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
                <div className="mb-3 text-center">
                    <input className="btn btn-primary" type="submit" name="submit" value="Save changes" />
                </div>
            </form>
        </div>

    )
}

export default UpdateMailbox;