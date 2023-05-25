import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Histories from "./Histories";
import Map from "./Map";
import './styles/ShowMailbox.css';

function ShowMailbox() {
    const { id } = useParams();
    const [mailbox, setMailbox] = useState(null);
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        const fetchMailbox = async () => {
            try {
                const response = await fetch(`http://localhost:3001/mailboxes/${id}`);
                const data = await response.json();
                setMailbox(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMailbox();
    }, [id]);

    useEffect(() => {
        const fetchHistories = async () => {
            try {
                const response = await fetch(`http://localhost:3001/histories/byParentPost/${id}`);
                const data = await response.json();
                setHistories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHistories();
    }, [id]);

    return (
        <div>
            {mailbox ? (
                <div className="showMailbox-container">
                    <div className="left-container">
                        <div className="mailbox-container-show">
                            <h5 className="mailbox-name">Box ID: {mailbox.boxID}</h5>
                            <div className="mailbox-box">
                                <div className="mailbox-image"></div>
                                <p className="mailbox-info">
                                    {mailbox.street}, {mailbox.postcode}, {mailbox.post}
                                </p>
                            </div>
                            <p className="mailbox-info">Open: {mailbox.open.toString()}</p>
                            <p className="mailbox-info">Assign to: {mailbox.mailboxUser.username}</p>
                            <p className="mailbox-info">Date: {mailbox.date}</p>
                            <p className="mailbox-info">Added: {mailbox.userId.username}</p>
                        </div>
                        <div className="histories-container">
                            <Histories histories={histories} mailboxId={mailbox.boxID} />
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="map-container">
                            <Map street={mailbox.street} postcode={mailbox.postcode} city={mailbox.post} country={"Slovenia"}/>
                        </div>
                    </div>
                </div>

            ) : (
                <p>Loading mailbox...</p>
            )}
        </div>
    );
}

export default ShowMailbox;
