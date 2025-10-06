import axios from "axios";

export const base_url = axios.create({
    baseURL: "http://localhost:2025/api/v1",
});

const api = {
    getAll: (url) => base_url.get(url),
    getOne: (url, id) => base_url.get(`${url}/${id}`),
    create: (url, data) => base_url.post(url, data),
    update: (url, id, data) => base_url.put(`${url}/${id}`, data),
    remove: (url, id) => base_url.delete(`${url}/${id}`),
};

export const vacancyApi = {
    getAll: () => api.getAll("/vacancy/all"),
    getOne: (id) => api.getOne("/vacancy", id),
};
