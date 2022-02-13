import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function AddCardForm() {
    const [senderFirstName, setSenderFirstName] = useState("");
    const [senderLastName, setSenderLastName] = useState("");
    const [cardContent, setCardContent] = useState("");
    const [cardImage, setCardImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const navigate = useNavigate();
    let { id: BoardID } = useParams();


    function updateInput(e, stateSetter, value) {
        console.log(value);
        stateSetter(value);
    }

    function onChangeImage(e) {
        var reader = new FileReader();
        console.log(e.target)
        var url = reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = function (e) {
            setPreviewImageUrl(reader.result)

        };
        setCardImage(e.target.files[0]);
        console.log(url)
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

            let formData = new FormData();
            formData.append("cardContent", cardContent);
            formData.append("BoardID", BoardID);
            formData.append("senderLastName", senderLastName);
            formData.append("senderFirstName", senderFirstName);
            formData.append("cardImage", cardImage);

            console.log(formData);

            //const data = { "cardContent": cardContent, "BoardID": BoardID, "senderLastName": senderLastName, "senderFirstName": senderFirstName };

            fetch('http://localhost:5000/add-card', {
                method: 'POST', // or 'PUT'
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    navigate(`/board/${BoardID}`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error: fail to write card!!!');
                });


    

            console.log("~~This is sender's data and form's children~~");
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
            <form encType="multipart/form-data" onSubmit={(e) => submitCard(e)}>
                <label htmlFor="SendersFirstName">{"First name:"}</label>
                <br />
                <input type="text" name="SendersFirstName" onChange={(e) => updateInput(e, setSenderFirstName, e.target.value)} />
                <br />
                <label htmlFor="SenderLastName">{"Last name:"}</label>
                <br />
                <input type="text" name="SenderLastName" onChange={(e) => updateInput(e, setSenderLastName, e.target.value)}></input>
                <textarea placeholder="type some message here" onChange={(e) => updateInput(e, setCardContent, e.target.value)} rows="10"></textarea>
                <br />
                <input type="file" accept="image/*" onChange={(e) => onChangeImage(e)} />
                {previewImageUrl ? <img src={previewImageUrl} /> : "no"}
                <button type="submit">Submit!</button>
            </form>
        </div>
    )
}

export default AddCardForm;