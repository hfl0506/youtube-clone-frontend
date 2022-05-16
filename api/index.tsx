import axios from "axios";
import { Video } from "../types";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;

const authBase = `${base}/api/auth`;

const videoBase = `${base}/api/videos`;

export async function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) {
  return await axios
    .post(userBase, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function login(payload: { email: string; password: string }) {
  const url = `${authBase}/login`;
  return axios
    .post(url, payload, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      return null;
    });
}

export function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: {
    onUploadProgress: (progressEvent: any) => void;
  };
}) {
  return axios
    .post(videoBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function editVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios
    .patch(`${videoBase}/${videoId}`, payload, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function getVideos() {
  return axios.get(videoBase).then((res) => res.data);
}
