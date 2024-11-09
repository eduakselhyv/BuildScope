import { useState } from 'react';
import '../assets/styles/login.css';
import {Input} from '../components';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (newValue: string) => {
    setUsername(newValue);
  };
  
  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  // Change this logic once server is implemented
  function logIn() {
    localStorage.setItem('user', username);
    navigate('/');
  }

  return (
    <div className='login-holder'>
      <div className='login-card'>
        <div className='title'>Buildscope</div>
        <Input
          label='Username:'
          onChange={handleUsernameChange}
          placeholder='add username...'
        />

        <Input
          label='Password:'
          inputType='password'
          onChange={handlePasswordChange}
          placeholder='add password...'
        />

        <button onClick={logIn}>Log in</button>
      </div>  
    </div>
  );
}

export default LoginPage;