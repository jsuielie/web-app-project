import React, {useState } from "react";


function AddCardForm(props) {
    const [cardContent, setCardContent] = useState(""); 

    function updateInput(e) {
        console.log(e.target.value);
        setCardContent(e.target.value);
    }


    function updateText(e) {
        e.preventDefault();
        if (cardContent === "") {
            console.log("this is empty!!")
            alert("empty input~~");
        }
        else {
            props.addMsg(cardContent);
            console.log('before fetch');
/*
            const data = { "msg": this.state.userinput };
            fetch('http://localhost:3000/store_message', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
*/
            e.target.children[0].value = "";
            setCardContent("");
        }
    }

    return (
        <div>
            <form onSubmit={(e) => updateText(e)}>
                <textarea placeholder="type some message here" onChange={(e) => updateInput(e)} rows="2"></textarea>
                <button type="submit">Submit!</button>
            </form>
        </div>
    )
}

export default AddCardForm;