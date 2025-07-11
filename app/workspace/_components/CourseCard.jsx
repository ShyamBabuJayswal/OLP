import { Button } from '@/@/components/ui/button';
import axios from 'axios';
import { Book, PlayCircle, Settings, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

function CourseCard({course}) {
    const courseJson=course?.courseJson?.course;
    const[loading,setLoading]=useState(false);

   const onEnrollCourse = async () => {
  try {
    setLoading(true);

    const result = await axios.post('/api/enroll-course', {
      courseId: course?.cid
    });

    if (result.data.resp) {
      toast.warning('Already Enrolled!');
    } else {
      toast.success("Enrolled!");
    }

    setLoading(false);
  } catch (e) {
    toast.error("Server side error");
    setLoading(false);
  }
}


  return (
   <div className='shadow rounded-xl'>
     
        <Image src={course?.bannerImageUrl} alt={course?.name} width={400} height={'300'} className='w-full aspect-video rounded-t-xl object-cover'/>
   
    <div className='p-3 flex flex-col gap-3'>
      <h2 className='font-bold text-lg'>{course?.courseJson?.name}</h2>
      <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
      <div className='flex justify-between items-center'>
        <h2 className='flex items-center text-sm gap-2'><Book className='text-primary h-5 w-5'/>{courseJson?.noOfChapters} 
        Chapters
        </h2>
      {course?.courseContent && Object.keys(course.courseContent).length > 0
  ?  (<Button disabled={loading} onClick={onEnrollCourse} size="sm">
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <PlayCircle className="mr-1" />
          Enroll Course
        </>
      )}
    </Button>
  ) : (
    <Link href={`/workspace/edit-course/${course?.cid}`}>
      <Button size="sm" variant="outline">
        <Settings className="mr-1" />
        Generate Course
      </Button>
    </Link>
    )}

      </div>
    </div>
   </div>
  )
}

export default CourseCard