import React from 'react';
import './styles/Home.css';
import Mailboxes from "./Mailboxes";

function Home() {
    return (
        <div>
            <div className="centered-image">
            </div>
            <Mailboxes></Mailboxes>
        </div>
    );
}

export default Home;