import axios from "axios";
import {Preset} from "./Models";

// FIXME local  배포 확인
// const hostUrl = '/api';
const hostUrl = 'https://my-backend-production-72f8.up.railway.app';

const genLocalAudioUrl = (audioUrl: string) => {
    return `${hostUrl}${audioUrl}`
}

const generateTtsFile = (text: string): Promise<Preset> => {
    return axios
        .post(`${hostUrl}/tts/`, { text })
        .then((response) => {
            const preset: Preset = response.data;
            preset.audioUrl = genLocalAudioUrl(preset.audioUrl);
            return preset;
        });
};

const emergency = (): Promise<string> => {
    return axios
        .get(`${hostUrl}/emergency/`)
        .then((response) => response.data.message);
};

const broadcasts = (zoneIds: number[], preset: Preset | null): Promise<string> => {
    return axios
        .post(`${hostUrl}/broadcasts/`, {zoneIds, preset})
        .then((response) => response.data.message);
};

const stopBroadcasts = (zoneIds: number[]): Promise<string> => {
    return axios
        .post(`${hostUrl}/broadcasts/stop/`, {zoneIds})
        .then((response) => response.data.message);
};

const getPresetList = (): Promise<Preset[]> => {
    return axios
        .get(`${hostUrl}/preset/`)
        .then((response) => {
            const res: Preset[] = response.data;
            res.forEach(preset => preset.audioUrl = genLocalAudioUrl(preset.audioUrl))
            return res;
        });
};

const removePreset = (id: number): Promise<Preset[]> => {
    return axios
        .delete(`${hostUrl}/preset/?id=${id}`)
        .then((response) => {
            return response.data.message;
        });
};

export default {
    generateTtsFile,
    emergency,
    broadcasts,
    stopBroadcasts,
    getPresetList,
    removePreset
}
