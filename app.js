const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = 5000;
const mysql = require("mysql");
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist')); // it makes the client side able to get the index.html and main.js when url pattern is "/".


let con = mysql.createConnection({ // it makes connection to MySQL database possible
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
con.connect(); // start the connection

app.get('/board/:id', function (req, res) { // http request to url "/board/:id" and get index.html file
    console.log("get file from the path: ", path.join(__dirname, "/dist/index.html"));
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.get('/get-board/:boardId', function (req, res) {
    let { boardId } = req.params;
    con.query("SELECT CardID, Msgs, CreateTime, SenderLastName, SenderFirstName, ImageURL FROM Cards WHERE BoardID = ?", [[[boardId]]], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        console.log("These are cards' data.");
        res.json({ BoardContent: result.map(obj => { return { CardID: obj.CardID, Msgs: obj.Msgs, CreateTime: obj.CreateTime, SenderLastName: obj.SenderLastName, SenderFirstName: obj.SenderFirstName, ImageURL: obj.ImageURL } }) })
    })
});

app.post('/add-card', (req, res) => {
    console.log(req.body.cardContent);
    con.query("INSERT INTO Cards (Msgs, BoardID, SenderLastName, SenderFirstName) VALUES ?",
        [[[req.body.cardContent, req.body.BoardID, req.body.senderLastName, req.body.senderFirstName]]],
        function (err, result, fields) {
            if (err) {
                console.log(err);
                res.status(500).json({ "message": "error" })
            };
            console.log(result);
            con.query("SELECT CardID, Msgs, CreateTime, SenderLastName, SenderFirstName, ImageURL FROM Cards WHERE CardID = ?", [[[result.insertId]]], (err, result, fields) => {
                if (err) throw err;
                console.log(result);
                console.log("These are cards' data.");
                res.json(result.map(obj => { return { CardID: obj.CardID, Msgs: obj.Msgs, CreateTime: obj.CreateTime, SenderLastName: obj.SenderLastName, SenderFirstName: obj.SenderFirstName, ImageURL: obj.ImageURL } })[0])
            })
        }
    )
})

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${port}`);
})
