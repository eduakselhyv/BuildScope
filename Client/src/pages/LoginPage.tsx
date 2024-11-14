import { useState } from 'react';
import '../assets/styles/login.css';
import { useNavigate } from 'react-router-dom';
import { Button, Field, Input } from '@fluentui/react-components';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
    loginHolder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'lightgray',
    },
    loginCard: {
        backgroundColor: 'white',
        width: '200px',
        padding: '110px 20px 85px',
        borderRadius: '10px',
        boxShadow: '-5px 5px 10px rgba(0, 0, 0, 0.2), 5px 5px 10px rgba(0, 0, 0, 0.2)',
        ...shorthands.padding('110px', '20px', '85px'),
    },
    title: {
        textAlign: 'center',
        fontSize: '30px',
        paddingBottom: '20px',
    },
});

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const styles = useStyles();

  // Change this logic once server is implemented
  function logIn() {
    localStorage.setItem('user', username);
    navigate('/');
  }

  return (
    <div className={styles.loginHolder}>
      <div className={styles.loginCard}>
        <div className={styles.title}>Buildscope</div>

        <Field>
            <Input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        </Field>

        <Field>
            <Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </Field>

        <Button onClick={logIn}>Log in</Button>
      </div>  
    </div>
  );
}

export default LoginPage;