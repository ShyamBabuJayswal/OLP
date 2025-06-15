"use client"
import { Button } from '@/@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'

function CourseList() {
    const[courseList, setCourseList]=useState([]);
  return (
    <div>
        <h2 className='p-5 font-bold text-3xl'>Course List</h2>

        {courseList?.length==0?
         <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>

         <Image src='/download.jpg'alt='education' width={80} height={80}/>
         <h2 className='my-2 text-xl font-bold'>Look like you haven't created ant courses yet</h2>
         <Button>+ Create your first course</Button>

        </div>:
        <div>
            List of Courses
        </div>
        }
    </div>
  )
}

export default CourseList