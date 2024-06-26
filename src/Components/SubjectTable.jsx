import SubjectData from "./SubjectData";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

export default function SubjectTable() {
  const  [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState([]);
  const [searchData, setSearchData] = useState({
    Name: "",
    Code: "",
    Active: null,
  });
  useEffect(() => {
    const loadSubjects = async () => {
      if(loading)
      try {
        const response = await axios.get(
          "https://localhost:44390/api/Subjects"
        );
        if (response.status === 200) {
          setSubjects(response.data);
        }
      } catch (error) {
        toast.error("Error communicating with database", {autoClose : 2500, hideProgressBar : true});
      }
      finally{
        setLoading(false)
      }
    };
    loadSubjects();
  }, []);
  const fetchFilterSubjects = async (
    url = "https://localhost:44390/api/Subjects/Search"
  ) => {
    setLoading(true)
    if (searchData.Name) {
      if (url.includes("?")) url += `&Name=${searchData.Name}`;
      else url += `?Name=${searchData.Name}`;
    }
    if (searchData.Code) {
      if (url.includes("?")) url += `&Code=${searchData.Code}`;
      else url += `?Code=${searchData.Code}`;
    }
    if (searchData.Active) {
      if (url.includes("?")) url += `&Active=${searchData.Active}`;
      else url += `?Active=${searchData.Active}`;
    }
    try {
      const response = await axios.get(url);
      if (response.status == 200){
         setSubjects(response.data);
         console.log(url)
      }
    } catch (error) {
      alert(error.message);
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
    setSubjects((prevSubjects) =>
      prevSubjects.filter((student) => student.id !== id)
    
    );
    toast.error("Subject deleted successfully.", {autoClose : 2000, hideProgressBar : true})
  };

  return (
    <div className="container-fluid">
      {loading && <LoadingSpinner className={""} />}
      <div className="d-md-flex justify-content-between align-items-center py-1">
      <div className="mb-2 mb-md-0 col-md-3">
          <input
            type="text"
            name="Name"
            className="form-control"
            placeholder="Name:"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2 mb-md-0 col-md-3">
          <input
            type="text"
            name="Code"
            className="form-control"
            placeholder="Code:"
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
            onClick={() => fetchFilterSubjects()}
            className="col btn btn-primary float-end"
          >
            Search
          </button>
        </div>
      </div>

      <div
        className="table-wrapper"
        style={{ maxHeight: "500px", overflowY: "auto", position: "static" }}
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
              <th className="col-2">Id</th>
              <th className="col-4" >Name</th>
              <th className="col-2">Code</th>
              <th className="col-2">Active</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody className="table-wrapper" style={{position : "static"}}>
            {subjects.map((subject) => (
              <SubjectData
                key={subject.id}
                data={subject}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
