import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    responseType: 'json',
});

export async function GetUserByEmail(email) {
    const res = await api.get(`/users/email/${email}`);
    return res;
}

export async function GetUserByID(id) {
    const res = await api.get(`/users/${id}`);
    return res;
}

export async function GetAllUsers() {
    const res = await api.get(`/users/`);
    return res;
}

export async function GetUserEvals(id) {
    const res = await api.get(`/users/${id}`);
    return res;
}

export async function GetAllEvaluations() {
    const res = await api.get(`/surveys/`);
    return res;
}

export async function GetAllTemplates() {
    const res = await api.get(`/templates/`);
    return res;
}

export async function GetActiveEvaluations(status) {
    const res = await api.get(`/surveys/?active=true`);
    return res;
}
