import React, { useEffect, useState } from 'react';
import "../assets/styles/taskspage.css";
import { Select, useId, Label, Dropdown, Option } from "@fluentui/react-components";

interface Task {
  id: string; // Task id
  name: string; // Task name
  installer: string; // Person who did the installation
  media: string; // Media linked to task
  status: string; // Status of task
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Variable for storing tasks
  const [currentView, setCurrentView] = useState(''); // Variable for storing tasks

  function displayTasks(view: string) {
    setCurrentView(view);

    // Function for getting tasks. Change when server implemented
    const fetchedTasks = 
    [ {id: "0", name: "Bolted panels", installer: "John Doe", media: "https://i.ytimg.com/vi/rvX8cS-v2XM/hq720.jpg", status: "Waiting"},
      {id: "1", name: "Metal plating", installer: "Jane Doe", media: "https://i.ytimg.com/vi/rvX8cS-v2XM/hq720.jpg", status: "Approved"},
    ];

    setTasks(fetchedTasks);
  }

  function changeStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const newStatus = event.target.value;
    console.log(newStatus)
    // Send newStatus to server
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
                  <Dropdown id="status-select" onChange={() => changeStatus} placeholder={task.status}>
                    <Option value="Waiting">Waiting</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Denied">Denied</Option>
                  </Dropdown>
                </div>
              </div>
        
              <div className='task-comments'>
                Comments:
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default TasksPage;