import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Field, Input } from '@fluentui/react-components';
import { makeStyles } from '@griffel/react';

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
      borderRadius: '10px',
      boxShadow: '-5px 5px 10px rgba(0, 0, 0, 0.2), 5px 5px 10px rgba(0, 0, 0, 0.2)',
      padding: '110px 20px 80px',
      width: '300px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      textAlign: 'center',
      fontSize: '30px',
      paddingBottom: '20px',
    },
    inputCustom: {
      '& .fui-Input__input': {
        background: 'rgb(0, 0, 0, 0.1)',
        paddingLeft: '10px'
      }
    },
    buttonHolder: {
      marginTop: '40px'
    }
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

  function register() {
    
    // Logic to register user

    /*
    if (response.IsSuccessStatusCode) {
      logIn();
    }
    */
  }

  return (
    <div className={styles.loginHolder}>
      <div className={styles.loginCard}>
        <div className={styles.title}>Buildscope</div>

        <Field>
            <Input className={styles.inputCustom} type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        </Field>

        <Field>
            <Input className={styles.inputCustom} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </Field>

        <div className={styles.buttonHolder}>
          <Button onClick={logIn}>Log in</Button>
          <Button onClick={register}>Register</Button>
        </div>
      </div>  
    </div>
  );
}

export default LoginPage;