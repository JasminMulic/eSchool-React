import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function AddStudent() {
  const [loading, setLoading] = useState(false)
  const [indexNum, setIndexNum] = useState("");
  const [debouncedIndexNum] = useDebounce(indexNum, 2000);
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState, setError, clearErrors } = form;
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
          toast.error("There was an error communicating with database.")
        }
      };
      checkIndex();

    } else {
      clearErrors("indexNumber");
    }
  }, [debouncedIndexNum]);

  const onSubmit = async (data) => {
    setLoading(true)
      try {
      const response = await axios.post(
        "https://localhost:44390/api/Students/Add",
        data
      );
      if (response.status === 200) {
        console.log(data)
        navigate({ pathname: "/Students" }, {state :{message: `Student ${data.firstname} ${data.lastname} added successfully.`}});
      }
    } catch (error) {
      toast.error("Error adding the student.", {hideProgressBar : true, autoClose : 2000})
    }
    finally{
      setLoading(false)
    }    
  };
  return (
    <div className="text-light d-flex justify-content-center w-100 container">
     {loading && <LoadingSpinner /> }

      <ToastContainer autoClose = {2000} newestOnTop = {true} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="form-group col col-sm col-md-5 col-lg-4 col-xxl-3"
      >
        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Firstname:</p>
          <input
            placeholder="Firstname:"
            name="firstname"
            type="text"
            className="form-control col-5"
            {...register("firstname", { required: "Firstname is required." })}
          />
          {errors.firstname && (
            <p className="text-danger text-start">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div style={{ minHeight: "100px" }}>
          <p className="text-start m-0">Lastname:</p>
          <input
            placeholder="Lastname:"
            name="lastname"
            type="text"
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
            placeholder="Index number:"
            name="indexNumber"
            type="text"
            className="form-control col-5"
            {...register("indexNumber", {
              required: "Index number is required.",
            })}
            onChange={(e) => setIndexNum(e.target.value)}
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
            defaultValue={new Date().toISOString().slice(0, 10)}
            type="date"
            className="form-control col-5"
            {...register("dateOfBirth", {
              validate: (fieldValue) => {
                return (
                  fieldValue < new Date().toISOString().slice(0, 10) ||
                  "Date must be older than the current date."
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

        <div style={{ minHeight: "90px" }}>
          <p className="text-start m-0">Faculty</p>

          <input
            placeholder="Faculty:"
            name="faculty"
            type="text"
            className="form-control col-5"
            {...register("faculty", { required: "Faculty is required." })}
          />
          {errors.faculty && (
            <p className="text-danger text-start">{errors.faculty.message}</p>
          )}
        </div>

        <div style={{ minHeight: "63px" }}>
          <input
            type="checkbox"
            name="active"
            className="form-check-input float-start mt-2"
            {...register("active")}
          />
          <span className="float-start ms-2 mt-1">Active</span>
          <input
            type="submit"
            className="btn btn-success form-control mt-1"
            value={"Submit"}
          />
        </div>
      </form>
    </div>
  );
}
