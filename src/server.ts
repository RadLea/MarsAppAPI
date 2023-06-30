import {Response, Request} from "express";
import {
    getRoverList,
    getPhotosFromRover,
    getPhotosFromRoverWithSolAndPages, getPhotosFromRoverWithPageRange
} from './requests'

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
roverRouter.get('/rovers/:rover_name/photos/:camera_type/:sol/:page', async (req: Request, res: Response) => {
    res.send(await getPhotosFromRoverWithSolAndPages(req.params['rover_name'], req.params['camera_type'],
        parseInt(req.params['sol']), parseInt(req.params['page'])));
});
roverRouter.get('/rovers/:rover_name/photos/:camera_type/:sol', async (req: Request, res: Response) => {
    const pageStart =<string> req.query.page_start;
    const pageEnd=<string> req.query.page_end;
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