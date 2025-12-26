import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/admin/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createProduct = async (data, token) => {
  try {
    const response = await API.post("/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await API.get("/");

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getSingleProduct = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (id, data, token) => {
  try {
    const response = await API.put(`/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const deleteProduct = async (id, token) => {
  try {
    const response = await API.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


