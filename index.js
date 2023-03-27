import multer from "multer";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const DIR = './public/';

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/public', express.static('public'));

app.listen(port, () => {
    console.log('Connected to port ' + port)
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('another message : ' + req.body.client)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.post('/', upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    let client = (req.body.client);
    console.log(client);
    console.log(url + '/public/' + req.file.filename)
    res.send(url + '/public/' + req.file.filename);
    // user.save().then(result => {
    //     res.status(201).json({
    //         message: "Image uploaded successfully!",
    //         userCreated: {
    //             _id: result._id,
    //             image: result.image
    //         }
    //     })
    // }).catch(err => {
    //     console.log(err),
    //         res.status(500).json({
    //             error: err
    //         });
    // })
})