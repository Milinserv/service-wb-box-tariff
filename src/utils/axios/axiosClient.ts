import axios from "axios";
import env from "#config/env/env.js";

export const wbApi = axios.create({
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.WB_API_KEY}`,
    },
});

export default wbApi;
