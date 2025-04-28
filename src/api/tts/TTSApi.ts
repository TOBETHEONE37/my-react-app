import axios from "axios";

const hostUrl = '/api';

const generateTtsFile = (text: string): Promise<string> => {
    return axios
        .post(`${hostUrl}/tts/`, { text })
        .then((response) => `${hostUrl}${response.data.audio_url}`);
};

export default {
    generateTtsFile
}
