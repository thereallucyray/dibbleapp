import axios from "axios";

const API_URL = 'http://localhost:8080/crops';

export async function saveCrop(crop) {
    return await axios.post(API_URL, crop);
}

export async function getCrop(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function getIntercrops(id) {
    return await axios.get(`${API_URL}/${id}/intercrops`);
}

export async function addIntercrop(id, otherId){
    return await axios.put(`${API_URL}/${id}/intercrop/${otherId}`);
}