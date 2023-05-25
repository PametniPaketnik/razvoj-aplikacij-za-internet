import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import Mailbox from './Mailbox';
import MapMarker from './MapMarker';
import { Link } from "react-router-dom";

function Mailboxes(){
    const [mailboxes, setMailboxes] = useState([]);
    const isAdminSite = window.location.pathname === "/admin";
    const location = [46.5547, 15.6459];

    useEffect(function(){
        const getMailboxes = async function(){
            const res = await fetch("http://localhost:3001");
            const data = await res.json();
            setMailboxes(data);
        }
        getMailboxes();
    }, []);

    return(
        <div>
            <h3 className="heading">ALL MAILBOXES</h3>
            {isAdminSite && (
                <div className="centered-add">
                <Link to='/publish' className="mailbox-add"></Link>
                </div>
            )}
            <ul>
                {mailboxes.map(mailbox=>(<Mailbox
                    mailbox={mailbox}
                    key={mailbox._id}
                    onMailboxDeleted={() => {
                        const getMailboxes = async function(){
                            const res = await fetch(`http://localhost:3001`);
                            const data = await res.json();
                            setMailboxes(data);
                        }
                        getMailboxes();
                    }}
                ></Mailbox>))}
            </ul>
            <MapContainer center={location} zoom={13} scrollWheelZoom={false} style={{ height: '80vh', width: '80%' }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { mailboxes.map(mailbox=>(<MapMarker lng={mailbox.lng} lat={mailbox.lat} ></MapMarker>)) }
            </MapContainer>
        </div>
    );
}

export default Mailboxes;
