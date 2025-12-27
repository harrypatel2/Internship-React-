import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getStats = async () => {
    try {
        const response = await API.get('/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
