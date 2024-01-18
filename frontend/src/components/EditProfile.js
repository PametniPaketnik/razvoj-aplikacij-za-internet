import {useContext, useEffect, useState} from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';
import './styles/AddMailbox.css';

const geocodeAddress = async (address, postcode) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&` +
        `street=${encodeURIComponent(address)}&` +
        `postalcode=${encodeURIComponent(postcode)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    else {
        throw new Error('Address not found' + address + postcode);
    }
};

function EditProfile(props) {
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState([]);
    const [firstname, setFirstname] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [tel, setTel] = useState([]);
    const [street, setStreet] = useState([]);
    const [postcode, setPostcode] = useState([]);
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {
        const updateInfo = () => {
            try {
                setEmail(userContext.user.email);
                setFirstname(userContext.user.firstName);
                setLastname(userContext.user.lastName);
                setTel(userContext.user.tel);
                setStreet(userContext.user.street);
                setPostcode(userContext.user.postcode);
            } catch (error) {
                console.error(error);
            }
        };
        updateInfo();
    }, [userContext.user._id]);

    async function onSubmit(e) {
        e.preventDefault();

        if (!email || !firstname || !lastname || !tel || !street || !postcode) {
            alert("Vnesite boxID!");
            return;
        }

        const { lat, lng } = await geocodeAddress(street, postcode);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('tel', tel);
        formData.append('street', street);
        formData.append('postcode', postcode);
        formData.append('lat', lat);
        formData.append('lng', lng);

        const res = await fetch(`http://localhost:3001/users/${userContext.user._id}`, {
            method: 'PUT',
            body: formData
        });

        const data = await res.json();
        setUploaded(true);
    }

    return (
        <div className="form-container">
            <div className="form-heading">
                <h2>Edit profile</h2>
            </div>
            <form className="form-group mx-auto" onSubmit={onSubmit} style={{ maxWidth: "400px" }}>
                {!userContext.user ? <Navigate replace to="/login" /> : ""}
                {uploaded ? <Navigate replace to="/profile" /> : ""}
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        placeholder="firstname"
                        value={firstname}
                        onChange={(e) => { setFirstname(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        placeholder="lastname"
                        value={lastname}
                        onChange={(e) => { setLastname(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="tel"
                        placeholder="phone number"
                        value={tel}
                        onChange={(e) => { setTel(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="street"
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="postcode"
                        placeholder="Postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                </div>               
                <div className="mb-3 text-center">
                    <input className="btn btn-primary" type="submit" name="submit" value="Save changes" />
                </div>
            </form>
        </div>

    )
}

export default EditProfile;
