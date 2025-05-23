/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import { MDAPI_URL } from 'config';
import { getReq, postReq } from './request.service';

export const sendChat = async (msg, mode, convId, userId, engine) => {
  const url = `${MDAPI_URL}/zokyo/code`;

  const data = {
    msg,
    mode,
    user: userId,
    convId,
    engine
  }

  const res = await postReq(url, data);
  console.log(res);
  return res.data;
}

export const getChatsByConvId = async (convId) => {
  const url = `${MDAPI_URL}/zokyo/msgs/${convId}`;

  const res = await getReq(url);
  console.log(res.data);

  return res.data;
}

// Z Format = Zokyo format
const convertChatToZFormat = () => {

}
