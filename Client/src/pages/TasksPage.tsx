import React, { useEffect, useState } from "react";
import "../assets/styles/taskspage.css";
import {
  Select,
  useId,
  Label,
  Dropdown,
  Option,
  Field,
  Input,
  Button
} from "@fluentui/react-components";
import { makeStyles } from '@griffel/react';
import axios from 'axios';

const useStyles = makeStyles({
  title: {
    textAlign: 'left',
    fontSize: '20px',
    width: '100%'
  },
  taskComments: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignItems: 'left',
    backgroundColor: 'lightgray',
    padding: '5px',
  },
  commentHolder: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '5px',
    margin: '3px',
  },
  commentUser: {
    fontWeight: 'bold'
  },
  comment: {

  },
  commentDate: {
    fontSize: '13px',
  },
  input: {
    '& .fui-Input__input': {
      background: 'rgb(0, 0, 0, 0.1)',
      padding: '5px',
      height: '85%',
      marginTop: '3px',
      maxWidth: '200px'
    }
  },
  newComment: {
    width: '100%'
  },
  button: {
    borderRadius: '10px',
    background: 'rgb(0, 0, 0, 0.1)',
    marginTop: '3px',
    width: '100px'
  }
});

// Interface for comment
interface Comment {
  user: string;
  comment: string;
  date: string;
}

interface Task {
  _id: string; // Task id
  name: string; // Task name
  desc: string;
  img: string;
  status: string; // Status of task
  assigned_to: Array<String>;
  created_at: Date;
  comments: Comment[];
  installer: string; // Person who did the installation
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Variable for storing tasks
  const [currentView, setCurrentView] = useState(""); // Variable for storing tasks
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({}); // Variable for storing new comments
  const styles = useStyles();

  async function displayTasks(view: string) {
    setCurrentView(view);

    const response = await axios.get(`http://localhost:8000/tasks/get-tasks?view=${view}&user=${localStorage.getItem('user')}`)
    setTasks(response.data.message);
    
    
  }

  function changeStatus(value: string, id: string) {
    // Send value to server
  }

  function handleCommentChange(taskId: string, value: string) {
    setNewComment((prev) => ({ ...prev, [taskId]: value }));
  }

  // a function for submitting new comments
  function submitComment(taskId: string) {
    const commentText = newComment[taskId];

    if (commentText) {
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          const newComment: Comment = {
            user: localStorage.user, // currently just the user in localstorage so might need to change later not sure
            comment: commentText,
            date: new Date().toLocaleDateString(),
          };
          return { ...task, comments: [...task.comments, newComment] };
        }
        return task;
      });

      setTasks(updatedTasks);
      setNewComment((prev) => ({ ...prev, [taskId]: "" }));
    }
  }

  // Initialize page
  useEffect(() => {
    displayTasks("your-tasks");
  }, []);

  return (
    <div className='tasksholder'>
      <nav className='tasknav'>
        <div className='task-option' onClick={() => displayTasks("your-tasks")}>Your tasks</div>
        <div className='task-option' onClick={() => displayTasks("unassigned-tasks")}>Unassigned tasks</div>
      </nav>

      <div className='task-content'>
        {
          tasks.map((task) => (
            <div className='task-item'>
              <img className='task-img' src={task.img} alt={task.name}/>

              <div className='task-info'> 
                <div className='task-name'>{task.name}</div>
                <div className='installer-name'>Installer: {task.installer}</div>

                <div className='task-status'>
                  <Label htmlFor="status-select">Status: </Label>
                  <Dropdown id="status-select" onChange={(e) => changeStatus((e.target as HTMLSelectElement).value, task._id)} placeholder={task.status}>
                    <Option value="Waiting">Waiting</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Denied">Denied</Option>
                  </Dropdown>
                </div>
              </div>

            <div className={styles.taskComments}>
              <div className={styles.title}>Comments:</div>
              {task.comments.map((comment, index) => (
                <div className={styles.commentHolder} key={index}>
                  <div className={styles.commentUser}>{comment.user}</div>
                  <div className={styles.comment}>{comment.comment}</div>
                  <div className={styles.commentDate}>{comment.date}</div>
                </div>
              ))}
              <div className={styles.newComment}>
                <Field>
                  <Input
                    className={styles.input}
                    type="text"
                    maxLength={90}
                    placeholder="Add a comment"
                    value={newComment[task._id] || ""}
                    onChange={(e) => handleCommentChange(task._id, e.target.value)}
                  />
                </Field>
                  <div className={styles.button}>
                    <Button onClick={() => submitComment(task._id)}>Submit</Button>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksPage;