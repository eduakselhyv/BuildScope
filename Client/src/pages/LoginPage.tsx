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
  const [pageState, setPageState] = useState("");
  const [error, setError] = useState("");
  const styles = useStyles();
  const navigate = useNavigate();

  // Log in with JWT
  async function logIn() {
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post('http://localhost:8000/users/login', 
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // Store JWT and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.username); // Changed to store just the username

      // Set up axios to include token in future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Redirect to home or dashboard
      navigate('/');

    } catch (error) {
      if ((error as any).response) {
        // The request was made and the server responded with a status code
        if ((error as any).response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError("An unexpected error occurred");
        }
      } else if ((error as any).request) {
        // The request was made but no response was received
        setError("No response from server. Please check your network connection.");
      } else {
        // Something happened in setting up the request
        setError("Error processing login request");
      }
      console.error("Login error:", error);
    }
  }

  // Register with JWT
  async function register() {
    setError(""); // Reset any previous errors

    // Basic validation
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/register', 
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // Store JWT and user info after successful registration
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.username); // Changed to store just the username

      // Set up axios to include token in future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Redirect to home or dashboard
      navigate('/');

    } catch (error) {
      if ((error as any).response) {
        // The request was made and the server responded with a status code
        if ((error as any).response.status === 401) {
          setError("Username already exists");
        } else {
          setError("An unexpected error occurred");
        }
      } else if ((error as any).request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError("Error processing registration request");
      }
      console.error("Registration error:", error);
    }
  }

  function changePage() {
    setPageState(pageState === "" ? "register" : "");
    setError(""); // Clear any previous errors
  }

  if (pageState === "") {
    return (
      <div className={styles.loginHolder}>
        <div className={styles.loginCard}>
          <div className={styles.title}>Buildscope</div>

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <Field>
            <Input 
              className={styles.inputCustom} 
              type='text' 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder='Username' 
            />
          </Field>

          <Field>
            <Input 
              className={styles.inputCustom} 
              type='password' 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='Password' 
            />
          </Field>
          <div className={styles.buttonHolder}>
            <Button onClick={logIn}>Log in</Button>
            <Button onClick={changePage}>Register</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.loginHolder}>
        <div className={styles.loginCard}>
          <div className={styles.title}>Buildscope</div>

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <Field>
            <Input 
              className={styles.inputCustom} 
              type='text' 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder='Username' 
            />
          </Field>

          <Field>
            <Input 
              className={styles.inputCustom} 
              type='password' 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='Password' 
            />
          </Field>
          <div className={styles.buttonHolder}>
            <Button onClick={register}>Register</Button>
            <Button onClick={changePage}>Back</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;