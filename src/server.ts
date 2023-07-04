import {Response, Request, NextFunction} from "express";
import {
    getRoverList,
    getPhotosFromRover,
    getPhotosFromRoverWithSolAndPages, getPhotosFromRoverWithPageRange, getCamerasForRover
} from './requests'

const express = require("express");
const port = 8008;
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
const roverRouter = express.Router();
roverRouter.get('/rovers', async (req: Request, res: Response) => {
    res.send(await getRoverList());
});
roverRouter.get('/rovers/camera/:rover_name', async (req: Request, res: Response) => {
    res.send(await getCamerasForRover(req.params['rover_name']));
});
roverRouter.get('/rovers/:rover_name/photos/:camera_type', async (req: Request, res: Response) => {
    res.send(await getPhotosFromRover(req.params['rover_name'], req.params['camera_type']));
});
roverRouter.get('/rovers/:rover_name/photos/:camera_type/:sol/:page', async (req: Request, res: Response) => {
    res.send(await getPhotosFromRoverWithSolAndPages(req.params['rover_name'], req.params['camera_type'],
        parseInt(req.params['sol']), parseInt(req.params['page'])));
});
roverRouter.get('/rovers/:rover_name/photos/:camera_type/:sol', async (req: Request, res: Response) => {
    const pageStart = <string>req.query.page_start;
    const pageEnd = <string>req.query.page_end;
    if (!!pageStart && !!pageEnd) {
        res.send(await getPhotosFromRoverWithPageRange(req.params['rover_name'], req.params['camera_type'],
            parseInt(req.params['sol']), parseInt(pageStart), parseInt(pageEnd)));
    } else {
        res.sendStatus(406);
    }
});
app.use('/', roverRouter);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});