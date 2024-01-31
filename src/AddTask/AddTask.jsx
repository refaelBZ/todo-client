import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import TasksContext from '../Context/Context';

export default function AddTask() {
    const { tasksList, setTasksList } = useContext(TasksContext);

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
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     axios.get("https://jbh-mockserver.onrender.com/categories/")
    //         .then(response => setTasksList(response.data))
    //         .catch(error => console.error(error));
    // }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Task name
                    <div>
                        <input type='text' name='taskName' />
                    </div>
                </label>
                <input type="date" name='taskDate' />
                <button type='submit'>Add new task</button>
            </form>
        </div>
    );
}
