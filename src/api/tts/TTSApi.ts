import axios from "axios";

// const hostUrl = '/api';
const hostUrl = 'https://my-backend-production-72f8.up.railway.app';

const generateTtsFile = (text: string): Promise<string> => {
    return axios
        .post(`${hostUrl}/tts/`, { text })
        .then((response) => `${hostUrl}${response.data.audio_url}`);
};

const emergency = (): Promise<string> => {
    return axios
        .get(`${hostUrl}/emergency/`)
        .then((response) => response.data.message);
};

export default {
    generateTtsFile,
    emergency
}
