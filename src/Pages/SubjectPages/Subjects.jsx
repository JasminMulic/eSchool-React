import {NavLink, useLocation, useNavigate } from "react-router-dom";
import SubjectTable from '../../Components/SubjectTable'
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Students() {
  const location = useLocation()
  const navigate = useNavigate();
  console.log(location)
  if(location.state.message){
    toast({message : "ksdmnoikdjn"})
  }

  return (
    <div className="bg-dark text-light ">
      <button
        onClick={() => {
          navigate("/Students");
        }}
        className="btn btn-primary px-3 me-2"
      >
        Students
      </button>
      <NavLink to={"/Subjects"}
        className="btn btn-warning px-3 me-2"
      >
        Subjects
      </NavLink>
      <button onClick={() => navigate("/Grades")} className="btn px-4 text-light" style={{ background: "#102C57" }}>
        Grades
      </button>
      <div className="d-flex justify-content-end my-2"></div>
      <SubjectTable />
      <button onClick={() => navigate('/Subjects/AddSubject')} className='btn btn-success mt-2'>Add Subject</button>

    </div>
  );
}
