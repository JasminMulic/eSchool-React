import axios from "axios";
import {
  PencilSquare,
  Trash2Fill,
  CheckCircleFill,
  XCircleFill
} from "react-bootstrap-icons";
import { Zoom, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function SubjectData({ data, onDelete }) {
  const navigate = useNavigate();
  const deleteSubject = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:44390/api/Subjects/Delete/${id}`
      );
      if (response.status == 200) {
        onDelete(id)
      } 
    } catch (error) {
      toast.error(error.response.data,{hideProgressBar : true, autoClose : 2000})
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/Subjects/UpdateSubject/${id}`);
  };
  const showPrompt = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      await deleteSubject(id);
    }
  };

  return (
    <tr>
      <td className="col-2">{data.id}</td>
      <td className="col-4">{data.name}</td>
      <td className="col-2">{data.code}</td>
      <td style={{ height: "auto" }}>
        {data.active ? (
          <CheckCircleFill color="#14A44D" size={30} />
        ) : (
          <XCircleFill color="#DC4C64" size={30} />
        )}
      </td>
      
      <td>
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
