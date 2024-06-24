import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Students from './Pages//StudentPages/Students.jsx'
import AddStudent from './Pages//StudentPages/AddStudent.jsx'
import UpdateStudent from './Pages//StudentPages/UpdateStudent.jsx'

import Subjects from './Pages/SubjectPages/Subjects.jsx'
import AddSubject from './Pages/SubjectPages/AddSubject.jsx'
import UpdateSUbject from './Pages/SubjectPages/UpdateSubject.jsx'

import Grades from './Pages/GradePages/Grades.jsx'
import AddGrade from './Pages/GradePages/AddGrade.jsx'
import UpdateGrade from './Pages/GradePages/UpdateGrade.jsx'

import ErrorPage from './Pages/ErrorPage.jsx'
const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>
    },
    { path : 'Students', element: <Students />, errorElement : <ErrorPage /> },
    { path : "Students/AddStudent", element : <AddStudent />, errorElement : <ErrorPage /> },
    { path : "Students/UpdateStudent/:id", element : <UpdateStudent />, errorElement : <ErrorPage />},
    {path : "/Subjects", element : <Subjects />, errorElement : <ErrorPage />},
    {path : "/Subjects/UpdateSubject/:id", element : <UpdateSUbject />, errorElement : <ErrorPage />},
    {path : "/Subjects/AddSubject", element : <AddSubject />, errorElement : <ErrorPage />},
    {path : "/Grades", element : <Grades />, errorElement : <ErrorPage />},
    {path : "/Grades/AddGrade", element : <AddGrade />, errorElement : <ErrorPage />},
    {path : "/Grades/UpdateGrade/:id", element : <UpdateGrade />, errorElement : <ErrorPage />},





])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
