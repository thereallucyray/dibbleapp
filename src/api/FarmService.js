import axios from "axios";

const API_URL = 'http://localhost:8080/farms';

export async function saveFarm(farm) {
    return await axios.post(API_URL, farm);
}

export async function getContacts(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateContact(contact) {
    return await axios.post(API_URL, contact);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`);
}