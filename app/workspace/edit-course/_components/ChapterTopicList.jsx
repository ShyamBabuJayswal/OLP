import React, { useEffect, useState } from 'react';
import { CheckCircle, Gift } from 'lucide-react';

function ChapterTopicList({ course }) {
  const [isLoading, setIsLoading] = useState(true);
  const [courseLayout, setCourseLayout] = useState(null);

  useEffect(() => {
    if (course?.courseJson?.course) {
      setCourseLayout(course.courseJson.course);
      setIsLoading(false);
    }
  }, [course]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-3xl mt-10 text-center'>Chapters and Topics</h2>
      <div className='flex flex-col items-center justify-center mt-10'>
        {courseLayout?.chapters.map((chapter, index) => (
          <div key={index} className='flex flex-col items-center w-full max-w-4xl'>
            {/* Chapter Header */}
            <div className='p-4 border shadow rounded-xl bg-primary text-white w-full mb-6'>
              <h2 className='text-center'>Chapter {index + 1}</h2>
              <h2 className='font-bold text-lg text-center'>{chapter.chapterName}</h2>
              <h2 className='text-xs flex justify-between gap-16'>
                <span>Duration: {chapter?.duration}</span>
                <span>No. Of Topics: {chapter?.topics?.length}</span>
              </h2>
            </div>

            {/* Timeline */}
            <div className='relative w-full'>
              {/* Vertical Line ending above gift */}
              <div className='absolute left-1/2 transform -translate-x-1/2 top-0 bottom-16 w-1 bg-gray-300'></div>

              {/* Topics */}
              {chapter?.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className='relative w-full flex justify-center items-center mb-10 gap-x-6'>
                  {/* Left Side Topic */}
                  {topicIndex % 2 !== 0 && (
                    <div className='w-3/2 flex justify-end pr-6'>
                      <div className='bg-white border border-gray-300 rounded-md px-4 py-2 text-sm max-w-xs text-right'>
                        {topic}
                      </div>
                    </div>
                  )}

                  {/* Number in center */}
                  <div className='absolute left-1/2 transform -translate-x-1/2 bg-purple-600 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold z-10'>
                    {topicIndex + 1}
                  </div>

                  {/* Right Side Topic */}
                  {topicIndex % 2 === 0 && (
                    <div className='w-3/2 flex justify-start pl-6'>
                      <div className='bg-white border border-gray-300 rounded-md px-4 py-2 text-sm max-w-xs'>
                        {topic}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Gift icon aligned to center of timeline */}
              <div className='flex justify-center mt-2'>
                <div className='bg-gray-300 rounded-full h-10 w-10 p-2 flex items-center justify-center'>
                  <Gift className='text-purple-600' />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Final Finish Card */}
        <div className='p-4 border shadow rounded-xl bg-green-600 text-white mt-10'>
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
