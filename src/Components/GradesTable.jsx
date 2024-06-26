import GradesData from "../Components/GradesData"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../Components/LoadingSpinner'

export default function GradesTable() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const loadGrades = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44390/api/Grades"
        );
        if (response.status === 200) {
            setGrades(response.data);
        }
      } catch (error) {
        toast.error("Error loading grades:",{});
      }
      finally{
        setLoading(false)
      }
    };
    loadGrades();
}, []);
  const handleDelete = (id) => {
    setGrades((prevGrades) =>
      prevGrades.filter((grade) => grade.id !== id)
    );
  };

  return (
    <div className="container-fluid mt-5 pt-2">
      {loading && <LoadingSpinner />}
      <div
        className="table-wrapper"
        style={{ maxHeight: "500px", overflowY: "auto", position: "static" }}
      >
        <table
          className="table table-light"
          style={{
            maxWidth: "100%",}}
        >
          <thead>
            <tr>
              <th className="col-3">Student</th>
              <th className="col-3" >Subject</th>
              <th className="col-1">Grade</th>
              <th className="col-3">Note</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody className="table-wrapper" style={{position : "static"}}>
            {grades.map((grade) => (
              <GradesData
                key={grade.id}
                data={grade}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
