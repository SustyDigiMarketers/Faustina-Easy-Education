import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';
import { Page } from '../types';
import { media } from './media';

const slides = [
    {
        pretitle: "EDUKER UNIVERSITY",
        title: "Together We'll Explore New Things",
        description: "We believe everyone should have the opportunity to create progress through technology.",
        video: media.hero.video1
    },
    {
        pretitle: "INNOVATIVE LEARNING",
        title: "Shape Your Future With Us",
        description: "Discover a world of knowledge and unlock your potential with our expert faculty.",
        video: media.hero.video2
    },
    {
        pretitle: "GLOBAL COMMUNITY",
        title: "Join a Diverse Network",
        description: "Connect with students and professionals from around the globe.",
        video: media.hero.video3
    }
];

interface HeroProps {
    navigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <section className="relative h-[500px] sm:h-[550px] md:h-[600px] text-white overflow-hidden">
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <video 
                        src={slide.video} 
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-gray-800/50"></div>
                    <div className="relative z-20 h-full flex items-center">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className={`max-w-3xl transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                <p className="text-blue-300 font-semibold tracking-widest uppercase text-sm sm:text-base">{slide.pretitle}</p>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold my-4 leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-base sm:text-lg text-gray-200 mb-8">
                                    {slide.description}
                                </p>
                                <button 
                                    onClick={() => navigate('courses')}
                                    className="bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-md hover:bg-blue-700 transition-all duration-300"
                                >
                                    Find Courses
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button onClick={prevSlide} aria-label="Previous slide" className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 sm:p-3 rounded-full hover:bg-opacity-40 transition-all">
                <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button onClick={nextSlide} aria-label="Next slide" className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 sm:p-3 rounded-full hover:bg-opacity-40 transition-all">
                <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
        </section>
    );
};

export default Hero;
