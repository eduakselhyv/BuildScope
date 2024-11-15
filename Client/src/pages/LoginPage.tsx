import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Field, Input } from '@fluentui/react-components';
import { makeStyles } from '@griffel/react';
import axios from 'axios';

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

  // Log in
  function logIn() {
    // Create body
    const body = {
      username: username,
      password: password
    };
  
    // Send login request to server
    axios.post('http://localhost:8000/users/login', body, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        if (response.status == 200) { // If status code 200
          localStorage.setItem('user', username); // Save username to localstorage
          setTimeout(() => { // Wait for a while before redirecting
            navigate('/');
          }, 100);
        }
      }).catch(e => { // If status code is not 200
        alert("Incorrect username or password!");
      });
  }

  // Register
  function register() {
    // Create body
    const body = {
      username: username,
      password: password
    };

    // Send register request
    axios.post('http://localhost:8000/users/register', body, {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      if (response.status == 200) { // If status code 200
        alert("Successfully created account!");
      }
    })
    .catch(error => { // If status code is not 200
      alert("User already exists!");
    });
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