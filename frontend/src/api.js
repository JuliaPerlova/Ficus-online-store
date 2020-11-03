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
        .post("/auth/refresh", { token: refreshToken })
        .then((res) => {
          if (res.status === 201) {
            console.log(res.data);
            localStorage.setItem("accessToken", res.data.accessToken);
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

export const logout = async () => {
  return axios.delete(`/logout/${localStorage.getItem("refreshToken")}`);
};

export const createPost = async (body) => {
  try {
    console.log(body);
    const serverResponse = await axios.post(
      `/main/${localStorage.getItem("_id")}/posts/new`,
      body
    );
    return serverResponse.data;
  } catch (err) {
    return err.response;
  }
};

export const getPosts = async (page) => {
  if (page) {
    const posts = await axios.get(`/main/posts?page=${page}&limit=5`);
    return posts.data;
  }
  const posts = await axios.get("/main/posts?page=1&limit=5");
  return posts.data;
};

export const getPost = async (id) => {
  try {
    const post = await axios.get(`/main/post/${id}`);
    return post.data;
  } catch (err) {
    console.error(err);
  }
};
