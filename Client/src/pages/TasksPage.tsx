import React, { useEffect, useState } from 'react';
import "../assets/styles/taskspage.css";
import { Select, useId, Label, Dropdown, Option } from "@fluentui/react-components";

// Interface for comment
interface Comment {
  user: string;
  comment: string;
  date: string;
}

interface Task {
  id: string; // Task id
  name: string; // Task name
  installer: string; // Person who did the installation
  media: string; // Media linked to task
  status: string; // Status of task
  comments: Comment[];
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Variable for storing tasks
  const [currentView, setCurrentView] = useState(''); // Variable for storing tasks

  function displayTasks(view: string) {
    setCurrentView(view);

    // Function for getting tasks. Change when server implemented
    const fetchedTasks = 
    [ {id: "0", name: "Bolted panels", installer: "John Doe", media: "https://i.ytimg.com/vi/rvX8cS-v2XM/hq720.jpg", status: "Waiting",
        comments: []},
      {id: "1", name: "Metal plating", installer: "Jane Doe", media: "https://i.ytimg.com/vi/rvX8cS-v2XM/hq720.jpg", status: "Approved", 
        comments: [{user: "user1", comment: "This is a comment", date: "14.10.2024"}, {user: "user2", comment: "This is another comment", date: "15.10.2024"}]},
    ];

    setTasks(fetchedTasks);
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
          tasks.map((task) => (
            <div className='task-item'>
              <img className='task-img' src={task.media}/>

              <div className='task-info'> 
                <div className='task-name'>{task.name}</div>
                <div className='installer-name'>Installer: {task.installer}</div>

                <div className='task-status'>
                  <Label htmlFor="status-select">Status: </Label>
                  <Dropdown id="status-select" onChange={(e) => changeStatus((e.target as HTMLSelectElement).value, task.id)} placeholder={task.status}>
                    <Option value="Waiting">Waiting</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Denied">Denied</Option>
                  </Dropdown>
                </div>
              </div>
        
              <div className='task-comments'>
                Comments:
                {task.comments.map((comment) => (
                  <div className='comment-holder'>
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