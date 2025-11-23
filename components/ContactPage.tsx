import React, { useState } from 'react';
import { LocationIcon, MailIcon, PhoneIcon, CheckIcon } from './icons';
import { media } from './media';

const PageHeader: React.FC = () => (
    <section className="relative h-64 bg-gray-800 text-white">
        <img
            src={media.pageHeaders.contact}
            alt="Abstract background"
            className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="mt-2 text-lg">Home / <span className="text-blue-300">Contact</span></p>
        </div>
    </section>
);

const ContactDetails: React.FC = () => {
    const contactInfo = [
        {
            icon: <LocationIcon className="w-8 h-8 text-white" />,
            title: "Our Location",
            line1: "1/ 1B, First Street, North Ukkadai, Ariyamangalam,",
            line2: "Trichy 620 010, Tamilnadu, India",
        },
        {
            icon: <MailIcon className="w-8 h-8 text-white" />,
            title: "Email Us",
            line1: "FaustinaEasyEducation@gmail.com",
            line2: <>&nbsp;</>,
        },
        {
            icon: <PhoneIcon className="w-8 h-8 text-white" />,
            title: "Call Us",
            line1: "+91 638 49 121 65",
            line2: "+91 91 599 67 555",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.line1}</p>
                    <p className="text-gray-600">{item.line2}</p>
                </div>
            ))}
        </div>
    );
};

// Simple confetti-like effect component
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

const ContactFormAndMap: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbxcrLrH3d5aHVydy2YHYHzfruVC6JIh8p_lcQgfjHSTN22Y0UsA_UsiC1vCssNthUHyaQ/exec", {
                method: 'POST',
                body: formData,
                mode: 'no-cors', // Important for handling opaque redirects from Google Scripts
            });

            // With 'no-cors', we can't inspect the response, but we can assume success if the request doesn't throw a network error.
            setIsSuccess(true);
            form.reset();

        } catch (err: any) {
             setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                     {isSuccess ? (
                        <div className="text-center bg-green-50 p-8 rounded-lg shadow-md border border-green-200 relative overflow-hidden h-full flex flex-col justify-center">
                            <PartyPop />
                            <div className="relative z-10">
                                <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckIcon className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Message Sent!</h2>
                                <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you shortly.</p>
                                <button 
                                    onClick={() => setIsSuccess(false)}
                                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-300"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                            <p className="text-gray-600 mb-8">Have a question or a comment? Use the form below to send us a message.</p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="text" id="name" name="name" placeholder="Your Name" required className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" id="email" name="email" placeholder="Your Email" required className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                     <div>
                                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="sr-only">Subject</label>
                                        <select 
                                            id="subject" 
                                            name="subject" 
                                            required 
                                            defaultValue=""
                                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                                        >
                                            <option value="" disabled>Select a Subject</option>
                                            <option value="Admission">Admission</option>
                                            <option value="Fees">Fees</option>
                                            <option value="Get Touch">Get Touch</option>
                                            <option value="Courses Detail">Courses Detail</option>
                                            <option value="Business">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea id="message" name="message" rows={6} placeholder="Your Message" required className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"></textarea>
                                </div>
                                <input type="hidden" name="formName" value="Contact" />
                                {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
                                <div>
                                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white font-bold py-4 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
                <div className="h-96 lg:h-full rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.978078694769!2d78.7163084!3d10.8129893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf4f7287a7127%3A0xfd4fb37b49ec6b9e!2s1%2F18%2F1%2F4A%2C%201st%20St%2C%20Kamaraj%20Nagar%2C%20Tiruchirappalli%2C%20Tamil%20Nadu%20620004!5e0!3m2!1sen!2sin!4v1762701854744!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="University Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

const ContactPage: React.FC = () => {
    return (
        <main className="bg-slate-50">
            <PageHeader />
            <div className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ContactDetails />
                </div>
            </div>
            <ContactFormAndMap />
        </main>
    );
};

// Add styles for party pop animation
const styles = `
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

if (typeof document !== 'undefined' && !document.getElementById('party-pop-animation-style')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'party-pop-animation-style';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}


export default ContactPage;