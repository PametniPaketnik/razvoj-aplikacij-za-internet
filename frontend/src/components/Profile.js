import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
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

    return (
    <div className="user-profile">
            <>  {!userContext.user ? <Navigate replace to="/login" /> : ""}
                <h1>User profile</h1>
                <img className="profile-image" src={"http://localhost:3001/" + profile.path} alt={profile.username} />
                <div className="profile-info">
                    <div>
                        <span className="label">Username</span>
                        <span className="value">{profile.username}</span>
                    </div>
                    <div>
                        <span className="label">Email</span>
                        <span className="value">{profile.email}</span>
                    </div>
                    <div>
                        <span className="label">First name</span>
                        <span className="value">{profile.firstName}</span>
                    </div>
                    <div>
                        <span className="label">Last name</span>
                        <span className="value">{profile.lastName}</span>
                    </div>
                    <div>
                        <span className="label">Telephone number</span>
                        <span className="value">{profile.tel}</span>
                    </div>
                    <div>
                        <span className="label">Street and post code</span>
                        <span className="value">{profile.street}</span>
                        <span className="value">{profile.postcode}</span>
                    </div>
                </div>
            </>
    </div>
    );
}

export default Profile;