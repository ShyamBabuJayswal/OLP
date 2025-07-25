import { Button } from '@/@/components/ui/button';
import { SelectChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Cross, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function ChapterContent({courseInfo,refreshData}) {
  const {courseId}=useParams();

    if (!courseInfo) return <div className='p-10'>Loading...</div>;
  const {course,enrollCourse}=courseInfo ?? ''; 
   
  const courseContent=courseInfo?.courses?.courseContent;
  const{selectChapterIndex,setSelectChapterIndex}=useContext(SelectChapterIndexContext);
 const videoData = courseContent?.[selectChapterIndex]?.youtubeName;
 const topics = courseContent?.[selectChapterIndex]?.courseData?.topics;
 let completedChapter=enrollCourse?.completedChapter ?? [];
 const [loading,setLoading]=useState(false);

  const markChapterCompleted=async ()=>{
    setLoading(true);
  completedChapter.push(selectChapterIndex);
      const result=await axios.put('/api/enroll-course',{
        courseId:courseId,
        completedChapter:completedChapter
      });
      console.log(result);
      refreshData()
      toast.success('Chapter Marked Completed!')
      setLoading(false);
   
  }
   const markChapterInCompleted=async ()=>{
    setLoading(false);
      const completedChapter=completedChapter.filter(item=>item!=selectChapterIndex);
      const result=await axios.put('/api/enroll-course',{
        courseId:courseId,
        completedChapter:completedChapter
      });
      console.log(result);
      refreshData()
      toast.success('Chapter Marked InCompleted!')
      setLoading(false);
   
  }

  



  return (
    <div className='p-10'>
    <div className='flex justify-between items-center'>
     <h2 className='font-bold text-2xl'>{selectChapterIndex+1}. 
     {courseContent?.[selectChapterIndex]?.courseData?.chapterName}
     </h2>

    {!completedChapter?.includes(selectChapterIndex)?<Button onClick={()=>markChapterCompleted()}
    disabled={loading}
    >
      {loading ?<Loader2Icon className='animate-spin'/>:<CheckCircle/>}
    Mark as Completed</Button>
    :
    <Button variant="outline" onClick={markChapterInCompleted} disabled={loading}>
       {loading ?<Loader2Icon className='animate-spin'/>:
    <X/>}Mark incomplete </Button>}

     </div>
     <h2 className='my-2 font-bold text-lg'>Related Videos🎬</h2>
     <div>
       {courseContent?.[selectChapterIndex]?.courseData?.chapterName}
     </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        {
        videoData?.map((video,index)=>index<2 && (
          <div key={index}>
            <YouTube
              videoId={video?.videoId}
              opts={{
                height:'250',
                width:'400'
                
              }}
            />

          </div>
        ))
      }
      </div>
      <div className='mt-7'>
        {
         topics.map((topic,index)=>
         (
          <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
            <h2 className='font-bold text-2xl
            text-primary '>{index+1}. {topic?.topic}</h2>
            {/* <p>{topic?.content}</p> */}
            <div dangerouslySetInnerHTML={{__html:topic?.content}}
            style={{
  lineHeight: '2.5'
}}

            >

            </div>
          </div>
         )) 
        }
      </div>

    </div>
  )
}

export default ChapterContent