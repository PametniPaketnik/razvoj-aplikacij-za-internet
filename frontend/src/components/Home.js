import React from 'react';
import image from './pictures/paketniki.jpg';
import './styles/Home.css';
import Mailboxes from "./Mailboxes";

function Home() {
    return (
        <div>
            <div>
                <img src={image} className="centered-image"/>
            </div>
            <Mailboxes></Mailboxes>
        </div>
    );
}

export default Home;
