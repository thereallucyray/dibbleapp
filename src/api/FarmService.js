import axios from "axios";

const API_URL = 'http://localhost:8080/farms';

export async function saveFarm(farm) {
    return await axios.post(API_URL, farm);
}

export async function getFarm(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function getFarmCrops(id) {
    return await axios.get(`${API_URL}/${id}/crops`);
}

export async function getFarmActiveCrops(id) {
    return await axios.get(`${API_URL}/${id}/active_crops`);
}

export async function getFarmSoils(id) {
    return await axios.get(`${API_URL}/${id}/soils`);
}

export async function getFarmFields(id) {
    return await axios.get(`${API_URL}/${id}/fields`);
}