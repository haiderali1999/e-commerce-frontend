import { API_URL, callAPi, callAPiMultiPart } from './http-common';

const getSellers = () => callAPi.get(`${API_URL}/users?role=seller`);
const signup = (data) => callAPiMultiPart.post(`${API_URL}/users/signup`, data);
const login = (data) => callAPi.post(`${API_URL}/users/login`, data);

export { getSellers, signup, login };
