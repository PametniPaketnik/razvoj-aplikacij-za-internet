import { useState, useEffect } from 'react';
import History from "./History";
import {useParams} from "react-router-dom";
import './styles/History.css'

function Histories({ mailboxId }){
    const { id } = useParams();
    const [histories, setHistories] = useState([]);
    useEffect(function(){
        const getHistories = async function(){
            const res = await fetch(`http://localhost:3001/histories/byParentMailbox/${id}`);
            const data = await res.json();
            setHistories(data);
        }
        getHistories();
    }, [id]);

    return(
        <div>
            <h3 className="histories-caption">Histories:</h3>
            <ul>
                {histories.map((history) => (
                    <History history={history}
                             boxId={mailboxId}
                             key={history._id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Histories;