import React, { useContext, useState } from 'react';
import styles from "./style.module.css";
import { FaEdit } from 'react-icons/fa';

import axios from 'axios';
import TasksContext from '../Context/Context';

export default function Task({ taskData }) {

  //עריכה
  const [isEditing, setIsEditing] = useState(false);


  const startEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    setIsSaving(true);
  };


  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (isEditing) {
      // מצב שמירה: שלח את השינויים לשרת
      axios.put('/http://localhost:2004/task/:taskid', task)
        .then((response) => {
          console.log(response.data);
          // עדכון המשימה בממשק המשתמש
          setTasksList(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsEditing(false); // יציאה ממצב עריכה
        });
    } else {
      // מצב עריכה: הפוך למצב עריכה
      setIsEditing(true);
    }
  };



  /////////////////////////////////////////////////////////



  const { tasksList, setTasksList } = useContext(TasksContext);

  const { name, status, id, date } = taskData;

  const [task, setTask] = useState(taskData);

  const handleCheck = () => {
    axios.put('/http://localhost:2004/task/:taskid', {
      id: id,
      status: "done"
    })
      .then((response) => {
        console.log(response.data);
        // עדכון המשימה בממשק המשתמש
        setTask({ ...task, status: "done" });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const handleDelete = () => {
    axios.delete(`http://localhost:2004/task/:taskid`)
      .then((response) => {
        console.log(response.data);
        // עדכון הממשק המשתמש עם הרשימה העדכנית שהשרת מחזיר
        setTasksList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }




  return (
<div className={styles.task}>
  <div className={styles.leftSide}>
    <input onChange={handleCheck} type="checkbox" />
    {
      isEditing ? (
        <input type="text" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} />
      ) : (
        <span>{name}</span>
      )
    }
  </div>
  <div className={styles.rightSide}>
    <button className={styles.buttonTask} onClick={handleDelete}>Delete</button>
    {
      isEditing ? (
        <>
          <button className={styles.buttonTask} onClick={handleEdit}>Save</button>
          <button className={styles.buttonTask} onClick={cancelEditing}>Cancel</button>
        </>
      ) : (
        <button className={styles.buttonTask} onClick={handleEdit}> <FaEdit /> </button>
      )
    }
  </div>
</div>



  );
}

