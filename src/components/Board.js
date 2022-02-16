import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ColumnLayout from "./ColumnLayout";
import BoardHeader from "./BoardHeader";

function Board() {
    const [cardsData, setCardsData] = useState([]);
    const [colNum, setColNum] = useState(3);

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
            <BoardHeader boardTitle={"title"} />
            <div><Link to={`/board/${id}/create`}>Add New Card</Link></div>
            <div className="main-layout">
                <ColumnLayout cardsData={cardsData} colNum={colNum} />
            </div>
        </div >
    )
}

export default Board;