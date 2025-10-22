import React from 'react';
import { LocationIcon, MailIcon, PhoneIcon } from './icons';

const PageHeader: React.FC = () => (
    <section className="relative h-64 bg-gray-800 text-white">
        <img
            src="https://picsum.photos/seed/contact-banner/1920/400"
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

const ContactFormAndMap: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                    <p className="text-gray-600 mb-8">Have a question or a comment? Use the form below to send us a message.</p>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input type="text" id="name" placeholder="Your Name" className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email" id="email" placeholder="Your Email" className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="sr-only">Subject</label>
                            <input type="text" id="subject" placeholder="Subject" className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea id="message" rows={6} placeholder="Your Message" className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
                <div className="h-96 lg:h-full rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617544319086!2d-73.9878466845941!3d40.74844097932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628585324970!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
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

export default ContactPage;