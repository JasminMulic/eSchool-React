import {useLocation, useNavigate } from "react-router-dom";
import GradesTable from "../../Components/GradesTable";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
export default function Grades() {
  const navigate = useNavigate();
  const location = useLocation()
    useEffect(() =>{
      if(location.state?.message){
        toast.info(location.state.message, {autoClose : 3000, hideProgressBar : true})
        navigate(location.pathname, {replace : true, state : {}})
      }
    },[])
  return (
    <div className="bg-dark text-light ">
      <ToastContainer />
      <button
        onClick={() => {
          navigate("/Students");
        }}
        className="btn btn-primary px-3 me-2"
      >
        Students
      </button>
      <button
        onClick={() => {
          navigate("/Subjects");
        }}
        className="btn btn-warning px-3 me-2"
      >
        Subjects
      </button>
      <button onClick={() => navigate("/Grades")} className="btn px-4 text-light" style={{ background: "#102C57" }}>
        Grades
      </button>
      <div className="d-flex justify-content-end my-2"></div>
      <GradesTable />
      <button onClick={() => navigate('/Grades/AddGrade')} className='btn btn-success mt-2'>Add grade</button>

    </div>
  );
}
