/*
The methods exposed in this service should only ever be used by other services. Normal components and pages should not
be importing these methods.
*/

import axios from 'axios';

export const getReq = async (url) => {
  try {
    const res = await axios.get(url);
    res['success'] = true;

    return res
  } catch (err) {
    console.log(err);
    return {success: false}
  }
}

export const postReq = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    res['success'] = true;

    return res
  } catch (err) {
    console.log(err);
    return {success: false}
  }
}
