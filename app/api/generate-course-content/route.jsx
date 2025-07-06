import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from 'axios';
import 'dotenv/config';
import { coursesTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML 
and give response in JSON format. 
Schema:{
chapterName:<>, 
topics: [
  {
    topic: <>,
    content: <>
  }
]
}
: User Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = (courseJson?.chapters || []).map(async (chapter) => {
    const config = {
      responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.0-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: PROMPT + JSON.stringify(chapter),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const RawResp = response.candidates[0].content.parts[0].text;
    const RawJson = RawResp.replace('```json', '').replace('```', '')
    const JSONresponse = JSON.parse(RawJson);

    // Get YouTube video
    const youtubeData = await GetYoutubeVideo(chapter?.chapterName)
   console.log(
  JSON.stringify({
    youtubeName: youtubeData,
    courseData: JSONresponse,
  }, null, 2)
);

    return {
      youtubeName: youtubeData,
      courseData: JSONresponse,
    };
  });

  const CourseContent = await Promise.all(promises);

  // save to database
  try {
  const dbResponse = await db.update(coursesTable)
    .set({ courseContent: CourseContent })
    .where(eq(coursesTable.cid, courseId));
} catch (err) {
  console.error("Database update failed", err);
  throw new Error("Could not save course content to database");
}

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent: CourseContent,
    cid: courseId,
  });
}


const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVideo = async (topic) => {
  const params = {
    part: 'snippet',
    q: topic,
    maxResults: 4,
    type: 'video',
    key: process.env.YOUTUBE_API_KEY,
    
  };

  
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach(item =>{
      const data={
        videoId:item.id?.videoId,
        title:item?.snippet?.title
      }
      youtubeVideoList.push(data);
      
    })
       
    console.log("youtubeVideoList",youtubeVideoList)
    return youtubeVideoList;
    

   
  
};
