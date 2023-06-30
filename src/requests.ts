import axios from "axios";

export interface Image {
    id: number;
    img_src:string;
}

export interface Rover {
    id: number;
    name: string;
}

export async function getRoverList() {
    try {
        const resp = await axios.get(
            'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K');
        return resp.data.rovers.map((item: Rover) => {
            return item.name;
        });
    } catch (e) {
        console.error(e);
    }
}

export async function getPhotosFromRover(roverName: string, cameraType: string) {
    try {
        const resp = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' +
            roverName + '/photos' + '?sol=0&camera=' + cameraType +
            '&api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K');
        return resp.data.photos.map((item: Image) => {
            return item.img_src;
        });
    } catch (e) {
        console.error(e);
    }
}

export async function getPhotosFromRoverWithSolAndPages(roverName: string, cameraType: string, sol: number, page: number) {
    try {
        const resp = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' +
            roverName + '/photos' + '?sol=' + sol + '&camera=' + cameraType + '&page=' + page +
            '&api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K');
        return resp.data.photos.map((item: Image) => {
            return item.img_src;
        });
    } catch (e) {
        console.error(e);
    }
}

export async function getPhotosFromRoverWithPageRange(roverName: string, cameraType: string, sol: number, pageStart?: number, pageEnd?: number) {
    try {
        if(pageStart > pageEnd) {
            throw new Error("start is bigger than end");
        } else if (pageStart < 0 || pageEnd < 0) {
            throw new Error("parameter is negative");
        }
        const resp = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' +
            roverName + '/photos' + '?sol=' + sol + '&camera=' + cameraType +
            '&api_key=0ph5CMFkcljUN0DfeSUKMSkDY4WsdNtFjAgMVJ0K');
        return resp.data.photos.slice(pageStart,pageEnd);
    } catch (e) {
        console.error(e);
    }
}