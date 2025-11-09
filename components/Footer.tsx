import React, { useState, useRef } from 'react';
import { 
    LogoGraduationCapIcon,
    FacebookIcon, 
    TwitterIcon, 
    LinkedinIcon, 
    InstagramIcon, 
    SendIcon, 
    MailIcon,
    LocationIcon,
    PhoneIcon
} from './icons';
import { Page } from '../App';

interface FooterProps {
    navigate: (page: Page, options?: { anchor?: string }) => void;
    onAdminLoginClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ navigate, onAdminLoginClick }) => {
    
    const [clickCount, setClickCount] = useState(0);
    const clickTimeoutRef = useRef<number | null>(null);

    const handleNav = (e: React.MouseEvent, page: Page, anchor?: string) => {
        e.preventDefault();
        navigate(page, { anchor });
    };

    const handleAdminLoginTrigger = () => {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);

        if (newClickCount === 5) {
            onAdminLoginClick();
            setClickCount(0); // Reset after triggering
        } else {
            clickTimeoutRef.current = window.setTimeout(() => {
                setClickCount(0); // Reset if not clicked 5 times quickly enough
            }, 2000);
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Newsletter Section */}
            <div className="border-b border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-semibold text-white mb-2">Subscribe to our Newsletter</h3>
                            <p className="text-sm text-gray-400">Get the latest updates and news from Faustina Easy Education.</p>
                        </div>
                        <form className="flex w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input 
                                id="footer-email"
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-l-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                aria-label="Email for newsletter"
                            />
                            <button 
                                type="submit"
                                aria-label="Subscribe to newsletter"
                                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-md transition-colors"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <a href="#" onClick={(e) => handleNav(e, 'home')} className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2 rounded-md">
                                    <LogoGraduationCapIcon className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">Faustina Easy Education</span>
                            </a>
                        </div>
                        <p className="text-sm">
                            Empowering minds through innovative education. We are dedicated to fostering a community of learners and leaders.
                        </p>
                         <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="w-6 h-6" /></a>
                            <a href="https://www.linkedin.com/in/faustinaeasyeducation" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon className="w-6 h-6" /></a>
                            <a href="https://www.instagram.com/fleeaacademy_trichy?igsh=MTNnbXFtaW8wYXF2YQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
                        </div>
                    </div>

                    {/* Sitemap */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Link</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => handleNav(e, 'home')} className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'about')} className="hover:text-blue-400 transition-colors">About</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'courses')} className="hover:text-blue-400 transition-colors">Courses</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'contact')} className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    
                    {/* For Students */}
                     <div>
                        <h3 className="text-lg font-semibold text-white mb-4">For Students</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Admissions</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'home', 'testimonials')} className="hover:text-blue-400 transition-colors">Testimonials</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'blog')} className="hover:text-blue-400 transition-colors">Blogs</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'about', 'gallery')} className="hover:text-blue-400 transition-colors">Gallery</a></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <LocationIcon className="w-5 h-5 mt-1 mr-3 text-blue-400 flex-shrink-0"/>
                                <span>1/ 1B, First Street, North Ukkadai, Ariyamangalam, Trichy 620 010, Tamilnadu, India</span>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="w-5 h-5 mt-1 mr-3 text-blue-400 flex-shrink-0"/>
                                <div>
                                    <a href="tel:+916384912165" className="hover:text-blue-400 transition-colors block">+91 638 49 121 65</a>
                                    <a href="tel:+919159967555" className="hover:text-blue-400 transition-colors block">+91 91 599 67 555</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MailIcon className="w-5 h-5 mt-1 mr-3 text-blue-400 flex-shrink-0"/>
                                <a href="mailto:FaustinaEasyEducation@gmail.com" className="hover:text-blue-400 transition-colors">FaustinaEasyEducation@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-black/20 py-4 border-t border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <p className="mb-2 sm:mb-0 cursor-pointer" onClick={handleAdminLoginTrigger}>&copy; {new Date().getFullYear()} Faustina Easy Education. All Rights Reserved.</p>
                    <p>Powered With Knowledge By <a href="https://sustydigimarketers.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-semibold">SustyDigiMarketers</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;