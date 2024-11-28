import React, { useEffect, useState } from 'react';
import { makeStyles } from '@griffel/react';
import { Card, Text, Spinner, CardFooter, Button } from '@fluentui/react-components';
import { PersonDeleteRegular } from "@fluentui/react-icons";
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  userCard: {
    width: '300px',
    marginBottom: '10px',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  spinner: {
    marginTop: '20px',
  },
});

interface User {
  id: string;
  username: string;
}

function UsersPage() {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function deleteUser(id:string) {
    const body = new URLSearchParams();
    body.append('id', id);

    console.log(id);

    try {
      await axios.post('http://localhost:8000/users/delete', body, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    } catch (error) {
      alert("An unexpected error has occurred");
    }

    setUsers([]);
    setLoading(true);

    fetch('http://localhost:8000/users/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        const Users: User[] = data.users.map((user: any) => ({
          id: user.id,
          username: user.username,
        }));
        setUsers(Users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetch('http://localhost:8000/users/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        const Users: User[] = data.users.map((user: any) => ({
          id: user.id,
          username: user.username,
        }));
        setUsers(Users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner className={classes.spinner} label="Loading users..." />;
  }

  return (
    <div className={classes.container}>
      <Text className={classes.title} block>
        User List
      </Text>
      {users
        .filter(user => user.username !== localStorage.getItem('user'))
        .map((user) => (
          <Card key={user.id} className={classes.userCard}>
            <Text>{user.username}</Text>
            <Text>ID: {user.id}</Text>
            <CardFooter>
              <Button icon={<PersonDeleteRegular fontSize={16} />} onClick={(e) => deleteUser(user.id)}>Remove</Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default UsersPage;