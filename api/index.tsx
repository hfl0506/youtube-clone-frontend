import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;

const authBase = `${base}/api/auth`;

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

export async function login(payload: { email: string; password: string }) {
  const url = `${authBase}/login`;
  return await axios
    .post(url, payload, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      return null;
    });
}
