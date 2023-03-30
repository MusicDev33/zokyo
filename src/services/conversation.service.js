/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import axios from 'axios';
import { MDAPI_URL } from 'config';


// Not even sure if I'll need this...I might just automatically create conversations when they need to be created.
const createConv = async (username) => {
  const url = `${MDAPI_URL}/zokyo/conv`;

  try {
    const res = await axios.post(url, data);
    res['success'] = true;

    return res
  } catch (err) {
    console.log(err);
    return {success: false}
  }
}

const getConvs = async (userId) => {
  const url = `${MDAPI_URL}/zokyo/convs/${userId}`;

  try {
    const res = await axios.get(url);
    res['success'] = true;

    return res
  } catch (err) {
    console.log(err);
    return {success: false}
  }
}
