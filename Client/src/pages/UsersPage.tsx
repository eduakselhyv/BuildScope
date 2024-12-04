import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@griffel/react';
import { Card, Text, Spinner } from '@fluentui/react-components';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const Users: User[] = data.users.map((user: any) => ({
          id: user.id,
          username: user.username,
        }));
        setUsers(Users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  if (loading) {
    return <Spinner className={classes.spinner} label="Loading users..." />;
  }

  return (
    <div className={classes.container}>
      <Text className={classes.title} block>
        User List
      </Text>
      {users.map((user) => (
        <Card key={user.id} className={classes.userCard}>
          <Text>{user.username}</Text>
          <Text>ID: {user.id}</Text>
        </Card>
      ))}
    </div>
  );
}

export default UsersPage;