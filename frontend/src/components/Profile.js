import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles/Profile.css';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    const imageUrl = profile.path ? `http://localhost:3001/${profile.path}` : null;
    console.log("Image URL:", imageUrl);

    return (
    <div className="user-profile">
        <>  {!userContext.user ? <Navigate replace to="/login"/> : ""}
            <h1>User profile</h1>
            <img className="profile-image"
                 src={`http://localhost:3001/${profile.path}.jpg`}
                 alt={profile.username}/>
            <div className="profile-info">
                <div>
                    <h4 className="label">Username:</h4>
                    <h4 className="value">{profile.username}</h4>
                </div>
                <div>
                    <h4 className="label">Email:</h4>
                    <h4 className="value">{profile.email}</h4>
                </div>
                <div>
                    <h4 className="label">First name:</h4>
                    <h4 className="value">{profile.firstName}</h4>
                </div>
                <div>
                    <h4 className="label">Last name:</h4>
                    <h4 className="value">{profile.lastName}</h4>
                </div>
                <div>
                    <h4 className="label">Telephone number:</h4>
                    <h4 className="value">{profile.tel}</h4>
                </div>
                <div>
                    <h4 className="label">Street:</h4>
                    <h4 className="value">{profile.street}</h4>
                </div>
                <div>
                    <h4 className="label">Post code:</h4>
                    <h4 className="value">{profile.postcode}</h4>
                </div>
                <div className='edit-profile'>
                    <Link to={`/profile/edit`} className="mailbox-link">
                        Edit profile
                    </Link>
                </div>
            </div>
        </>
    </div>
    );
}

export default Profile;
