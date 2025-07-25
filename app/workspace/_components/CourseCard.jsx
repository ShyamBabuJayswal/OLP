"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Skeleton } from "@/@/components/ui/skeleton";
import { Button } from "@/@/components/ui/button";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    try {
      const result = await axios.get("/api/courses?courseId=0");
      setCourseList(result.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="font-bold text-3xl mb-6">Explore More Courses</h2>

      {/* Search Bar */}
      <div className="flex gap-5 max-w-md mb-8">
        <Input placeholder="Search for a course..." />
        <Button><Search className="mr-1" />Search</Button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {!loading ? (
          courseList?.length > 0 ? (
            courseList.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No courses found.</p>
          )
        ) : (
          [0, 1, 2, 3].map((_, index) => (
            <Skeleton key={index} className="w-full h-[240px] rounded-xl" />
          ))
        )}
      </div>
    </div>
  );
}

export default Explore;
