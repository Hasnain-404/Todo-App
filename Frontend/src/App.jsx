import React from 'react'
import RegisterComponent from '../Components/RegisterComponent'
import TodoComponent from '../Components/TodoComponent'
import LoginComponent from '../Components/LoginComponent'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';

const App = () => {


  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://todo-app-ljwp.onrender.com";


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/todo' element={<TodoComponent />} />
      </Routes>
    </>
  )
}

export default App