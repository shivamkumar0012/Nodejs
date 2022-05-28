var express = require('express')
var app = express()
var multer = require('multer')
var fs = require('fs')

var upload = multer({dest: './static/images/'})
const mongoose = require('mongoose')
const model = require('./modelimage/model')



const url  = 'mongodb://localhost/addimageeventirad'
const cors = require('cors')
app.use(cors());
const bodyParser = require("body-parser")
app.use(express.json())
mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on('open',() => {
    console.log('connected...')
})

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.post('/upload', upload.single('picture'), function (req,res){
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S')
    console.log("Recieved file" + req.file.originalname);
    var src = fs.createReadStream(req.file.path);
    var dest = fs.createWriteStream('./public/images/' + req.file.originalname);
    src.pipe(dest);
    src.on('end', function() {
        fs.unlinkSync(req.file.path);
        const imagepost = new model({
            image: req.file.originalname,
            datetime: formatted
            // position: req.body.position
        }) 
        const savedimage = imagepost.save()
        res.json('ok: recieved ' + req.file.originalname)
    });

    src.on('error', function(err) { res.json('something went wrong!'); });
});

let port = process.env.PORT || 2800;
app.listen(port, function() {
    return console.log('started server on port ' + port);
});
