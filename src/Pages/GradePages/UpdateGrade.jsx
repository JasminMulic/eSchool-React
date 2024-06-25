import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function UpdateGrade() {
  const params = useParams()
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [grade, setGrade] = useState({})
    const loadData = async () =>{
      try{

          const requestStudents = await axios.get('https://localhost:44390/api/Students/')
          const requestSubjects = await axios.get('https://localhost:44390/api/Subjects/')
          if(requestStudents.status == 200 && requestSubjects.status == 200){
              setStudents(requestStudents.data)
              setSubjects(requestSubjects.data)
          }
          else{
              alert("There was an error in communication with server.")
          }
      }
      catch(error){
          alert(error.message)
      }

  }
  const loadGradeData = async() =>{
    try{
      const response = await axios.get(`https://localhost:44390/api/Grades/${params.id}`)
      if(response.status == 200)
        setGrade(response.data)
      setValue("studentId", response.data.studentId)
      setValue("subjectId", response.data.subjectId)
      setValue("gradeValue", response.data.grade)
      setValue("note", response.data.note )
      console.log("grade recieved from backend")
      console.log(response.data)

    }
    catch(exception){
      alert(exception.message)
    }
  }
    useEffect(() =>{
      console.log(students)

        loadData()
        loadGradeData()
        return () =>{
        }
    },[])
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    try{
      const response = await axios.put(`https://localhost:44390/api/Grades/Update/${params.id}`,data)
      if(response.status == 200)
        navigate("/Grades", {state : {message : "Grade updated successfully."}})
    }
      catch(exception){
        console.log(exception)
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
            <label htmlFor="studentId" className="text-start mb-1 w-100">Choose a student:</label>
        <select className="form-select" name="studentId" id="studentId" defaultValue={grade.studentId} onChange={(event) => setValue("studentId", event.target.value)} {...register("studentId",{validate : (fieldvalue) =>{
          return(fieldvalue != -1 ||"Please select a student.")
        }})
      }>    
      <option>{grade.studentName}</option>
      {students.filter(student => student.id != grade.studentId).map((student) => <option key={student.id} value={student.id}>{student.firstname} {student.lastname}</option>)}

        </select>
      {errors.studentName && <p className="text-danger text-start">{errors.studentName?.message}</p>}
        </div>


        <div style={{ minHeight: "100px" }}>
            <label htmlFor="subjectId" className="text-start mb-1 w-100">Choose a subject:</label>
        <select className="form-select" name="subjectId" id="subjectId" {...register("subjectId",{validate : (fieldvalue) =>{
          return(fieldvalue != -1 ||"Please select a subject.")
        }})
      }>          
            <option>{grade.subjectName}</option>      

        {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </select>
      {errors.subjectId && <p className="text-danger text-start">{errors.subjectId?.message}</p>}
        </div>
        <div style={{ minHeight: "90px" }}>
          <label htmlFor="gradeValue" className="w-100 text-start">Please enter the exam grade.</label>
          <input type="number" id="gradeValue" name="gradeValue" defaultValue={grade.grade} className="form-control"{...register("gradeValue",{validate : (value) =>{
            return (value >= 5 && value <= 10 || "Enter a grade in ragne 5-10.")
          }})}>

          </input>
          {errors.gradeValue && <p className="text-danger text-start">{errors.gradeValue?.message}</p>}
      </div>
      <div style={{ minHeight: "100px" }}>
      <label htmlFor="note" className="w-100 text-start">Leave an optional comment.</label>

          <textarea className="form-control" id="note" name="note"defaultValue={grade.note}{...register("note")}></textarea>
      </div>
      <div className="row px-2">

        <input type="submit" value={"Add grade"} className="btn btn-success mt-1 col " />
      </div>
        <DevTool control={control}></DevTool>
      </form>
    </div>
  );
}
