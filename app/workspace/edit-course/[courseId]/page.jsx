"use client"
import { useParams } from 'next/navigation'
import React from 'react'

function EditCourse() {
    const {courseId}=useParams();
    console.log(courseId);
    

  return (
    <div>EditCourse</div> 
  )
}

export default EditCourse