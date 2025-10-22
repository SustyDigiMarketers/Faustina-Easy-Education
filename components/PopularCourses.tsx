import React from 'react';
import CourseCard, { Course } from './CourseCard';

const courses: Course[] = [
    {
        id: 1,
        image: 'https://picsum.photos/seed/course1/400/250',
        category: 'Web Development',
        price: '$29.99',
        title: 'The Complete 2024 Web Development Bootcamp',
        lessons: 24,
        students: 125,
        rating: 4.8,
        instructor: { name: 'Dr. Angela Yu', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704d' },
    },
    {
        id: 2,
        image: 'https://picsum.photos/seed/course2/400/250',
        category: 'Data Science',
        price: '$49.99',
        title: 'Machine Learning A-Z: AI, Python & R',
        lessons: 32,
        students: 210,
        rating: 4.9,
        instructor: { name: 'Kirill Eremenko', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704e' },
    },
    {
        id: 3,
        image: 'https://picsum.photos/seed/course3/400/250',
        category: 'Business',
        price: '$19.99',
        title: 'An Entire MBA in 1 Course: Award Winning',
        lessons: 18,
        students: 305,
        rating: 4.7,
        instructor: { name: 'Chris Haroun', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704f' },
    },
];

const PopularCourses: React.FC = () => {
    return (
        <section className="bg-slate-50 py-24" id="courses">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-semibold mb-2">Popular Courses</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Our Most Popular Courses
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
                <div className="text-center mt-12">
                     <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300">
                        View All Courses
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;