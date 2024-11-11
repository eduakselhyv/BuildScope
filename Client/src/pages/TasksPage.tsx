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
  
  // Change data of table to reflect the selected view
  function changeData(type: string) {
    if (type === 'your-tasks') {
      setTasks( // Update later to get data from server
        [
          { id: '0', installer: 'username1', media: 'media1', status: 'Pending' },
          { id: '1', installer: 'username2', media: 'media2', status: 'Accepted' },
        ]
      );

    } else if (type === 'unassigned-tasks') {
      setTasks( // Update later to get data from server
        [
          { id: '2', installer: 'unassigned', media: 'media3', status: 'New' },
          { id: '3', installer: 'unassigned', media: 'media4', status: 'New' },
        ]
      );
    }

    // Set task view variable to the selected view
    setTaskView(type);
  }

  // Open the media linked to the task
  function openMedia(mediaid: string) {
    // Function to open media based on the id given
  }

  // Change the status of the selected task
  function changeStatus(taskId: string, currentStatus: string) {
    const newStatus = prompt("Update status:", currentStatus);
    if (newStatus) {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));

      // Update status to server
    }
  }

  // Prompt verification to accept unassigned task
  function unassignedTaskClick(task: Task) {
    if (taskView === 'unassigned-tasks') {
      const accept = window.confirm("Do you want to accept this task?");
      if (accept) {
        alert(`Task with ID ${task.id} has been accepted.`);

        // Send update to server
      }
    }
  }

  useEffect(()=> {
    changeData('your-tasks');
  }, []);
  
  return (
    <div className='tasksholder'>
      <nav className='tasknav'>
        <div className='task-option' onClick={() => changeData("your-tasks")}>Your tasks</div>
        <div className='task-option' onClick={() => changeData("unassigned-tasks")}>Unassigned tasks</div>
      </nav>

      <div className='task-content'>
        <table className='task-table'>
          <thead>
            <tr>
              <th>Installer</th>
              <th>Media</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='tbody' id='tbody'>
            {tasks.length > 0 ? (
                tasks.map(task => (
                  <tr key={task.id} onClick={() => unassignedTaskClick(task)}>
                  <td>{task.installer}</td>
                  <td className='clickable-td' onClick={() => openMedia(task.media)}>{task.media}</td>
                  <td
                    className={taskView === 'unassigned-tasks' ? '' : 'clickable-td'}
                    onClick={taskView !== 'unassigned-tasks' ? () => changeStatus(task.id, task.status) : undefined}
                  >
                    {task.status}
                  </td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>No tasks available</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksPage;