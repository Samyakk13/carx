const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/carblog', { useNewUrlParser: true });
const bodyparser = require("body-parser");
const { text } = require("body-parser");
const app = express();
const port = 8000;
const multer = require('multer');


//setting storage for images
var storage = multer.diskStorage({
    destination :'./static/uploads/',
    filename: (req, file, cb)=> {
        cb(null, file.originalname);
    }
})

var upload = multer({storage:storage}).single('file')




// mongoose.connect('mongodb://localhost/carblog', function (err, res) {
//     if (err) {
//         console.log('ERROR connecting to MongoDB : ' + err);
//     }
//     else {
//         console.log('Connected to: MongoDB');
//     }
// });


// var Schema = mongoose.Schema;
const carblog = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const blog = mongoose.model('blogs', carblog);


app.use(express.static('static'));
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());
app.use(express.json());


app.post('/', upload, function(req, res, next){
    var mydata = new blog({
        email: req.body.email,
        text: req.body.text,
        img: req.file.filename
    });


    mydata.save().then(() =>{
        res.redirect("./index.html")
    }).catch(() => {
        res.status(400).send("the item was not stored in the database")
    })
});






app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});


