import React from 'react';
import { CheckIcon } from './icons';
import { Page } from '../App';
import { media } from './media';

interface AboutSectionProps {
    navigate: (page: Page) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ navigate }) => {
    return (
        <section className="py-16 sm:py-24 bg-blue-50" id="about-us">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative h-auto lg:h-[500px] flex items-center justify-center">
                    {/* Decorative circles for larger screens */}
                    <div className="hidden lg:block absolute w-72 h-72 border-2 border-red-200 rounded-full -left-12 top-0"></div>
                    <div className="hidden lg:block absolute w-48 h-48 border-2 border-green-200 rounded-full right-0 -bottom-8"></div>
                    
                    {/* Responsive Image Collage */}
                    <div className="relative w-full max-w-md h-[400px] sm:h-[500px] lg:h-full">
                        <img 
                            src={media.aboutSection.studentsSmiling} 
                            alt="Students smiling" 
                            className="absolute right-0 top-0 w-3/4 h-full object-cover rounded-lg shadow-2xl"
                        />
                        <img 
                            src={media.aboutSection.studentReading} 
                            alt="Student reading" 
                            className="absolute left-0 top-10 w-2/5 object-cover rounded-lg shadow-xl border-4 border-white"
                        />
                        <img 
                            src={media.aboutSection.universityBuilding} 
                            alt="University building" 
                            className="absolute left-4 sm:left-8 bottom-16 w-1/3 object-cover rounded-lg shadow-lg border-4 border-white"
                        />
                    </div>
                </div>

                <div className="lg:pl-8 text-center lg:text-left">
                    <p className="text-blue-600 font-semibold mb-2">About Educal</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                        Degrees in Various academic Disciplines
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Not only can university offer an environment rich in our social an cultural experiences.
                    </p>
                    <ul className="space-y-4 mb-10 inline-block text-left">
                        <li className="flex items-center">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 p-1 bg-green-100 rounded-full" />
                            <span className="text-gray-700">Access to all our courses</span>
                        </li>
                        <li className="flex items-center">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 p-1 bg-green-100 rounded-full" />
                            <span className="text-gray-700">Learn the latest skills</span>
                        </li>
                        <li className="flex items-center">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 p-1 bg-green-100 rounded-full" />
                            <span className="text-gray-700">Upskill your organization</span>
                        </li>
                    </ul>
                    <div>
                        <button 
                            onClick={() => navigate('courses')}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300"
                        >
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;