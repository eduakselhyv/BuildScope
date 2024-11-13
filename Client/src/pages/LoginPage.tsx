import { useState } from 'react';
import '../assets/styles/login.css';
import { useNavigate } from 'react-router-dom';
import { Button, Field, Input } from '@fluentui/react-components';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (newValue: any) => {
    setUsername(newValue);
  };
  
  const handlePasswordChange = (newValue: any) => {
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

        <Field>
            <Input type='text' onChange={handleUsernameChange} placeholder='Username' />
        </Field>

        <Field>
            <Input type='password' onChange={handlePasswordChange} placeholder='Password' />
        </Field>

        <Button onClick={logIn}>Log in</Button>
      </div>  
    </div>
  );
}

export default LoginPage;