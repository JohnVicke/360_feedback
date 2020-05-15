import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    responseType: 'json',
});

export async function GetUserByEmail(email) {
    const res = await api.get(`/users/email/${email}`);
    return res;
}

export async function GetUserById(id) {
    const res = await api.get(`/users/${id}`);
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

export async function UpdateUserResponses(id, responses) {
    const res = await api.patch(`/users/${id}`, responses);
    return res;
}

export async function putTemplate(template) {
    const res = await api.post('/templates', template);
}

export async function GetSurveyById(id) {
    const res = await api.get(`/surveys/${id}`);
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
  
export async function GetAllUsers() {
    const res = await api.get(`/users/`);
    return res;
}
  
export async function UpdateSurveyActive(id, active) {
    const res = await api.patch(`/surveys/${id}`, active);
    return res;
}
