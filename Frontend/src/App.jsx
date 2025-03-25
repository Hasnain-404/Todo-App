import React from 'react'
import RegisterComponent from '../Components/RegisterComponent'
import TodoComponent from '../Components/TodoComponent'
import LoginComponent from '../Components/LoginComponent'
import { Routes, Route, useNavigate } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<RegisterComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/todo' element={<TodoComponent />} />
      </Routes>
    </>
  )
}

export default App