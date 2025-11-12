import axiosClient from "../../src/utils/axios/axiosClient.js";
import env from "#config/env/env.js";

const axiosInstance = axiosClient;

// перезаписываем baseURL и токен в каждом запросе
const wbApi = axiosInstance.interceptors.request.use((config: any) => {
    config.baseURL = "https://common-api.wildberries.ru/api/v1";
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${env.WB_API_KEY}`,
    };
    return config;
});

export default wbApi;
