import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddMailbox(props) {
    const userContext = useContext(UserContext);
    const[name, setName] = useState('');
    const[street, setStreet] = useState('');
    const[postcode, setPostcode] = useState('');
    const[post, setPost] = useState('');
    const[open, setOpen] = useState('');
    const[uploaded, setUploaded] = useState(false);

    async function onSubmit(e){
        e.preventDefault();

        if(!name){
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
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
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" className="form-control" name="street" placeholder="Street" value={street} onChange={(e)=>{setStreet(e.target.value)}}/>
            <input type="text" className="form-control" name="postcode" placeholder="Postcode" value={postcode} onChange={(e)=>{setPostcode(e.target.value)}}/>
            <input type="text" className="form-control" name="post" placeholder="Post" value={post} onChange={(e)=>{setPost(e.target.value)}}/>
            <input type="text" className="form-control" name="open" placeholder="Open" value={open} onChange={(e)=>{setOpen(e.target.value)}}/>

            <input className="btn btn-primary" type="submit" name="submit" value="Naloži" />
        </form>
    )
}

export default AddMailbox;