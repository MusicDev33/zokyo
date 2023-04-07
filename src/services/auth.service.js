import { MDAPI_URL } from 'config';
import { postReq } from "./request.service";

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

}
