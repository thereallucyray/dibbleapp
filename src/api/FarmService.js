import axios from "axios";

const API_URL = 'http://localhost:8080/farms';

export async function saveFarm(farm) {
    return await axios.post(API_URL, farm);
}

export async function getFarm(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function getFarmCrops(id) {
    return await axios.get(`${API_URL}/crops/${id}`);
}