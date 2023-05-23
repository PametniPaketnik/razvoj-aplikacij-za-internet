import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Histories from "./Histories";

function ShowPhoto() {
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
                <div>
                    <h5>ID: {mailbox.name}</h5>
                    <p>Street: {mailbox.street}</p>
                    <p>Postcode: {mailbox.postcode}</p>
                    <p>Post: {mailbox.post}</p>
                    <p>Open: {mailbox.open.toString()}</p>
                    <p>Date: {mailbox.date}</p>
                    <p>Added: {mailbox.userId.username}</p>
                    <Histories histories={histories} />
                </div>
            ) : (
                <p>Loading mailbox...</p>
            )}
        </div>
    );
}

export default ShowPhoto;