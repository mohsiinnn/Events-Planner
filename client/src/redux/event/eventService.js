import axios from 'axios'
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_BACKEND_URL;

const createEvent = async (payload) => {
    const { data } = await axios.post(`${API_URL}/api/event/create-event`, payload)
    return data
}

const updateEvent = async (id, payload) => {
    const { data } = await axios.post(`${API_URL}/api/event/${id}`, payload)
    return data
}

const getAllEvents = async () => {
    const { data } = await axios.get(`${API_URL}/api/event/all-events`)
    return data
}

const getEventById = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/event/${id}`);
  return data;
};

const deleteEvent = async (id) => {
  const { data } = await axios.post(`${API_URL}/api/event/delete-event/${id}`);
  return data;
};

export default {
    createEvent,
    updateEvent,
    getAllEvents,
    getEventById,
    deleteEvent
}