import axios from 'axios';

const API_URL = 'http://localhost:5001/api/orders';

// Get logged in user orders
export const getMyOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}/myorders`, config);

    return response.data;
};
