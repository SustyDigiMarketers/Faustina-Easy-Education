import React, { useState, useEffect, useRef } from 'react';
import { SwooshStarIcon, QuoteIcon } from './icons';

const testimonialsData = [
    {
        quote: "Compliment interested discretion estimating on stimulated apartments oh.",
        name: 'Mehwish',
    },
    {
        quote: "Dear so sing when in find read of call. As distrusts behaviour abilities defective is.",
        name: 'Elizabeth Jeff',
    },
    {
        quote: "Never at water me might. On formed merits hunted unable merely by mr whence or.",
        name: 'Emily Thomas',
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length),
            5000 // Scroll every 5 seconds
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    return (
        <section className="py-24 bg-white" id="testimonials">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <div className="relative text-center lg:text-left">
                        <div className="absolute -top-12 -left-4 hidden lg:block">
                            <SwooshStarIcon />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            What Our <br /> Customers Says
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
                            Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.
                        </p>
                    </div>

                    {/* Right Column - Carousel */}
                    <div className="relative">
                        <div className="overflow-hidden w-full">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {testimonialsData.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0 p-1">
                                        <div className="bg-white rounded-lg shadow-lg p-6 w-full relative z-10 min-h-[140px]">
                                            <div>
                                                <p className="font-bold text-gray-800 text-lg mb-1">{testimonial.name}</p>
                                                <p className="text-gray-500 text-sm leading-relaxed">{testimonial.quote}</p>
                                            </div>
                                            <QuoteIcon className="absolute top-4 right-4 w-10 h-10 text-gray-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center space-x-2 mt-6">
                            {testimonialsData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                        currentIndex === index ? 'bg-violet-500' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;