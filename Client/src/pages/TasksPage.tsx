import React, { useEffect, useState } from 'react';
import "../assets/styles/taskspage.css";

interface Task {
  id: string; // Task id
  installer: string; // Person who did the installation
  media: string; // Media linked to task
  status: string; // Status of task
}


function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Variable for storing tasks
  const [taskView, setTaskView] = useState(''); // Variable for saving the status of current view

  useEffect(() => {
    
  }, []);

  function changeData(view: string) {
    setTaskView(view);
  }
  
  return (
    <div className='tasksholder'>
      <nav className='tasknav'>
        <div className='task-option' onClick={() => changeData("your-tasks")}>Your tasks</div>
        <div className='task-option' onClick={() => changeData("unassigned-tasks")}>Unassigned tasks</div>
      </nav>

      <div className='task-content'>
        <div className='task-item'>
          <img className='task-img'/>
          <div className='task-name'>Placeholder name</div>
          <select className='task-status'>
            <option></option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;