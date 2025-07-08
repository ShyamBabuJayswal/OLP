import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(req){
    const {courseId}=await req.json();
    const user=await currentUser();

    //if course already enrolled 
    const enrollCourses=await db.select().from(enrollCourseTable).where(and(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress.emailAddress),
     eq(enrollCourseTable.cid,courseId)
))
    if(enrollCourses?.length==0){
        const result=await db.insert(enrollCourseTable).values ({
            cid:courseId,
            userEmail:user.primaryEmailAddress?.emailAddress
        }).returning(enrollCourseTable)

        return NextResponse.json(result);
    }
    return NextResponse.json({'resp':'Already Enrolled'})
}