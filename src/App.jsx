import React, { useState } from 'react';
import './App.css';
import AddTask from './AddTask/AddTask.jsx';
import TasksList from './TasksList/TasksList.jsx';
import TasksContext from './Context/Context.jsx';

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

function App() {
  const [tasksList, setTasksList] = useState(tasks);

  return (
    <TasksContext.Provider value={{ tasksList, setTasksList }}>
      <>
        <div>
          <AddTask />
          <TasksList />
        </div>
      </>
    </TasksContext.Provider>
  );
}

export default App;
