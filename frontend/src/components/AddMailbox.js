import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';
import './styles/AddMailbox.css';

function AddMailbox(props) {
    const userContext = useContext(UserContext);
    const[boxID, setBoxID] = useState('');
    const[street, setStreet] = useState('');
    const[postcode, setPostcode] = useState('');
    const[post, setPost] = useState('');
    const[open, setOpen] = useState('');
    const[uploaded, setUploaded] = useState(false);

    async function onSubmit(e){
        e.preventDefault();

        if(!boxID){
            alert("Vnesite boxID!");
            return;
        }

        const formData = new FormData();
        formData.append('boxID', boxID);
        formData.append('street', street);
        formData.append('postcode', postcode);
        formData.append('post', post);
        formData.append('open', open);
        const res = await fetch('http://localhost:3001/mailboxes', {
            method: 'POST',
            credentials: 'include',
            body: formData
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
            <div className="mb-3 text-center">
                <input className="btn btn-primary" type="submit" name="submit" value="Add" />
            </div>
        </form>
        </div>

    )
}

export default AddMailbox;