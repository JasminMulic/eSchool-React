import { useLocation, useNavigate } from "react-router-dom";
import StudentTable from "../../Components/StudentTable";
import 'react-toastify/dist/ReactToastify.css';
import {toast } from "react-toastify";
import { useEffect, useState } from "react";
export default function Students() {
  const[loading, setLoading] = useState(true)
  const navigate = useNavigate(); 
  const location = useLocation()
useEffect(() =>{
if(location.state?.message){
  toast.success(location.state.message, {autoClose : 1500})
  navigate(location.pathname, {replace : true, state : {}})
}
},[])
  
  console.log(location)
  return (
    <div className="bg-dark text-light ">
      <button
        onClick={() => {
          navigate("/");
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
      <StudentTable />
      <button onClick={() => navigate('/Students/AddStudent')} className='btn btn-success mt-2'>Add Student</button>
    </div>
  );
}
