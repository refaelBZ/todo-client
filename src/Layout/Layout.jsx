import React, { useState } from 'react';
import AddTask from '../AddTask/AddTask.jsx';
import TasksList from '../TasksList/TasksList.jsx';
import TasksContext from '../Context/Context.jsx';
import Sidebar from '../SIdebar/Sidebar.jsx';
import styles from "./style.module.css";




export default function Layout() {
  const [tasksList, setTasksList] = useState([]);

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

