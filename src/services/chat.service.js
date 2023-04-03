/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import axios from 'axios';

import { MDAPI_URL } from 'config';
import { postReq } from './request.service';

const USERNAME = 'smccowan';

export const sendChat = async (msg, mode, convId) => {
  const url = `${MDAPI_URL}/zokyo/code`;

  const data = {
    msg,
    mode,
    user: USERNAME,
    convId
  }

  const res = await postReq(url, data);
  console.log(res);
  return res.data.newChat;
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
