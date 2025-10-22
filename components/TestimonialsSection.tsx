import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

const testimonials = [
    { quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisi velit minima.", name: 'John Doe', program: 'Entrepreneur', avatar: 'https://i.pravatar.cc/80?u=student1' },
    { quote: "A transformative experience that prepared me for the real world. The curriculum is both challenging and rewarding.", name: 'Jane Smith', program: 'Designer', avatar: 'https://i.pravatar.cc/80?u=student2' },
    { quote: "The faculty's dedication is unparalleled. I received constant support and mentorship throughout my studies.", name: 'Sam Wilson', program: 'Developer', avatar: 'https://i.pravatar.cc/80?u=student3' },
    { quote: "An amazing place to learn and grow. The campus environment is incredibly inspiring and fosters collaboration.", name: 'Emily Brown', program: 'Marketer', avatar: 'https://i.pravatar.cc/80?u=student4' },
    { quote: "I'm grateful for the opportunities Eduker provided, from internships to research projects. It's a top-tier institution.", name: 'Michael Lee', program: 'Engineer', avatar: 'https://i.pravatar.cc/80?u=student5' },
];

const TestimonialsSection = () => {
    const [current, setCurrent] = useState(0);
    const numTestimonials = testimonials.length;

    const next = () => {
        setCurrent(prev => (prev === numTestimonials - 1 ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrent(prev => (prev === 0 ? numTestimonials - 1 : prev - 1));
    };
    
    return (
        <section className="py-16 sm:py-24 bg-slate-50 overflow-x-hidden" id="testimonials">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-orange-500 font-semibold mb-2 text-sm">What out customers say about us</p>
                     <h2 className="text-4xl md:text-5xl font-bold text-gray-800 relative">
                        Testimonials
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl md:text-7xl font-bold text-gray-200/80 -z-10" aria-hidden="true">Testimonials</span>
                     </h2>
                </div>

                <div className="relative flex items-center justify-center -mx-12">
                     <button 
                        onClick={prev} 
                        aria-label="Previous testimonial"
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-20"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="relative w-full max-w-4xl mx-auto h-[320px]">
                        {testimonials.map((testimonial, index) => {
                             // Logic to handle circular carousel positioning
                             let offset = index - current;
                             if (offset > numTestimonials / 2) offset -= numTestimonials;
                             if (offset < -numTestimonials / 2) offset += numTestimonials;

                             const isVisible = Math.abs(offset) <= 1;
                             const scale = offset === 0 ? 1 : 0.85;
                             const transform = `translateX(${offset * 70}%) scale(${scale})`;

                             return (
                                <div
                                    key={index}
                                    className="absolute top-0 left-0 w-full h-full p-4"
                                    style={{ 
                                        transform: transform,
                                        zIndex: numTestimonials - Math.abs(offset),
                                        opacity: isVisible ? 1 : 0,
                                        transition: 'transform 500ms ease, opacity 300ms ease',
                                     }}
                                    aria-hidden={!isVisible}
                                >
                                    <div className={`bg-white rounded-lg p-6 pt-12 h-full flex flex-col justify-center text-center transition-shadow duration-500 ${offset === 0 ? 'shadow-2xl' : 'shadow-lg'}`}>
                                        <img src={testimonial.avatar} alt={testimonial.name} className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md" />
                                        <div className="mt-4">
                                            <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                                            <p className="text-sm text-gray-500 mb-4">{testimonial.program}</p>
                                        </div>
                                        <p className="text-gray-600 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                                    </div>
                                </div>
                             )
                        })}
                    </div>
                    
                    <button 
                        onClick={next}
                        aria-label="Next testimonial"
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-20"
                    >
                        <ArrowRightIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === current ? 'bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;