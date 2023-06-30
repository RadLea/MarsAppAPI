import axios from "axios";
import {Request, response} from "express";

export async function getRoverList() {
    try {
        const resp = await axios.get(
            'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K');
        return resp.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getPhotosFromRover(roverName: string, cameraType: string) {
    try {
        const resp = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' +
            roverName + '/photos' + '?sol=0&camera=' + cameraType +
            '&api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K');
        return resp.data;
    } catch (e) {
        console.error(e);
    }
}