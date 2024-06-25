import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
export default function AddGrade() {
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() =>{
        const loadData = async () =>{
            try{

                const requestStudents = await axios.get('https://localhost:44390/api/Students/')
                const requestSubjects = await axios.get('https://localhost:44390/api/Subjects/')
                if(requestStudents.status == 200 && requestSubjects.status == 200){
                    setStudents(requestStudents.data)
                    setSubjects(requestSubjects.data)
                }
            }
            catch(error){
              toast.error("There was an error communicating with server.", {hideProgressBar : true, autoClose : 3000})
            }
        }
        loadData()
        return () =>{
            console.log("cleanup")
        }
    },[])
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://localhost:44390/api/Grades/Add",
        data
      );
      if (response.status === 200) {
        navigate({ pathname: "/Grades" }, {state : {message : `Grade added successfully.`}});
      }
    } catch (error) {
      toast.error(error.response.data, {})
    } 
  };

  return (
    <div className="text-light d-flex justify-content-center w-100 container">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="form-group col col-sm col-md-5 col-lg-4 col-xxl-3"
      >
        <div style={{ minHeight: "100px" }}>
            <label htmlFor="studentId" className="text-start mb-1 w-100">Choose a student:</label>
        <select className="form-select" name="studentId" id="studentId" defaultValue={-1} defaultChecked={true} {...register("studentId",{validate : (fieldvalue) =>{
          return(fieldvalue != -1 ||"Please select a student.")
        }})
      }>          
            <option value={-1} >Select a student</option>
        {students.map((student) => <option key={student.id} value={student.id}>{student.firstname} {student.lastname}</option>)}
        </select>
      {errors.studentName && <p className="text-danger text-start">{errors.studentName?.message}</p>}
        </div>


        <div style={{ minHeight: "100px" }}>
            <label htmlFor="subjectId" className="text-start mb-1 w-100">Choose a student:</label>
        <select className="form-select" name="subjectId" id="subjectId" defaultValue={-1} defaultChecked={true} {...register("subjectId",{validate : (fieldvalue) =>{
          return(fieldvalue != -1 ||"Please select a subject.")
        }})
      }>          
            <option value={-1} >Select a subject</option>
        {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </select>
      {errors.subjectId && <p className="text-danger text-start">{errors.subjectId?.message}</p>}
        </div>
        <div style={{ minHeight: "90px" }}>
          <label htmlFor="gradeValue" className="w-100 text-start">Please enter the exam grade.</label>
          <input type="number" id="gradeValue" defaultValue={0} className="form-control"{...register("gradeValue",{validate : (value) =>{
            return (value >= 5 && value <= 10 || "Enter a grade in ragne 5-10.")
          }})}>

          </input>
          {errors.gradeValue && <p className="text-danger text-start">{errors.gradeValue?.message}</p>}
      </div>
      <div style={{ minHeight: "100px" }}>
      <label htmlFor="note" className="w-100 text-start">Leave an optional comment.</label>

          <textarea className="form-control" id="note" name="note"{...register("note")}></textarea>
      </div>
      <div className="row px-2">

        <input type="submit" value={"Add grade"} className="btn btn-success mt-1 col " />
      </div>
        <DevTool control={control}></DevTool>
      </form>
    </div>
  );
}
