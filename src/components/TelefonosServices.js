import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_CALL;

export const llamarCliente = (userName, phoneNumber) => {
  return axios.post(`${BASE_URL}/Call`, {
    userName,
    phoneNumber,
  });
};
