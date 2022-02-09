import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SingleCard from "./SingleCard";
import AddCardForm from "./AddCardForm";

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

    function addCard(newCard) {
        setCardsData(cardsData.concat(newCard));
    }

    return (
        < div >
            <div>
                {cardsData.map((cardData, index) => <SingleCard key={index} cardData={cardData}/>)}
            </div>
            <AddCardForm addCard={addCard} BoardID={id} />
        </div >
    )
}

export default Board;