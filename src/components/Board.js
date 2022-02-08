import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SingleCardContent from "./SingleCardContent";

function Board() {

    const [msg, setMsg] = useState([]);

    let { id } = useParams();
    console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/get-board/${id}`, { method: "GET" }) // get board data from database
            .then(response => response.json())
            .then(data => {
                setMsg(data.BoardContent);
            })
    }, []);

    return (
        < div >
            <div>
                {msg.map((singleMsg, index) => <SingleCardContent key={index} msg={singleMsg} />)}
            </div>
        </div >
    )
}

export default Board;