import axios from "axios";

const API_URL = 'http://localhost:8080/farmers';

export async function saveFarmer(farmer) {
    return await axios.post(API_URL, farmer);
}

export async function getFarmer(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function getFarm(uid) {
  return await axios.get(`${API_URL}/farm/${uid}`);
}