import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState, useContext } from "react";
import Mailbox from "./Mailbox";
import MapMarker from './MapMarker';
import Route from './Route.js';

function MyMailbox() {
    const userContext = useContext(UserContext);
    const { userId } = useParams();
    const [mailboxes, setMailboxes] = useState([]);
    const [mailboxId, setMailboxId] = useState(null);
    const [mailboxesLatLng, setMailboxesLatLng] = useState([]);

    useEffect(() => {
        const getMailboxes = async () => {
            const res = await fetch(`http://localhost:3001/mailboxes/showByMailboxUser/${userId}`);
            const data = await res.json();
            console.log(data);

            const filteredMailboxes = data.filter(mailbox => {
                return (
                    mailbox.mailboxUser._id === userId ||
                    mailbox.accessUser.some(user => user._id === userId)
                );
            });

            const mailboxIds = filteredMailboxes.map(mailbox => mailbox._id);
            const lngLatArray = filteredMailboxes.map(mailbox => ({
                lng: mailbox.lng,
                lat: mailbox.lat
            }));

            console.log(mailboxIds);
            setMailboxId(mailboxIds);
            setMailboxes(filteredMailboxes);
            console.log(lngLatArray);
            setMailboxesLatLng(lngLatArray);
        };

        getMailboxes();
    }, []);


    return(
        <div>
            <div className="left-container">
                <h3>Mailboxes:</h3>
                <ul>
                    {mailboxes.map(mailbox=>(<Mailbox mailbox={mailbox} key={mailbox._id}></Mailbox>))}
                </ul>
            </div> 
            <div className="right-container">
                {mailboxes.map(mailbox=>(
                    <div className="map-container">
                        <Route location1={[userContext.user.lat, userContext.user.lng]} location2={[mailbox.lat, mailbox.lng]}></Route>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyMailbox;
