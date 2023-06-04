import { useState, useContext } from 'react';
import { UserContext } from '../userContext';
import './styles/Register.css';

function Test() {
    const [error, setError] = useState([]);
    const [file, setFile] = useState('');
    const userContext = useContext(UserContext); 

    async function Register(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', userContext.user._id);
        formData.append('image', file);

        const res = await fetch('http://localhost:3001/api/faceDetection', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        /*const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = '/test';
        } else {
            setError('Napaka pri posiljanju slike');
        }*/
    }

    return (
        <div className="register-container">
            <form onSubmit={Register}>
                <label>Choose Image</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
                <div className="signin-button">
                    <input type="submit" name="submit" value="Poslji sliko"/>
                </div>
                <label>{error}</label>
            </form>
        </div>
    );
}

export default Test;
