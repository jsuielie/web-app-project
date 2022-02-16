import React from "react";
import SingleCard from "./SingleCard";

function Column(props) {
    
    
    return(
        <div className="col">
            {props.cardDataInSingleCol.map((cardData, index) => <SingleCard className="single-card" key={index} cardData={cardData} />)}
        </div>
    )
}

export default Column;