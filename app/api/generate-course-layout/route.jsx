import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';

import { NextResponse } from 'next/server';
import axios from 'axios';


const PROMPT = `Generate Learning Course based on the following details. Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format. Chapter Name, Topics under each chapter, Duration for each chapter etc., in JSON format only.

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}

User Input: 
`;

export async function POST(req) {
  const {courseId,...formData} = await req.json();
  const user = await currentUser();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemma-3-27b-it';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(formData), // Correct string concatenation
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  console.log(response.candidates[0].content.parts[0].text); 

 
  const RawResp=response.candidates[0].content.parts[0].text;
const RawJson = RawResp.replace('```json', '').replace('```', '');
const JSONresponse=JSON.parse(RawJson);

const imagePrompt = JSONresponse.course?.bannerImagePrompt;




  //generate banner  Image 

   const bannerImageUrl= await generateImage(imagePrompt)

 


  // Save to database
  const result = await db.insert(coursesTable).values({
    ...formData,
    courseJson: JSONresponse,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid:courseId,
    bannerImageUrl:bannerImageUrl

  });

  return NextResponse.json({courseId:courseId});
}

const generateImage =async(imagePrompt)=>{
  const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input:imagePrompt,
            model: 'sdxl',
            aspectRatio:"16:9"
        },
        {
            headers: {
                'x-api-key': process.env.AI_GURU_LAB_API, 
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) 
return result.data.image
}


 
