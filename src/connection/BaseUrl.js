import axios from "axios";
import {APP_API} from "./AppApi.js";

export const base_url = axios.create({
    baseURL: "http://localhost:2025/api/v1",
});
export const img_url = "http://localhost:2025/api/v1/files/image/"

const api = {
    getAll: (url) => base_url.get(url),
    getOne: (url, id) => base_url.get(`${url}/${id}`),
    create: (url, data) => base_url.post(url, data),
    update: (url, id, data) => base_url.put(`${url}/${id}`, data),
    remove: (url, id) => base_url.delete(`${url}/${id}`),
};

export const vacancyApi = {
    getAll: () => api.getAll(`${APP_API.vacancy}/all`),
    getOne: (id) => api.getOne(`${APP_API.vacancy}`, id),
};
export const servicesApi = {
    getAll: () => api.getAll(`${APP_API.service}/all`),
    getOne: (id) => api.getOne(`${APP_API.service}`, id)
}