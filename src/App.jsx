import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import Table from './Components/StudentTable'
import 'react-toastify/dist/ReactToastify.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const navigate = useNavigate()
  useEffect(() =>{
    navigate("/Students")
  },[navigate])
    return (
      <div className='bg-dark text-light'>
        <button className='btn btn-warning px-3 me-2'>Subjects</button>
        <button className='btn px-4 text-light' style={{background: "#102C57"}}>Grades</button>

        <div className='d-flex justify-content-end my-2'>
        </div>
       <Table />
  </div>
  )
}

export default App
