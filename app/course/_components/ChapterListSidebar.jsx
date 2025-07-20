import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectChapterIndexContext } from '@/context/SelectedChapterIndexContext';

function ChapterListSidebar({courseInfo}) {
  const course=courseInfo?.course;
  const enrollCourse=courseInfo?.enrollCourse;
  const courseContent=courseInfo?.courses?.courseContent;
  const{selectChapterIndex,setSelectChapterIndex}=useContext(SelectChapterIndexContext);
  return (
    <div className='w-80 bg-secondary h-screen p-5'>
    <h2 className='my-3 font-bold text-xl'>Chapters({courseContent?.length})</h2>
        <Accordion type="single" collapsible>
       {
  courseContent?.map((chapter, index) => {
    return (
      <AccordionItem value={chapter?.courseData?.chapterName} key={index}
      onClick={()=>setSelectChapterIndex(index)}
      >
        <AccordionTrigger className={'text-lg font-medium'}>{index+1}.{chapter?.courseData?.chapterName}</AccordionTrigger>
        <AccordionContent asChild>
          <div className='p-4 bg-white rounded-lg'>
           {chapter?.courseData?.topics.map((topic,index)=>(
           <h2 key={index} className='p-3 bg-white rounded-md border border-gray-300 my-2'>
  {topic?.topic}
</h2>


           )

           )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  })
}
 
</Accordion>
    </div>
  )
}

export default ChapterListSidebar