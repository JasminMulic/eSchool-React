import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from "use-debounce";

import axios from "axios";
export default function UpdateStudent() {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    indexNumber: "",
    dateOfBirth: new Date().toISOString().slice(0, 10),
    faculty: "",
    active: true,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [indexNum, setIndexNum] = useState("");
  const [debouncedIndexNum] = useDebounce(indexNum, 1000);

  const params = useParams();
  const form = useForm();
  const { register, control, handleSubmit, formState, clearErrors, setError } = form;
  const { errors } = formState;

  useEffect(() => {
    if (debouncedIndexNum) {
      const checkIndex = async () => {
        try {
          const response = await axios.get(
            `https://localhost:44390/api/Students/IndexExists/${debouncedIndexNum}`
          );
          
          if (response.status === 200 && response.data == "exists") {
            setError("indexNumber", {
              type: "manual",
              message: "Index number exists."
            });
          } else if (response.status === 200 && response.data == "available") {
            clearErrors("indexNumber");
          }
        } catch (err) {
          console.error("Error checking index number:", err);
        }
      };
      checkIndex();
    } else {
      clearErrors("indexNumber");
    }
    console.log(errors)
  }, [debouncedIndexNum]);
  const onSubmitFunc = async (data) => {
    console.log(data)
    try {
      const response = await axios.put(
        `https://localhost:44390/api/Students/Update/${params.id}`,
        data
      );
      if (response.status == 200) navigate( {pathname : "/Students"}, {state : {message : "Student updated successfully."}});
    } catch (error) {
      toast.error("There was an error upddating a student.")
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44390/api/Students/${params.id}`
        );
        if (response.status == 200) setStudent(response.data);
        else setError("Student not found");
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [params.id]);
  if (loading) {
    return <p className="text-light display-4">Loading...</p>;
  }
  return (
    <div className="text-light d-flex justify-content-center w-100 container">
      <form
        onSubmit={handleSubmit(onSubmitFunc)}
        noValidate
        className="form-group col col-sm col-md-5 col-lg-4 col-xxl-3"
      >
        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Firstname:</p>
          <input
            placeholder="Firstname:"
            name="firstname"
            defaultValue={student.firstname}
            type="text"
            className="form-control col-5"
            {...register("firstname", { required: "Firstname is required." })}
          />
          {errors.firstname && (
            <p className="text-danger  text-start">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Lastname:</p>
          <input
            name="lastname"
            type="text"
            defaultValue={student.lastname}
            className="form-control col-5"
            {...register("lastname", { required: "Lastname is required." })}
          />
          {errors.lastname && (
            <p className="text-danger text-start">{errors.lastname.message}</p>
          )}
        </div>

        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Index number:</p>
          <input
            name="indexNumber"
            defaultValue={student.indexNumber}
            type="text"
            className="form-control col-5"
            {...register("indexNumber", {
              required: "Index number is required.",
            })}
            onChange={(e) => setIndexNum(e.target.value) }
          />
          {errors.indexNumber && (
            <p className="text-danger text-start">
              {errors.indexNumber.message}
            </p>
          )}
        </div>

        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Date of birth:</p>

          <input
            name="dateOfBirth"
            type="date"
            defaultValue={new Date(student.dateOfBirth)
              .toISOString()
              .slice(0, 10)}
            className="form-control col-5"
            {...register("dateOfBirth", {
              validate: (fieldValue) => {
                return (
                  fieldValue < new Date().toISOString() ||
                  "Date must be older current date."
                );
              },
            })}
          />
          {errors.dateOfBirth && (
            <p className="text-danger text-start">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div style={{ minHeight: "63px" }}>
          <input
            name="faculty"
            type="text"
            defaultValue={student.faculty}
            className="form-control col-5"
            {...register("faculty", { required: "Faculty is required." })}
          />
          {errors.faculty && (
            <p className="text-danger text-start">{errors.faculty.message}</p>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            name="active"
            defaultChecked={student.active}
            className="form-check-input float-start mt-2"
            {...register("active")}
          />
          <span className=" float-start ms-2 mt-1">
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
