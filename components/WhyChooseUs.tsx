import React from 'react';
import { CheckIcon, PlayCircleIcon } from './icons';

const WhyChooseUs: React.FC = () => {
    return (
        <section className="bg-white py-16 sm:py-24" id="why-choose-us">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="lg:pr-8 text-center lg:text-left">
                    <p className="text-blue-600 font-semibold mb-2">Why Choose Us</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                        The Best Learning Platform in The World
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Our university provides a rich social and cultural experience, fostering an environment where students can thrive both academically and personally.
                    </p>
                    <ul className="space-y-4 mb-10 inline-block text-left">
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">World-class faculty and staff dedicated to student success.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">State-of-the-art facilities and cutting-edge research opportunities.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">A vibrant and diverse campus community with global connections.</span>
                        </li>
                    </ul>
                    <div>
                        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300">
                            Discover More
                        </button>
                    </div>
                </div>
                <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] rounded-lg overflow-hidden group">
                    <img
                        src="https://picsum.photos/seed/lecture/800/600"
                        alt="A modern lecture hall"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <a href="#" aria-label="Play video about our university" className="transform scale-100 group-hover:scale-110 transition-transform duration-300">
                            <PlayCircleIcon className="w-20 h-20 lg:w-24 lg:h-24 text-white opacity-80 group-hover:opacity-100" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;