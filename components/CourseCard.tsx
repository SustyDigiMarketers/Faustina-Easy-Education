import React from 'react';
import { StarIcon, UserCircleIcon, ClockIcon } from './icons';

export interface Course {
    id: number;
    image: string;
    category: string;
    price: string;
    title: string;
    lessons: number;
    students: number;
    rating: number;
    instructor: {
        name: string;
        avatar: string;
    };
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col">
            <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">{course.category}</span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-700 font-bold ml-1">{course.rating}</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{course.price}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors flex-grow min-h-[56px]">{course.title}</h3>
                <div className="flex items-center text-sm text-gray-500 border-t border-gray-200 pt-3 mt-4">
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1.5" />
                        {course.lessons} Lessons
                    </div>
                    <div className="flex items-center ml-auto">
                        <UserCircleIcon className="w-4 h-4 mr-1.5" />
                        {course.students} Students
                    </div>
                </div>
                 <div className="flex items-center mt-4">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700 ml-3">{course.instructor.name}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;