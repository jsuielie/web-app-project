const express = require("express");
const bodyParser = require("body-parser");
//const path = require('path');
const app = express();
const port = 5000;
const mysql = require("mysql");
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));


let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
con.connect();

/*
app.get('/get-board/1', function (req, res) {
    con.query("SELECT * FROM Cards WHERE BoardID = 1", (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        console.log("These are Msgs.");
        result.map((object) => {console.log(object.Msgs)});
        res.json({ BoardContent: result.map(obj => obj.Msgs) }) // retrieve element of array of objects and assign their properties to object's propreties
    })
});
*/


app.get('/get-board/:id', function (req, res) {
    boardId = req.url.replace("/get-board/", "");
    con.query(`SELECT * FROM Cards WHERE BoardID = ${boardId}`, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        console.log("These are Msgs.");
        result.map((object) => {console.log(object.Msgs)});
        res.json({ BoardContent: result.map(obj => obj.Msgs) }) // retrieve element of array of objects and assign their properties to object's propreties
    })
});

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${port}`);
})
