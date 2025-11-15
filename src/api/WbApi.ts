import env from "#config/env/env.js";
import axiosClient from "#utils/axios/axiosClient.js";

const axiosInstance = axiosClient;

axiosInstance.interceptors.request.use((config: any) => {
    config.baseURL = "https://common-api.wildberries.ru/api/v1";
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${env.WB_API_KEY}`,
    };
    return config;
});

export default axiosInstance;
