import { useNavigate } from "react-router-dom";
import StudentTable from "../../Components/StudentTable";
export default function Students() {
  const navigate = useNavigate();

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
