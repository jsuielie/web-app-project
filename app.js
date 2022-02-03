const express = require("express");
const bodyParser = require("body-parser");
//const path = require('path');
const app = express();
const port = 5000;
const mysql = require("mysql");
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


app.get('/board', function(req, res) {
    con.query("SELECT * FROM Cards", (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
});



app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${port}`);
})
