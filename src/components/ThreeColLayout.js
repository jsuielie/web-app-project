import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";


function ThreeColLayout(props) {
    const [colOne, setColOne] = useState([]);
    const [colTwo, setColTwo] = useState([]);
    const [colThree, setColThree] = useState([]);

    useEffect(() => {
        let colOneData = [];
        let colTwoData = [];
        let colThreeData = [];

        console.log("This is three col layout props");
        console.log(props);

        for (let idx = 0; idx < props.cardsData.length; idx++) {
            if (idx % 3 === 0) {
                colOneData.push(props.cardsData[idx]);
            }
            else if (idx % 3 === 1) {
                colTwoData.push(props.cardsData[idx]);
            }
            else {
                colThreeData.push(props.cardsData[idx]);
            }
        }

        setColOne(colOneData);
        setColTwo(colTwoData);
        setColThree(colThreeData);
        
    }, [props.cardsData]);


    return (
        <div className="three-colunm-layout">
            <div className="col">
                {colOne.map((cardData, index) => <SingleCard className="single-card" key={index} cardData={cardData} />)}
            </div>
            <div className="col">
                {colTwo.map((cardData, index) => <SingleCard className="single-card" key={index} cardData={cardData} />)}
            </div>
            <div className="col">
                {colThree.map((cardData, index) => <SingleCard className="single-card" key={index} cardData={cardData} />)}
            </div>
        </div>

    )
}

export default ThreeColLayout;