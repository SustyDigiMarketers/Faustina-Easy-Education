import React, { useState } from 'react';
import { 
    MailIcon, 
    LocationIcon, 
    LogoGraduationCapIcon, 
    MenuIcon, 
    XIcon,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    InstagramIcon,
    ChevronDownIcon
} from './icons';
import { Page, BlogPost } from '../App';

interface HeaderProps {
    navigate: (page: Page, options?: { post?: BlogPost, anchor?: string }) => void;
    onAdmissionClick: () => void;
}

// Fix: Define NavItem interface with an optional 'children' property to resolve TypeScript errors.
interface NavItem {
    name: string;
    page: 'home' | 'about' | 'courses' | 'blog' | 'contact';
    href: string;
    children?: {
        name: string;
        page?: Page;
        href: string;
        anchor?: string;
    }[];
}

const Header: React.FC<HeaderProps> = ({ navigate, onAdmissionClick }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

    const handleNav = (e: React.MouseEvent, page?: Page, anchor?: string) => {
        if (page) {
            e.preventDefault();
            navigate(page, { anchor });
            setMobileMenuOpen(false);
            setOpenMobileDropdown(null);
        }
    };

    const handleMobileDropdown = (e: React.MouseEvent, name: string) => {
        e.preventDefault();
        setOpenMobileDropdown(openMobileDropdown === name ? null : name);
    };

    const navItems: NavItem[] = [
        { name: 'Home', page: 'home' as const, href: '#' },
        { name: 'About', page: 'about' as const, href: '#' },
        { name: 'Courses', page: 'courses' as const, href: '#' },
        { name: 'Blog', page: 'blog' as const, href: '#' },
        { name: 'Contact', page: 'contact' as const, href: '#' },
    ];

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
                        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-blue-600 transition-colors"><TwitterIcon className="w-4 h-4" /></a>
                        <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-600 transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
                        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-blue-600 transition-colors"><InstagramIcon className="w-4 h-4" /></a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-white relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
                    <div className="flex items-center">
                        <a href="#" onClick={(e) => handleNav(e, 'home')} className="flex items-center space-x-2 sm:space-x-3">
                            <div className="bg-blue-600 p-2 rounded-md">
                                <LogoGraduationCapIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <span className="text-lg sm:text-xl font-bold text-gray-800 block leading-tight">Faustina Easy</span>
                                <span className="text-[10px] sm:text-xs text-gray-600 block leading-tight">Education Private Limited</span>
                            </div>
                        </a>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <a 
                                    href={item.href || '#'} 
                                    onClick={(e) => handleNav(e, item.page as Page)} 
                                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 cursor-pointer flex items-center"
                                >
                                    {item.name}
                                    {item.children && <ChevronDownIcon className="w-4 h-4 ml-1" />}
                                </a>
                                {item.children && (
                                    <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-48 z-10 border border-gray-100">
                                        {item.children.map((child) => (
                                            <a 
                                                key={child.name} 
                                                href={child.href}
                                                onClick={(e) => child.page ? handleNav(e, child.page as Page, child.anchor) : undefined}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
                                            >
                                                {child.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-2">
                         <button 
                            onClick={onAdmissionClick}
                            className="bg-blue-600 text-white font-bold py-2 px-3 sm:px-5 rounded-md hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base"
                         >
                            Admission
                        </button>

                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-blue-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-label="Open main menu"
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div id="mobile-menu" className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200">
                        <nav className="flex flex-col p-4 space-y-1">
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    <a 
                                        href={item.href || '#'} 
                                        onClick={(e) => item.children ? handleMobileDropdown(e, item.name) : handleNav(e, item.page as Page)} 
                                        className="text-gray-800 font-medium hover:text-blue-600 py-2 px-2 rounded-md hover:bg-gray-100 flex justify-between items-center"
                                    >
                                        <span>{item.name}</span>
                                        {item.children && <ChevronDownIcon className={`w-4 h-4 transition-transform ${openMobileDropdown === item.name ? 'rotate-180' : ''}`} />}
                                    </a>
                                    {item.children && openMobileDropdown === item.name && (
                                        <div className="pl-4 mt-1 space-y-1">
                                            {item.children.map(child => (
                                                <a 
                                                    key={child.name} 
                                                    href={child.href}
                                                    onClick={(e) => child.page ? handleNav(e, child.page as Page, child.anchor) : undefined}
                                                    className="block text-gray-600 font-medium hover:text-blue-600 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {child.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;