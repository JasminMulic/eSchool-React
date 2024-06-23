import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce";

export default function AddStudent() {
  const [indexNum, setIndexNum] = useState("");
  const [debouncedIndexNum] = useDebounce(indexNum, 1000);
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState, setError, clearErrors } = form;
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
  }, [debouncedIndexNum, setError, clearErrors]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://localhost:44390/api/Students/Add",
        data
      );
      if (response.status === 200) {
        console.log(response.data);
        navigate({ pathname: "/Students" });
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="text-light d-flex justify-content-center w-100 container">
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
        <DevTool control={control}></DevTool>
      </form>
    </div>
  );
}
