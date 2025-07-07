"use client"
import { Button } from '@/@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';

function CourseList() {
    const[courseList, setCourseList]=useState([]);

    const {user}=useUser();
    useEffect(()=>{
   user &&  GetCourseList();
    },[user])

    const GetCourseList=async()=>{
      const result=await axios.get('api/courses')
      console.log(result.data)
      setCourseList(result.data)
      
    }
  return (
    <div>
        <h2 className='p-5 font-bold text-3xl'>Course List</h2>

        {courseList?.length==0?
         <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>

         <Image src='/download.jpg'alt='education' width={80} height={80}/>
         <h2 className='my-2 text-xl font-bold'>Look like you haven't created ant courses yet</h2>
         <Button>+ Create your first course</Button>

        </div>:
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-4 gap-5'>
            {
              courseList?.map((course,index)=>{
              return <CourseCard course={course} key={index}/>
              })
            }
        </div>
        }
    </div>
  )
}

export default CourseList