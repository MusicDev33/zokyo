import { MDAPI_URL } from 'config';
import { getReq, postReq } from "./request.service";

export const createAccount = async (username, password) => {
  const url = `${MDAPI_URL}/zokyo/login/create`;

  const data = {
    authPass: '',
    username,
    password
  }

  const res = await postReq(url, data);
  console.log(res.data);
}

export const logIn = async (username, password) => {
  const url = `${MDAPI_URL}/zokyo/auth`;

  const data = {
    username,
    password
  }

  const res = await postReq(url, data);
  return res.data;
}

export const verifyUsername = async (username) => {
  if (username.length == 0) {
    return {success: false};
  }

  const url = `${MDAPI_URL}/zokyo/verify/${username}`;

  const res = await getReq(url);
  return res.data;
}
