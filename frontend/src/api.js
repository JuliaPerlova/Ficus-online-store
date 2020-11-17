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
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .patch("/auth/refresh", { token: refreshToken })
        .then((res) => {
          if (res.status === 200) {
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
    return err.response.data.description;
  }
};

export const emailConfirm = async (body) => {
  console.log(body);
  try {
    const serverResponse = await axios.patch("/auth/confirm", body);
    return serverResponse.data;
  } catch (err) {
    return err.response.data.description;
  }
};

export const resendCode = async (email) => {
  try {
    const response = await axios.post("/auth/confirm", { email: email });
    return response.data;
  } catch (err) {
    return console.err(err);
  }
};

export const signIn = async (body) => {
  try {
    const serverResponse = await axios.post("/auth/login", body);
    return serverResponse.data;
  } catch (err) {
    return err.response.data.description;
  }
};

export const logout = async () => {
  return axios.delete(`/auth/logout/${localStorage.getItem("refreshToken")}`);
};

export const createPost = async (body) => {
  console.log(body);
  try {
    console.log(body);
    const serverResponse = await axios.post(
      `/${localStorage.getItem("_id")}/posts`,
      body
    );
    return serverResponse.data;
  } catch (err) {
    return err.response;
  }
};

export const getPosts = async (page) => {
  if (page) {
    const posts = await axios.get(`/posts?page=${page}&limit=5`);
    return posts.data;
  }
  const posts = await axios.get("/posts?page=1&limit=5");
  return posts.data;
};

export const getPost = async (id) => {
  try {
    const post = await axios.get(`/posts/${id}`);
    return post.data;
  } catch (err) {
    console.error(err);
  }
};

export const getProfileInfo = async () => {
  try {
    const profileInfo = await axios.get(
      `/users/${localStorage.getItem("_id")}`
    );
    return profileInfo.data;
  } catch (err) {
    console.error(err);
  }
};

export const likesHandler = async (postId, action, userId) => {
  try {
    if (action === "like") {
      const response = await axios.post(`/likes/${postId}?content=Post`, {
        author: userId,
      });
      return response.data;
    } else {
      const response = await axios.delete(`/likes/${postId}?author=${userId}`);
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getLikes = async (postId) => {
  try {
    const likes = await axios.get(`/likes/${postId}`);
    return likes.data;
  } catch (err) {
    console.error(err);
  }
};

export const getComments = async (postId) => {
  try {
    const comments = await axios.get(`/comments?postId=${postId}`);
    return comments.data;
  } catch (err) {
    console.error(err);
  }
};

export const writeComment = async (postId, content, commentId) => {
  try {
    const userId = localStorage.getItem("_id");
    const response = await axios.post(`/comments?postId=${postId}`, {
      author: userId,
      commentId: commentId ? commentId : null,
      text: content,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const uploadAvatar = async (formData) => {
  try {
    const response = await axios.post(
      `/${localStorage.getItem("_id")}/upload_image`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
