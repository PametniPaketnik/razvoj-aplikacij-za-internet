import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import {Link, Navigate} from 'react-router-dom';
import './styles/Login.css';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext); 

    async function Login(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (res.ok) {
            const data = await res.json();
            userContext.setUserContext(data);
        } else if (res.status === 401) {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        } else {
            setError("An error occurred. Please try again later.");
        }
    }

    return (
        <div className="login-container">
            {userContext.user ? <Navigate replace to="/" /> : ''}
            <div className="login-box">
                <div className="login-image">
                    {/* Slika, ki jo želite prikazati na desni strani */}
                </div>
                <div className="login-form">
                    <div className="login-title">
                        <h2>Welcome!</h2>
                        <h3>Sign in to your Account</h3>
                    </div>
                    <div className="login-formform">
                    <form onSubmit={Login}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="signup-button">
                        <input type="submit" name="submit" value="Sign in" />
                            <Link to="/register" className="nav-link">Sign up</Link>
                        </div>
                        <label className="error">{error}</label>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
