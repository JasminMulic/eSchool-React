import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export default function AddSubject() {
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://localhost:44390/api/Subjects/Add", data
      );
      if (response.status === 200) 
        navigate({pathname : "/Subjects"}, {state : {message : "Subject added successfully."}})
      
    } catch (error) {
      console.log(error.message);
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
          <p className="text-start m-0">Subject name:</p>
          <input
            placeholder="Name:"
            name="name"
            type="text"
            className="form-control col-5"
            {...register("name", { required: "Name is required." })}
          />
          {errors.name && (
            <p className="text-danger  text-start">
              {errors.name.message}
            </p>
          )}
        </div>

        <div style={{ minHeight: "90px" }}>
          <p className="text-start m-0">Code</p>
          <input
            placeholder="Code:"
            name="code"
            type="text"
            className="form-control col-5"
            {...register("code", {
              required: "Subject code is required.",
            })}
          />
          {errors.code && (
            <p className="text-danger text-start">
              {errors.code.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            name="active"
            className="form-check-input float-start mt-2"
            {...register("active")}
          />
          <span className=" float-start ms-2 mt-1">Active</span>
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
