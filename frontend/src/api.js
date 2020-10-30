import defaultAxios from "axios";

const axios = defaultAxios.create({
  baseURL: "http://192.168.88.42:3000/",
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post("/auth/refresh_token", { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export const signUp = async (body) => {
  try {
    const serverResponse = await axios.post("/auth/sign_up", body);
    return serverResponse.data;
  } catch (err) {
    return err.response.data;
  }
};

export const emailConfirm = async (body) => {
  try {
    const serverResponse = await axios.post(
      `/auth/confirm/${localStorage.getItem("_id")}`,
      body
    );
    return serverResponse.data;
  } catch (err) {
    return err.response.data;
  }
};

export const signIn = async (body) => {
  try {
    const serverResponse = await axios.post("/auth/login", body);
    return serverResponse.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = () => {
  return axios.delete(`/logout/${localStorage.getItem("refreshToken")}`);
};
