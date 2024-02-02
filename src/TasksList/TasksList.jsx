import React, { useContext, useEffect } from 'react'
import Task from '../Task/Task'
import { useState } from 'react';
import TasksContext from '../Context/Context';
import axios from 'axios';
import styles from "./style.module.css";






export default function TasksList() {
  
  
const { tasksList, setTasksList } = useContext(TasksContext);





// קבלת רשימת המשימות בטעינה הראשונית
useEffect(() => {
  axios.get("http://localhost:2004/task")
      .then(response => {
          console.log(response.data); // הוסף הדפסה לקונסול כאן
          setTasksList(response.data);
      })
      .catch(error => console.error(error));
}, []);



    return (
    <div className={styles.list}>
        {tasksList.map((task) => (
          <Task
            key={task.id}
            taskData={task}
          />
        ))}
    </div>
  )
}
