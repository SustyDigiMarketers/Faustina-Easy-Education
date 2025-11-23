import React from 'react';
import { StarIcon, UserCircleIcon, ClockIcon } from './icons';

export interface Course {
    id: number;
    image: string;
    category: string;
    price: string;
    title: string;
    description: string;
    explanation: string;
    uniqueness: string[];
    lessons: number;
    students: number;
    rating: number;
    instructor: {
        name: string;
    };
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col w-full">
            <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 border-t border-gray-200 pt-3 mt-auto">
                    <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-700 font-bold ml-1">{course.rating}</span>
                    </div>
                    <div className="flex items-center ml-auto">
                        <UserCircleIcon className="w-4 h-4 mr-1.5" />
                        {course.students} Students
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;