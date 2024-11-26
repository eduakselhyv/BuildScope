import React, { useEffect, useState } from 'react';
import "../assets/styles/taskspage.css";
import { Select, useId, Label, Dropdown, Option } from "@fluentui/react-components";
import axios from 'axios';

// Interface for comment
interface Comment {
  user: string;
  comment: string;
  date: string;
}

interface Task {
  _id: string;
  name: string;
  desc: string;
  img: string;
  status: string;
  assigned_to: Array<String>;
  created_at: Date;
  comments: Comment[];
  installer: String;
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Variable for storing tasks
  const [currentView, setCurrentView] = useState('');

  async function displayTasks(view: string) {
    setCurrentView(view);

    const response = await axios.get(`http://localhost:8000/tasks/get-tasks?view=${view}&user=${localStorage.getItem('user')}`)
    setTasks(response.data.message);
  }

  function changeStatus(value: string, id: string) {
    // Send value to server
  }

  // Initialize page
  useEffect(() => {
    displayTasks('your-tasks');
  }, []);
  
  return (
    <div className='tasksholder'>
      <nav className='tasknav'>
        <div className='task-option' onClick={() => displayTasks("your-tasks")}>Your tasks</div>
        <div className='task-option' onClick={() => displayTasks("unassigned-tasks")}>Unassigned tasks</div>
      </nav>

      <div className='task-content'>
        {
          tasks.map((task, index) => (
            <div className='task-item' key={index}>
              <img className='task-img' src={task.img.startsWith('http') ? task.img : `http://localhost:8000${task.img}`} alt={task.name} />

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
        
              <div className='task-comments'>
                Comments:
                {task.comments.map((comment, commentIndex) => (
                  <div className='comment-holder' key={commentIndex}>
                    <div className='comment-user'>{comment.user}</div>
                    <div className='comment'>{comment.comment}</div>
                    <div className='comment-date'>{comment.date}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default TasksPage;