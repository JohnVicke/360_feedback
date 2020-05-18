import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    responseType: 'json',
});

export async function GetUserByEmail(email) {
    const res = await api.get(`/users/email/${email}`);
    return res;
}

export async function GetUserEvals(id) {
    const res = await api.get(`/users/${id}`);
    return res;
}

export async function getTemplate(id) {
    const res = await api.get(`/questionare/${id}`);
    return res;
}

export default async function getAllUsers() {
    const res = await api.get('/users');
    return res;
}

