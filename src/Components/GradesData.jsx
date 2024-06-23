import axios from "axios";
import {
  PencilSquare,
  Trash2Fill
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
export default function GradesData({ data, onDelete }) {
  const navigate = useNavigate();
  const deleteGrade = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:44390/api/Grades/Delete/${id}`
      );
      if (response.status == 200) {
        alert("Grade deleted successfully.");
        onDelete(id); 
      } else {
        alert("Problem");
      }
    } catch (error) {
      alert.error("Error deleting grade:", error);
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/Grades/UpdateGrade/${id}`);
  };
  const showPrompt = async (id) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      await deleteGrade(id);
    }
  };

  return (
    <tr>
      <td className="col-3">{data.studentName}</td>
      <td className="col-3">{data.subjectName}</td>
      <td className="col-1">{data.grade}</td>
      <td className="col-3">{data.note}</td>

      
      <td className="col-2">
        <button
          onClick={() => showPrompt(data.id)}
          className="btn btn-danger me-1 mb-1"
        >
          <Trash2Fill></Trash2Fill>
        </button>
        <button
          className="btn btn-primary mb-1"
          onClick={() => navigateToUpdate(data.id)}
        >
          <PencilSquare></PencilSquare>
        </button>
      </td>
    </tr>
  );
}
