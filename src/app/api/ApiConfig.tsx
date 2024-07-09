import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
    baseURL,
});

const api = {
    files: {
        allFiles: () => apiInstance.get(`api/files`),
        downloadFile: (fileName: string) => apiInstance.get(`/api/files/download/${fileName}`, { responseType: 'blob' }),
        uploadFiles: (files: FileList) => {
            const formData = new FormData();
            // formData.append('file', file);
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });
            return apiInstance.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        filesSearch: (filename: string) => apiInstance.get(`api/files/search/${filename}`),
        infoByDirectory: (directory: string) => apiInstance.get(`api/files/by-directory/${directory}`),
    },

    user: {
        register: (username: string, password: string, name: string) => apiInstance.post('/api/user/register', { username, password, name }),
        authenticate: (username: string, password: string) => apiInstance.post('/api/user/login', { username, password }),
        getInformation: () => apiInstance.get('/api/user/account'),
        getNotConfirmedUsers: () => apiInstance.get('/api/admin/not-confirmed-accounts'),
        confirmUser: (username: string) => apiInstance.post(`/api/admin/confirm-account/${username}`),
        getUsers: () => apiInstance.get('/api/admin/all-accounts'),
        updatePassword: (password: string, password_repeat: string) => apiInstance.post('api/user/update-password', { password, password_repeat }),
        deleteUser: (username: string) => apiInstance.delete(`/api/admin/delete-account/${username}`),
        getUserByUsername: (username: string) => apiInstance.get(`/api/admin/account/${username}`)
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
