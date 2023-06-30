import {Response, Request} from "express";
import axios from 'axios';
import { getRoverList, getPhotosFromRover } from './requests'

const express = require("express");
const port = 8008;
const app = express();


app.use(express.json());
const roverRouter = express.Router();
roverRouter.get('/rovers', async (req: Request, res: Response) => {
    res.send(await getRoverList());
});
roverRouter.get('/rovers/:rover_name/photos/:camera_type', async (req: Request, res: Response) => {
    res.send(await getPhotosFromRover(req.params['rover_name'], req.params['camera_type']));
});
app.use('/', roverRouter);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});