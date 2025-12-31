import axios from "axios";

// Force localhost for testing to avoid .env conflict
const API_URL = 'http://localhost:5001';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const API = axios.create({
    baseURL: `${API_URL}/api/orders`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const createOrder = async (orderData, token) => {
    try {
        const response = await API.post("", orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
