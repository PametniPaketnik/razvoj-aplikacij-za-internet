import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [firstname, setFirstname] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [tel, setTel] = useState([]);
    const [street, setStreet] = useState([]);
    const [postcode, setPostcode] = useState([]);
    const [error, setError] = useState([]);
    const[file, setFile] = useState('');

    async function Register(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('tel', tel);
        formData.append('street', street);
        formData.append('postcode', postcode);
        formData.append('image', file);

        const res = await fetch('http://localhost:3001/users', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = '/';
        } else {
            setUsername('');
            setPassword('');
            setEmail('');
            setError('Registration failed');
        }
    }

    return(
        <form onSubmit={Register}>
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e)=>(setUsername(e.target.value))}/>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
            <input type="text" name="firstName" placeholder="First Name" value={firstname} onChange={(e)=>(setFirstname(e.target.value))} />
            <input type="text" name="lastname" placeholder="Last Name" value={lastname} onChange={(e)=>(setLastname(e.target.value))} />
            <input type="text" name="tel" placeholder="Phone Number" value={tel} onChange={(e)=>(setTel(e.target.value))} />
            <input type="text" name="street" placeholder="Street" value={street} onChange={(e)=>(setStreet(e.target.value))} />
            <input type="number" name="postcode" placeholder="Postcode" value={postcode} onChange={(e)=>(setPostcode(e.target.value))} />
            <label>Chose Image</label>
            <input type="file" id="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <input type="submit" name="submit" value="Login" />
            <label>{error}</label>

        </form>
    );
}

export default Register;