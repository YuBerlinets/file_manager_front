import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const api = {
    files: {
        allFiles: () => apiInstance.get(`api/files/info`),
        downloadFile: (fileName: string) => axios.get(`/api/files/${fileName}`),
    },

    user: {
        register: (username: string, password: string, name: string) => apiInstance.post('/api/user/register', { username, password, name }),
        authenticate: (username: string, password: string) => apiInstance.post('/api/user/login', { username, password }),
        getInformation: () => apiInstance.get('/api/user/info'),
        getNotConfirmedUsers: () => apiInstance.get('/api/user/not_confirmed_accounts'),
        confirmUser: (username: string) => apiInstance.post(`/api/user/confirm_account/${username}`),
    }
};

export { api };
export const setAuthToken = (token: string) => {
    if (token) {
        apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete apiInstance.defaults.headers.common["Authorization"];
}