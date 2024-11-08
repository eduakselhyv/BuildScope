import { useState } from 'react';
import '../assets/styles/login.css';
import {Input} from '../components';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (newValue: string) => {
    setUsername(newValue);
  };
  
  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  return (
    <div>
      <Input
        label='Username:'
        onChange={handleUsernameChange}
      />
      {username}
      <Input
        label='Password:'
        inputType='password'
        onChange={handlePasswordChange}
      />
    </div>
  );
}

export default LoginPage;