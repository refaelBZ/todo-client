import React, { useContext, useState, useEffect } from 'react';
import styles from "./style.module.css";
import { FaEdit, FaTrash } from 'react-icons/fa';

import axios from 'axios';
import TasksContext from '../Context/Context';

export default function Task({ taskData }) {

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

  //EDIT
  const handleEdit = () => {
    if (isEditing) {
      // מצב שמירה: שלח את השינויים לשרת
      axios.put('http://localhost:2004/task/:taskid', task)
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



  const calculateTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeLeft = due - now;
  
    if (timeLeft < 0) {
      return "Time's up!";
    }
  
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${days} days, ${hours} hours, ${minutes} minutes left`;
  };
  

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(taskData.date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(taskData.date));
    }, 60000); // עדכון כל דקה
  
    return () => clearInterval(interval);
  }, [taskData.date]);








  //TASK IS DONE
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

//DELET
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
    <label className={styles.customCheckbox}>
      <input onChange={handleCheck} type="checkbox" hidden />
      <span className={styles.checkmark}></span>
    </label>
    <div className={styles.textAndTimer}> {/* קונטיינר חדש לטקסט ולטיימר */}
      {
        isEditing ? (
          <input type="text" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} />
        ) : (
          <>
            <div>{name}</div> {/* שם המשימה */}
            <div className={styles.timer}>{timeLeft}</div> {/* הטיימר מתחת לשם */}
          </>
        )
      }
    </div>
  </div>
  <div className={styles.rightSide}>
        <button className={styles.buttonTask} onClick={handleDelete}><FaTrash /></button>
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

