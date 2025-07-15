"use client"

import { Button } from '@/@/components/ui/button'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { Progress } from '@/components/ui/progress'


function EnrollCourseCard({course,enrollCourse}) {
    const courseJson=course?.courseJson?.course; 

    const CalculatePerProgress=()=>{
      return (enrollCourse?.completedChapters?.length??0/course?.courseContent?.length)*100
    }


  return (
     <div className='shadow rounded-xl'>
         
       <Image
  src={course?.bannerImageUrl}
  alt={course?.name || 'Course Image'}
  width={400}
  height={200}
  className="rounded-t-xl object-cover"
/>


       
        <div className='p-3 flex flex-col gap-3'>
          <h2 className='font-bold text-lg'>{course?.courseJson?.name}</h2>
          <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
          <div className=''>
          <h2 className='flex justify-between text-sm text-primary'>Progress <span>{CalculatePerProgress()}%</span></h2>
            <Progress value={CalculatePerProgress()} />
          <Link href={`/workspace/view-course/${course?.cid}`}>
    <Button className="w-full mt-3">
    <PlayCircle className="mr-2" />
    Continue Learning
    </Button>
    </Link>

          </div>
          
        </div>
       </div>
  )
}

export default EnrollCourseCard