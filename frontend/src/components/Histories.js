import { useState, useEffect } from 'react';
import History from "./History";
import {useParams} from "react-router-dom";

function Comments(){
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
            <h3>Histories:</h3>
            <ul>
                {histories.map((history) => (
                    <History history={history}
                             key={history._id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Comments;