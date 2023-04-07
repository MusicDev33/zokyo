import { useState } from 'react';

import './AuthBox.scss';

/*
Vars
isLoggedIn: bool
user: Object
token: str (maybe this will be a part of the user object)
*/

export const AuthBox = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className='authbox'>
      <input className='auth-input' placeholder='Username' />
      <input className='auth-input' type={'password'} placeholder='Password' />
    </div>
  );
}
