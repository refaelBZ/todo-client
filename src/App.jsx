import React, { useState } from 'react';
import './App.css';
import AddTask from './AddTask/AddTask.jsx';
import TasksList from './TasksList/TasksList.jsx';
import Layout from './Layout/Layout.jsx';



function App() {

  return (
      <>
        <div>
          <Layout/>
        </div>
      </>
  );
}

export default App;
