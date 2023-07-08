/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import { MDAPI_URL } from 'config';
import { getReq, deleteReq } from './request.service';

// Not even sure if I'll need this...I might just automatically create conversations when they need to be created.
export const createConv = async (username) => {
  
}

export const getConvs = async (userId) => {
  const url = `${MDAPI_URL}/zokyo/convs/${userId}`;

  return (await getReq(url)).data;
}

export const deleteConv = async (convId) => {
  const url = `${MDAPI_URL}/zokyo/convs/${convId}`;

  return (await deleteReq(url)).data;
}
