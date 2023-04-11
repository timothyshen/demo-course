import React, { useState, useEffect } from "react";
import { getAllCourse } from "@/api";
import { Course } from "@/types";
import { useRouter } from "next/router";

const CourseDetail: React.FC = () => {
  const route = useRouter();
  const [data, setData] = useState<Course[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const getAllCourses = async () => {
    try {
      const courses = await getAllCourse();
      setData(courses);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    }
  };

  const handleEdit = (id: string) => {
    route.push(`/dashboard/${id}`);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="w-1/2 mx-auto">
      <h1>Course Detail</h1>
      {data.map((course, index) => (
        <div key={index}>
          <div>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </div>
          <div>
            <button
              onClick={() => {
                handleEdit(course._id);
              }}
              className="px-4 py-2 m-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDetail;
