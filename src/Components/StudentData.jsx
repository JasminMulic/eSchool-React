import axios from "axios";
import { useState } from "react";
import {
  CheckCircleFill,
  PencilSquare,
  Trash2Fill,
  XCircleFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function StudentData({ data, onDelete }) {
  const navigate = useNavigate();
  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:44390/api/Students/Delete/${id}`
      );
      if (response.status == 200) {
        onDelete(id);
        toast.error("Student deleted successfully.",{hideProgressBar : true, autoClose : 2000})

      } else {
      }
    } catch (error) {
      toast.error("Error deleting student")
    }
  };
  const navigateToUpdate = (id) => {
    navigate({pathname : `/Students/UpdateStudent/${id}`});
  };
  const showPrompt = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
    }
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.firstname}</td>
      <td>{data.lastname}</td>
      <td>{data.indexNumber}</td>
      <td>{data.dateOfBirth}</td>
      <td>{data.faculty}</td>
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
