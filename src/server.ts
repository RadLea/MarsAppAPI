import {Response, Request} from "express";
import axios from 'axios';

const express = require("express");
const port = 8008;
const app = express();


app.use(express.json());
const router = express.Router();
router.get('/test', (req: Request, res: Response) => res.send('Hello world !'));
router.get('/rovers', (req: Request, res: Response) => {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K')
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            console.log("Yay");
        });
});
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});