"use client"

import { Button } from '@/@/components/ui/button'
import axios from 'axios'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'

function EnrollCourseList({course}) {
  const [enrolledCourseList, setEnrolledCourseList] = useState([])
  

  useEffect(() => {
    GetEnrollCourse()
  }, [])

  const GetEnrollCourse = async () => {
    const result = await axios.get('/api/enroll-course')
    console.log(result.data)
    setEnrolledCourseList(result.data)
  }

  return enrolledCourseList?.length > 0 && (
    <div className='mt-3'>
      <h2 className='font-bold text-xl'>Continue Learning your courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
        {enrolledCourseList?.map((course, index) => (
        <EnrollCourseCard
  course={course?.courses} // ✅ Correct key
  enrollCourse={course?.enrollCourse}
  key={index}
    />

        ))}
      </div>
    </div>
  )
}

export default EnrollCourseList
