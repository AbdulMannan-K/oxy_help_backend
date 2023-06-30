import multer from "multer";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from 'https'
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import admin from "firebase-admin";
import serviceAccount from "./pk.json" assert { type: "json" };
import {getAuth} from "firebase-admin/auth";
import capsuleRoutes from "./routes/capsuleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import mongoose from "mongoose";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let privateKey  = fs.readFileSync('sslcert/key.pkey', 'utf8');
let certificate = fs.readFileSync('sslcert/cert.cer', 'utf8');
let credentials = {key: privateKey, cert: certificate};

const DIR = './public/';

const app = express();
let httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/public', express.static('public'));
app.use('/capsules', capsuleRoutes);
app.use('/users', userRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/employees', employeeRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/capsuleDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((err) => {
        console.log('Failed to connect to mongoDB', err)
    })


httpsServer.listen(port,'0.0.0.0', () => {
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

app.delete('/:imagename',function (req, res) {
    let message = "Error! in image upload.";
    if (!req.params.imagename) {
        console.log("No file received");
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');

    } else {
        console.log('file received');
        console.log(req.params.imagename);
        try {
            fs.unlinkSync(DIR+'/'+req.params.imagename);
            console.log('successfully deleted /tmp/hello');
            return res.status(200).send('Successfully! Image has been Deleted');
        } catch (err) {
            // handle the error
            return res.status(400).send(err);
        }

    }

});


app.post('/', upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    let client = (req.body.client);
    console.log(client);
    console.log(url + '/public/' + req.file.filename)
    res.send(url + '/public/' + req.file.filename);
})

app.delete('/deleteUser/:uid',async function (req, res) {
    const uid = req.params.uid;
    await getAuth().deleteUser(uid).then().catch(err => console.log(err))
})