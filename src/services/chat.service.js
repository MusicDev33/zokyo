/*
The Chat Service will manage everything chat-related. This includes the following:
  - Handling the input type from the server (stream or block)
  - ????
*/
import axios from 'axios';
import { API_KEY } from "config";

const reqConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const reqOpenAi = async (text) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  let messages = [
    {'role': 'user', 'content': 'You are a terse code completion machine. You will answer future questions with just code and nothing more.'},
    {'role': 'assistant', 'content': 'Okay, I will answer your future questions with just code snippets. Let\'s get started!'}
  ];

  messages.push({
    role: 'user',
    content: text
  });

  const data = {
    model: 'gpt-3.5-turbo',
    messages
  }

  try {
    const res = await axios.post(url, data, reqConfig);
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
