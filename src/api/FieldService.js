import axios from "axios";

const API_URL = 'http://localhost:8080/fields';

export async function getField(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function getFieldCrops(id) {
    return await axios.get(`${API_URL}/${id}/crops`);
}

export async function getFieldActiveCrops(id) {
  return await axios.get(`${API_URL}/${id}/active_crops`);
}

export async function getFieldHistoricCrops(id) {
  return await axios.get(`${API_URL}/${id}/historic_crops`);
}

export async function deleteCrop(fieldId, cropId){
  return await axios.delete(`${API_URL}/${fieldId}/crop/${cropId}`);
}