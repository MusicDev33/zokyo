import { useState } from 'react';

import { verifyUsername } from 'services/auth.service';

import './AuthBox.scss';

/*
Vars
isLoggedIn: bool
user: Object
token: str (maybe this will be a part of the user object)
*/

export const AuthBox = ({handleLogin, user}) => {
  // Is the user on the whitelist and are they a new account?
  const [usernameVerified, setUsernameVerified] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onPassKeydown = (e) => {
    if (e.keyCode == 13) {
      handleLogin(username, password);
      setUsername('');
      setPassword('');
    }
  }

  const usernameFocusLoss = async () => {
    setUsernameVerified((await verifyUsername(username)).success)
  }

  let component = <div></div>;

  if (!user) {
    component = (
      <div className='authbox'>
        <input className='auth-input' placeholder='Username' value={username} onChange={handleUsernameChange} onBlur={() => {
          usernameFocusLoss();
        }} />

        <input className='auth-input' type={'password'} placeholder='Password' value={password} onChange={handlePasswordChange} onKeyDown={onPassKeydown} />
        <div className={`login-btn ${!username.length || !password.length ? 'disabled' : ''} mt-1`} onClick={async () => {
          await handleLogin(username, password, usernameVerified);
          setUsername('');
          setPassword('');
        }}>
          {usernameVerified ? 'Sign me up' : 'Log me in'}
        </div>
      </div>
    )
  } else {
    component = (
      <div className='authbox logged-in'>
        User: {user.username}
      </div>  
    )
  }

  return (
    <div>{component}</div>
  );
}
