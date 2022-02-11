import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import SingleCard from "./SingleCard";

function Board() {
    const [cardsData, setCardsData] = useState([]);

    let { id } = useParams();
    console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/get-board/${id}`, { method: "GET" }) // get board data from database
            .then(response => response.json())
            .then(data => {
                setCardsData(data.BoardContent);
            })
    }, []);

    return (
        < div>
            <div>
                {cardsData.map((cardData, index) => <SingleCard key={index} cardData={cardData}/>)}
            </div>
            <Link to={`/board/${id}/create`}>Add New Card</Link>
        </div >
    )
}

export default Board;