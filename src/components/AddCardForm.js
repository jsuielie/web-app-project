import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function AddCardForm() {
    const [senderFirstName, setSenderFirstName] = useState("");
    const [senderLastName, setSenderLastName] = useState("");
    const [cardContent, setCardContent] = useState("");
    const navigate = useNavigate();
    let { id: BoardID } = useParams();


    function updateInput(e, stateSetter) {
        console.log(e.target.value);
        stateSetter(e.target.value);
    }


    function submitCard(e) {
        e.preventDefault();
        if (cardContent === "") {
            console.log("Card content is empty!!")
            alert("No message is typed.");
        }
        else if (senderLastName === "") {
            console.log("Sender's last name is empty!!")
            alert("What'your Name?");
        }
        else if (senderFirstName === "") {
            console.log("Sender's first name is empty!!")
            alert("What'your Name?");
        }
        else {
            console.log('before fetch');

            const data = { "cardContent": cardContent, "BoardID": BoardID, "senderLastName": senderLastName, "senderFirstName": senderFirstName };

            fetch('http://localhost:5000/add-card', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    navigate(`/board/${BoardID}`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error: fail to write card!!!');
                });


            console.log("~~This is sender's data and form's children~~");
            console.log(data);
            console.log(e.target.children);


            e.target.children[2].value = "";
            e.target.children[6].value = "";
            e.target.children[7].value = "";
            setSenderFirstName("");
            setSenderLastName("");
            setCardContent("");
        }
    }

    return (
        <div>
            <form onSubmit={(e) => submitCard(e)}>
                <label htmlFor="SendersFirstName">{"First name:"}</label>
                <br />
                <input type="text" name="SendersFirstName" onChange={(e) => updateInput(e, setSenderFirstName)} />
                <br />
                <label htmlFor="SenderLastName">{"Last name:"}</label>
                <br />
                <input type="text" name="SenderLastName" onChange={(e) => updateInput(e, setSenderLastName)}></input>
                <textarea placeholder="type some message here" onChange={(e) => updateInput(e, setCardContent)} rows="10"></textarea>
                <button type="submit">Submit!</button>
            </form>
        </div>
    )
}

export default AddCardForm;