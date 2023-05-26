import React from 'react';
import image from './pictures/paketniki.jpg';
import './styles/Home.css';
import Mailboxes from "./Mailboxes";

function Home() {
    return (
        <div>
            <div className="div-HOME">
                <img src={image} className="centered-image" alt="Naslovna slika"/>
            </div>
            <Mailboxes></Mailboxes>
        </div>
    );
}

export default Home;
