import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json',
});

export function helloWorld() {
    return 'hello world';
}
