// import axios from 'axios';
// import React, { useContext, useEffect } from 'react';
// import TasksContext from '../Context/Context';
// import styles from "./style.module.css";

// export default function AddTask() {
//     const { tasksList, setTasksList } = useContext(TasksContext);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);
//         const taskName = formData.get('taskName');
//         const taskDate = formData.get('taskDate');

//         const newTask = {
//             name: taskName,
//             date: new Date(taskDate),
//             status: 'active'
//         };

//         try {
//             const response = await axios.post("http://localhost:2004/task", newTask);
//             console.log(response.data);

//             // עדכון הרשימה של המשימות בממשק המשתמש
//             setTasksList([...tasksList, response.data]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     // useEffect(() => {
//     //     axios.get("https://jbh-mockserver.onrender.com/categories/")
//     //         .then(response => setTasksList(response.data))
//     //         .catch(error => console.error(error));
//     // }, []);

//     return (
//         <>
//             {showForm && ( // הצגת הטופס רק אם showForm אמת
//                 <div className={styles.formContainer}>
//                     <form onSubmit={handleSubmit}>
//                         <label className={styles.formLabel}>
//                             Task name
//                             <input className={styles.formInput} type='text' name='taskName' />
//                         </label>
//                         <input className={styles.formDate} type="date" name='taskDate' />
//                         <button className={styles.formButton} type='submit'>Add new task</button>
//                     </form>
//                 </div>
//             )}
//             <button className={styles.fab} onClick={() => setShowForm(!showForm)}>+</button> {/* כפתור להצגה והסתרת הטופס */}
//         </>
//     );
// }
import React, { useState, useContext } from 'react';
import axios from 'axios';
import TasksContext from '../Context/Context';
import styles from "./style.module.css";

export default function AddTask() {
    const { tasksList, setTasksList } = useContext(TasksContext);
    const [showForm, setShowForm] = useState(false); // מצב להצגת הטופס

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskName = formData.get('taskName');
        const taskDate = formData.get('taskDate');

        const newTask = {
            name: taskName,
            date: new Date(taskDate),
            status: 'active'
        };

        try {
            const response = await axios.post("http://localhost:2004/task", newTask);
            console.log(response.data);

            // עדכון הרשימה של המשימות בממשק המשתמש
            setTasksList([...tasksList, response.data]);
            setShowForm(false); // סגירת הטופס לאחר הוספה
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {showForm && ( // הצגת הטופס רק אם showForm אמת
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.formLabel}>
                            Task name
                            <input className={styles.formInput} type='text' name='taskName' />
                        </label>
                        <input className={styles.formDate} type="date" name='taskDate' />
                        <button className={styles.formButton} type='submit'>Add new task</button>
                    </form>
                </div>
            )}
            <button className={styles.fab} onClick={() => setShowForm(!showForm)}>+</button> {/* כפתור להצגה והסתרת הטופס */}
        </>
    );
}
