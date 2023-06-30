import {Response, Request} from "express";

const express = require("express");
const port = 8008;
const app = express();


app.use(express.json());
const router = express.Router();
router.get('/test', (req: Request, res: Response) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});