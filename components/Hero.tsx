import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

const slides = [
    {
        pretitle: "EDUKER UNIVERSITY",
        title: "Together We'll Explore New Things",
        description: "We believe everyone should have the opportunity to create progress through technology.",
        video: "https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_25fps.mp4"
    },
    {
        pretitle: "INNOVATIVE LEARNING",
        title: "Shape Your Future With Us",
        description: "Discover a world of knowledge and unlock your potential with our expert faculty.",
        video: "https://videos.pexels.com/video-files/2759484/2759484-hd_1920_1080_30fps.mp4"
    },
    {
        pretitle: "GLOBAL COMMUNITY",
        title: "Join a Diverse Network",
        description: "Connect with students and professionals from around the globe.",
        video: "https://videos.pexels.com/video-files/854045/854045-hd_1920_1080_25fps.mp4"
    }
];

const Hero: React.FC = () => {
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
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
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
                                <button className="bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-md hover:bg-blue-700 transition-all duration-300">
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

            <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
