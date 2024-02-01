import React, { useState } from 'react';
import AddTask from '../AddTask/AddTask.jsx';
import TasksList from '../TasksList/TasksList.jsx';
import TasksContext from '../Context/Context.jsx';
import Sidebar from '../SIdebar/Sidebar.jsx';
import styles from "./style.module.css";


const tasks=[
    {
        name: "TODO NOW",
        date: new Date,
        id: "1237774",
        status: "active"
    },
  
    {
        name: "Test",
        date: new Date,
        id: "1234",
        status: "active"
    },
    {
        name: "TODO",
        date: new Date,
        id: "12",
        status: "active"
    }
  ]

export default function Layout() {
  const [tasksList, setTasksList] = useState(tasks);

  return (
    <TasksContext.Provider value={{ tasksList, setTasksList }}>
      <>
        <div className={styles.layout}>
            <Sidebar/>
          <div className={styles.list}><TasksList /></div>
          <AddTask />

        </div>
      </>
    </TasksContext.Provider>
  );
}

