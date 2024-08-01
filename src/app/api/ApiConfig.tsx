import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
    baseURL,
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const isRefreshEndpoint = config.url?.includes('/api/user/refresh-token');

        if (token && !isRefreshEndpoint) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (isRefreshEndpoint) {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                console.log('Refreshing token');
                console.log(refreshToken);

                try {
                    const response = await apiInstance.post('/api/user/refresh-token', { refreshToken });
                    console.log(response)
                    if (response.status !== 200) {
                        localStorage.removeItem('username');
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        window.location.reload();
                    }
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('refreshToken', response.data.refreshToken);

                    setAuthToken(response.data.token);

                    originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
                    return apiInstance(originalRequest);
                } catch (e) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.reload();
                }
            }
        }
        return Promise.reject(error);
    }
);

const api = {
    files: {
        allFiles: () => apiInstance.get(`api/files`),
        downloadFile: (fileName: string) => apiInstance.get(`/api/files/download`, { responseType: 'blob', params: { filename: fileName } }),
        filesSearch: (filename: string) => apiInstance.get(`api/files/search/${filename}`),
        infoByPath: (directory: string) => apiInstance.get(`api/files`, { params: { path: directory } }),
        deleteFile: (filename: string) => apiInstance.delete(`api/files`,{ params: { filename: filename } }),
        uploadFiles: (files: FileList) => {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });
            return apiInstance.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
    },
    user: {
        register: (username: string, password: string, name: string) => apiInstance.post('/api/user/register', { username, password, name }),
        authenticate: (username: string, password: string) => apiInstance.post('/api/user/login', { username, password }),
        refreshToken: (refreshToken: string) => apiInstance.post('/api/user/refresh-token', { refreshToken }),
        getInformation: () => apiInstance.get('/api/user/account'),
    },
    admin: {
        getNotConfirmedUsers: () => apiInstance.get('/api/admin/not-confirmed-accounts'),
        confirmUser: (username: string) => apiInstance.post(`/api/admin/confirm-account/${username}`),
        getUsers: () => apiInstance.get('/api/admin/all-accounts'),
        updatePassword: (password: string, password_repeat: string) => apiInstance.post('api/user/update-password', { password, password_repeat }),
        deleteUser: (username: string) => apiInstance.delete(`/api/admin/delete-account/${username}`),
        getUserByUsername: (username: string) => apiInstance.get(`/api/admin/account/${username}`),
        updateRoles: (username: string, roles: string[]) => apiInstance.put(`/api/admin/update-roles/${username}`, { roles }),
        getAllRoles: () => apiInstance.get('/api/admin/roles'),
        resetPassword: (username: string) => apiInstance.get(`/api/admin/reset-password/${username}`),
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
