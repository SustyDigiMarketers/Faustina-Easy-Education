import React, { useEffect, useRef, useState } from 'react';
import { XIcon, LogoGraduationCapIcon, CheckIcon } from './icons';
import { Course } from './CourseCard';

interface AdmissionFormProps {
    onClose: () => void;
    courses: Course[];
}

const PartyPop = () => (
    <>
        {[...Array(20)].map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `party-pop-anim ${0.6 + Math.random() * 0.5}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
                backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'][Math.floor(Math.random() * 16)]
            };
            return <div key={i} style={style} className="party-popper"></div>
        })}
    </>
);

const AdmissionForm: React.FC<AdmissionFormProps> = ({ onClose, courses }) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        if (!isSuccess) {
            const firstInput = formRef.current?.querySelector('input');
            firstInput?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            await fetch("https://script.google.com/macros/s/AKfycbxcrLrH3d5aHVydy2YHYHzfruVC6JIh8p_lcQgfjHSTN22Y0UsA_UsiC1vCssNthUHyaQ/exec", {
                method: 'POST',
                body: formData,
                mode: 'no-cors',
            });
            setIsSuccess(true);
            form.reset();
        } catch (err: any) {
             setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admission-form-title"
        >
            <div ref={formRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-slate-50 rounded-t-lg">
                    <div className="flex items-center space-x-3">
                         <div className="bg-blue-600 p-2 rounded-md">
                            <LogoGraduationCapIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                             <h2 id="admission-form-title" className="text-lg sm:text-xl font-bold text-gray-800">Apply for Admission</h2>
                             <p className="text-xs sm:text-sm text-gray-500">Start your journey with Eduker.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close admission form"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {isSuccess ? (
                    <div className="text-center p-8 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                        <PartyPop />
                        <div className="relative z-10">
                            <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckIcon className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Application Sent!</h2>
                            <p className="text-gray-600 mb-6">Thank you. We will review your application and get back to you shortly.</p>
                            <button 
                                onClick={onClose}
                                className="bg-green-600 text-white font-bold py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                        <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-4">Personal Information</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" id="name" name="name" required placeholder="John Doe" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                                    <input type="email" id="email" name="email" required placeholder="you@example.com" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" placeholder="(123) 456-7890" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-4">Academic Details</legend>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Desired Course <span className="text-red-500">*</span></label>
                                    <select id="course" name="course" required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                        <option value="">Select a course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.title}>
                                                {course.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message / Statement of Purpose</label>
                                    <textarea id="message" name="message" rows={4} placeholder="Tell us a bit about why you'd like to join..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                                </div>
                            </div>
                        </fieldset>
                        
                        <div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" name="terms" type="checkbox" required className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-medium text-gray-700">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a></label>
                                    <p className="text-gray-500">You agree to our privacy policy by submitting this form.</p>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" name="formName" value="Admission" />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        
                        <div className="pt-2">
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

// Add fade-in and party pop animation styles
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes party-pop-anim {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1.5) rotate(360deg);
        opacity: 0;
    }
}
.party-popper {
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0;
    z-index: 5;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('admission-form-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'admission-form-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default AdmissionForm;