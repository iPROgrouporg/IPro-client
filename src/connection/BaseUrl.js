    import axios from "axios";
    import {APP_API} from "./AppApi.js";

    export const base_url = axios.create({
        baseURL: "https://api.iprogroup.org/api/v1/",
    });

    base_url.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    export const img_url = "https://api.iprogroup.org/api/v1/files/image/";

    const api = {
        getAll: (url) => base_url.get(url),
        getOne: (url, id) => base_url.get(`${url}/${id}`),
        getType: (url, type) => base_url.get(`${url}?type=${type}`),
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
        getOne: (id) => api.getOne(`${APP_API.service}`, id),
    };

    export const portfolioApi = {
        getAll: () => api.getAll(`${APP_API.portfolio}/all`),
        getOne: (id) => api.getOne(`${APP_API.portfolio}`, id),
        getByType: (type) => api.getType(`${APP_API.portfolio}/by-type`, type),
        getByTypeRandom: () => api.getAll(`${APP_API.portfolio}/by-type-random`),
    };
    export const portfolioOtzivApi = {
        getOne: (id) => base_url.get(`${APP_API.portfolioOtziv}/${id}/otziv-get`)
    }
    export const authApi = {
        register: (data) => base_url.post(APP_API.register, data),
        verifyOtp: (data) => base_url.post(APP_API.verifyOtp, data),
        resendOtp: (phoneNumber) =>base_url.patch(`${APP_API.resetOtp}?phoneNumber=${phoneNumber}`),
        login: (data) => base_url.post(APP_API.login, data),
    }
    export const supportApi = {
        send: (data) => api.create(`${APP_API.support}/send`, data),
    }

    export const userApi = {
        getMe: () => base_url.get(APP_API.me),
        update: (data) => base_url.put(APP_API.userUpdate, data),
        verifyUpdateOtp: (data) => base_url.post(APP_API.verifyUpdateOtp, data),
    }

export const orderApi = {
  getMyOrders: () => base_url.get(APP_API.getMyOrders),

  createOrder: (serviceId, data) =>base_url.post(`${APP_API.createOrder}/${serviceId}`, data),
};

