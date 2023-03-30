/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import axios from 'axios';
import { MDAPI_URL } from 'config';

const USERNAME = 'testuser1';

const reqOpenAi = async (msg, mode) => {
  const url = `${MDAPI_URL}/zokyo/code`;

  const data = {
    msg,
    mode,
    user: USERNAME
  }

  try {
    const res = await axios.post(url, data);
    res['success'] = true;

    return res
  } catch (err) {
    console.log(err);
    return {success: false}
  }
}

export const sendChat = async (text, mode) => {
  const res = await reqOpenAi(text, mode);
  if (res.success !== true) {
    return res
  }

  const newMsg = res.data.choices[0].message;

  return newMsg;
}

export const sendChats = async (chats, mode) => {
  const url = `${MDAPI_URL}/zokyo/code`;

  const data = {
    chats,
    mode
  }

  try {
    const res = await axios.post(url, data);
    res['success'] = true;

    return res.data.choices[0].message;
  } catch (err) {
    console.log(err);
    return {success: false}
  }
}
