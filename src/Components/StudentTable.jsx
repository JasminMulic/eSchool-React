import StudentData from "./StudentData";
import { useState, useEffect } from "react";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "./LoadingSpinner";
export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState({
    FirstName: "",
    IndexNumber: "",
    Active: null,
  });
  useEffect(() => {
    setLoading(true)
    const loadStudents = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44390/api/Students"
        );
        if (response.status === 200) {
          setStudents(response.data);
        }
      } catch (error) {
        toast("There was an error fetching students.",{hideProgressBar : true, autoClose : 2000})
      }
      finally{
        setLoading(false)
      }
    };
    loadStudents();
  }, []);
  const fetchFilterStudents = async (
    url = "https://localhost:44390/api/Students/Search"
  ) => {
    setLoading(true)
    if (searchData.FirstName) {
      if (url.includes("?")) url += `&Firstname=${searchData.FirstName}`;
      else url += `?Firstname=${searchData.FirstName}`;
    }
    if (searchData.IndexNumber) {
      if (url.includes("?")) url += `&IndexNumber=${searchData.IndexNumber}`;
      else url += `?IndexNumber=${searchData.IndexNumber}`;
    }
    if (searchData.Active) {
      if (url.includes("?")) url += `&Active=${searchData.Active}`;
      else url += `?Active=${searchData.Active}`;
    }

    try {
      const response = await axios.get(url);
      if (response.status == 200) setStudents(response.data);
    } catch (error) {
      toast.error("There was an error filtering students.",{autoClose : 2000, hideProgressBar : true})
    }
    finally{
      setLoading(false)
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value });
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSearchData({
      ...searchData,
      [name]: checked === true ? "true" : checked === false ? "false" : null,
    });
  };
  const handleDelete = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <div className="container-fluid">
      {loading && <LoadingSpinner />}
      <div className="d-md-flex justify-content-between align-items-center py-1">
      <div className="mb-2 mb-md-0 col-md-3">
          <input
            type="text"
            name="FirstName"
            className="form-control"
            placeholder="Firstname:"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2 mb-md-0 col-md-3">
          <input
            type="text"
            name="IndexNumber"
            className="form-control"
            placeholder="Index number:"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2 mb-md-0">
          <div className="form-check mt-2 d-flex align-items-center gap-2 col justify-content-center">
            <input
              name="Active"
              defaultChecked={true}
              className="form-check-input"
              type="checkbox"
              id="Active"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="Active">
              Active
            </label>
          </div>
        </div>
        <div className="d-flex align-items-end">
          <button
            type="button"
            onClick={() => fetchFilterStudents()}
            className="col btn btn-primary float-end"
          >
            Search
          </button>
        </div>
      </div>

      <div
        className="table-wrapper"
        style={{ height: "500px", overflowY: "auto", position: "static" }}
      >
        <table
          className="table table-light "
          style={{
            maxWidth: "100%",
            overflowX: "auto",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Index Number</th>
              <th>Birthdate</th>
              <th>Faculty</th>
              <th>Active</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentData
                key={student.id}
                data={student}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer transition={Flip} />

    </div>
  );
}
