import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function UpdateSUbject() {
  const [subject, setSubject] = useState({
    name: "",
    code: "",
    active: true,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmitFunc = async (data) => {
    try {
      const response = await axios.put(
        `https://localhost:44390/api/Subjects/Update/${params.id}`,
        data
      );
      if (response.status == 200) navigate("/Subjects", {state : {message : `Subject updated successfully.`}});
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44390/api/Subjects/${params.id}`
        );
        if (response.status == 200) setSubject(response.data);
        else setError("Student not found");
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [params.id]);
  if (loading) {
    return <p className="text-light display-4">Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="text-danger">{error}</p>
        <button className="btn btn-warning" onClick={() => navigate("/")}>
          Go back to home
        </button>
      </div>
    );
  }
  return (
    <div className="text-light d-flex justify-content-center w-100 container">
      <form
        onSubmit={handleSubmit(onSubmitFunc)}
        noValidate
        className="form-group col col-sm col-md-5 col-lg-4 col-xxl-3"
      >
        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Name:</p>
          <input
            placeholder="Name:"
            name="name"
            defaultValue={subject.name}
            type="text"
            className="form-control col-5"
            {...register("name", { required: "Subject name is requird." })}
          />
          {errors.name && (
            <p className="text-danger  text-start">
              {errors.name.message}
            </p>
          )}
        </div>

        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Code:</p>
          <input
            name="code"
            type="text"
            defaultValue={subject.code}
            className="form-control col-5"
            {...register("code", { required: "Code is required." })}
          />
          {errors.code && (
            <p className="text-danger text-start">{errors.code.message}</p>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            name="active"
            defaultChecked={subject.active}
            className="form-check-input float-start mt-2"
          />
          <span className=" float-start ms-2 mt-1" {...register("active")}>
            Active
          </span>
          <input
            type="submit"
            className="btn btn-success form-control mt-1"
            value={"Submit"}
          />
        </div>
        <DevTool control={control}></DevTool>
      </form>
    </div>
  );
}
