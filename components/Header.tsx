import React, { useState } from 'react';
import { 
    MailIcon, 
    LocationIcon, 
    MenuIcon, 
    XIcon,
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
} from './icons';
import { Page, BlogPost } from '../types';
import { media } from './media';

type UserRole = 'admin' | 'superadmin' | null;

interface HeaderProps {
    navigate: (page: Page, options?: { post?: BlogPost, anchor?: string }) => void;
    onAdmissionClick: () => void;
    userRole: UserRole;
    onLogout: () => void;
}

interface NavItem {
    name: string;
    page: Page;
    href: string;
}

const Header: React.FC<HeaderProps> = ({ navigate, onAdmissionClick, userRole, onLogout }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNav = (e: React.MouseEvent, page?: Page, anchor?: string) => {
        if (page) {
            e.preventDefault();
            navigate(page, { anchor });
            setMobileMenuOpen(false);
        }
    };

    const navItems: NavItem[] = [
        { name: 'Home', page: 'home', href: '#' },
        { name: 'About', page: 'about', href: '#' },
        { name: 'Courses', page: 'courses', href: '#' },
        { name: 'Blog', page: 'blog', href: '#' },
        { name: 'Contact', page: 'contact', href: '#' },
    ];

    if (userRole) {
        navItems.push({ name: 'Dashboard', page: 'admin', href: '#' });
    }

    return (
        <header className="bg-white sticky top-0 z-40 shadow-md">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 text-gray-600 text-xs sm:text-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
                    <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
                        <div className="flex items-center space-x-2">
                            <MailIcon className="w-4 h-4 text-blue-600" />
                            <span>FaustinaEasyEducation@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <LocationIcon className="w-4 h-4 text-blue-600" />
                            <span>1/1B, First Street, Trichy, India</span>
                        </div>
                    </div>
                     <div className="flex items-center space-x-4 ml-auto">
                        <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-blue-600 transition-colors"><FacebookIcon className="w-4 h-4" /></a>
                        <a href="https://www.linkedin.com/in/faustinaeasyeducation" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-600 transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/fleeaacademy_trichy?igsh=MTNnbXFtaW8wYXF2YQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-blue-600 transition-colors"><InstagramIcon className="w-4 h-4" /></a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-white relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
                    <div className="flex items-center">
                        <a href="#" onClick={(e) => handleNav(e, 'home')} className="flex items-center space-x-2 sm:space-x-3">
                            <img src={media.logo} alt="Faustina Easy Education Logo" className="h-10 sm:h-12 w-auto" />
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap">Faustina Easy Education</span>
                        </a>
                    </div>
                    
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a 
                                key={item.name}
                                href={item.href} 
                                onClick={(e) => handleNav(e, item.page)} 
                                className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 cursor-pointer"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-2">
                         <button 
                            onClick={onAdmissionClick}
                            className="bg-blue-600 text-white font-bold py-2 px-3 sm:px-5 rounded-md hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base"
                         >
                            Admission
                        </button>
                        
                        {userRole && (
                             <button 
                                onClick={onLogout}
                                className="hidden lg:block bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors text-sm"
                            >
                                Logout
                            </button>
                        )}

                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-blue-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-label="Open main menu"
                            >
                                {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200">
                        <nav className="flex flex-col p-4 space-y-1">
                            {navItems.map((item) => (
                                <a 
                                    key={item.name}
                                    href={item.href} 
                                    onClick={(e) => handleNav(e, item.page)} 
                                    className="text-gray-800 font-medium hover:text-blue-600 py-2 px-2 rounded-md hover:bg-gray-100"
                                >
                                    {item.name}
                                </a>
                            ))}
                            {userRole && (
                                <button
                                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                                    className="text-left text-red-600 font-medium hover:text-red-800 py-2 px-2 rounded-md hover:bg-gray-100 w-full"
                                >
                                    Logout
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;