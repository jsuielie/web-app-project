const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer')              // multer will be used to handle the form data.
const Aws = require('aws-sdk')                // aws-sdk library will used to upload image to s3 bucket.
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


const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})

app.get(['/board/:id', '/board/:id/create'], function (req, res) { // http request to url "/board/:id" and get index.html file
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


// creating the storage variable to upload the file and providing the destination folder, 
// if nothing is provided in the callback it will get uploaded in main directory

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: filefilter
});

// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
app.post('/upload-image', upload.single('cardimage'), (req, res) => {
    console.log(req.file)  // to check the data in the console that is being uploaded

    // Definning the params variable to uplaod the photo

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key: req.file.originalname,               // Name of the image
        Body: req.file.buffer,                    // Body which will contain the image in buffer format
        ACL: "public-read-write",                 // defining the permissions to get the public link
        ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    // uplaoding the photo using s3 instance and saving the link in the database.

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ "err": error })  // if we get any error while uploading error message will be returned.
        }

        // If not then below code will be executed

        console.log(data);                     // this will give the information about the object in which photo is stored 

        /*
       // saving the information in the database.   
        const product = new Product({
                name: req.body.name,
                price: req.body.price,
                productImage: data.Location
            });
            product.save()
                .then(result => {
                    res.status(200).send({
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        productImage: data.Location,
                    })
                })
                .catch(err => {
                    res.send({ message: err })
              })
        })
        */
        res.json({ "mesg": "succeeded" })
    });
})


app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${port}`);
})