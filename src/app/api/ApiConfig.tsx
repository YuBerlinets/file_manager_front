import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
    baseURL,
});

const api = {
    files: {
        allFiles: () => apiInstance.get(`api/files/info`),
        downloadFile: (fileName: string) => apiInstance.get(`/api/files/${fileName}`, { responseType: 'blob' }),
    },

    user: {
        register: (username: string, password: string, name: string) => apiInstance.post('/api/user/register', { username, password, name }),
        authenticate: (username: string, password: string) => apiInstance.post('/api/user/login', { username, password }),
        getInformation: () => apiInstance.get('/api/user/info'),
        getNotConfirmedUsers: () => apiInstance.get('/api/user/admin/not_confirmed_accounts'),
        confirmUser: (username: string) => apiInstance.post(`/api/user/admin/confirm_account/${username}`),
    }
};

export const setAuthToken = (token: string | null) => {
    if (token) {
        apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete apiInstance.defaults.headers.common["Authorization"];
    }
}

const storedToken = localStorage.getItem('token');

setAuthToken(storedToken);

export { api };
