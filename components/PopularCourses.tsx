import React from 'react';
import CourseCard, { Course } from './CourseCard';

interface PopularCoursesProps {
    courses: Course[];
}

const PopularCourses: React.FC<PopularCoursesProps> = ({ courses }) => {
    // We are now showing the first 5 courses from the list.
    const popularCourses = courses.slice(0, 5);

    return (
        <section className="bg-slate-50 py-24" id="courses">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <p className="text-blue-600 font-semibold mb-2">Popular Courses</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                        Our Most Popular Courses
                    </h2>
                    <p className="text-gray-600">
                        Explore our top-rated courses that are designed to provide you with the most relevant skills and knowledge to succeed in your career.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {popularCourses.map((course) => (
                        <div key={course.id} className="w-full sm:w-2/5 lg:w-1/4 max-w-sm flex">
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;