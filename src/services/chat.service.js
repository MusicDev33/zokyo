/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import axios from 'axios';

const reqOpenAi = async (text) => {
  const url = 'https://reads.shelbymccowan.com/api/v2/zokyo/code';

  const data = {
    msg: text
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

export const sendChat = async (text) => {
  const res = await reqOpenAi(text);
  if (res.success !== true) {
    return res
  }

  const newMsg = res.data.choices[0].message;

  return newMsg;
}
