import axios from 'axios';

const API_URL = 'http://localhost:5001/api/orders';

// Get all orders (Admin)
export const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Get order details (Admin)
export const getOrderDetails = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}/${id}`, config);

    return response.data;
};

// Deliver order (Admin)
export const deliverOrder = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_URL}/${id}/deliver`, {}, config);

    return response.data;
};
