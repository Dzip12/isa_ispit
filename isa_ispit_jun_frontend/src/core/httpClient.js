import axios from "axios";

export const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});

Axios.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if ((status === 401 || status === 403) && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const response = await Axios.post("/auth/refresh", {refreshToken});

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("refreshToken", response.data.refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

                    return Axios(originalRequest);
                } catch {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                }
            }
        }

        return Promise.reject(error);
    }
);

export const get = async (url, params) => {
    return await Axios.get(url, {params});
}

export const post = async (url, params) => {
    return await Axios.post(url, params);
}

export const put = async (url, params) => {
    try {
        const response = await Axios.put(url, params);
        return response.data;
    } catch (error) {
        console.error("Axios PUT error:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        throw error;
    }
};

export const deleteItem = async (url) => {
    return await Axios.delete(url);
}
