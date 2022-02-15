import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ThreeColLayout from "./ThreeColLayout";

function Board() {
    const [cardsData, setCardsData] = useState([]);

    let { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/get-board/${id}`, { method: "GET" }) // get board data from database
            .then(response => response.json())
            .then(data => {
                setCardsData(data.BoardContent);
                console.log("data borad content");
                console.log(data.BoardContent);
            })
        console.log("Board Card Content");
        console.log(cardsData);
    }, []);


    return (
        < div className="board">
            <div><Link to={`/board/${id}/create`}>Add New Card</Link></div>
            <ThreeColLayout cardsData={cardsData} />
        </div >
    )
}

export default Board;