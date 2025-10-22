import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import WhyChooseUs from './components/WhyChooseUs';
import PopularCourses from './components/PopularCourses';
import TestimonialsSection from './components/TestimonialsSection';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import BlogPage from './components/BlogPage';
import SingleBlogPostPage from './components/SingleBlogPostPage';
import AdmissionForm from './components/AdmissionForm';
import ContactPage from './components/ContactPage';

// Fix: Define Page type for navigation, fixing import errors in other components.
export type Page = 'home' | 'about' | 'blog' | 'courses' | 'contact' | 'blog-post';

// Fix: Define BlogPost interface for blog data structure.
export interface BlogPost {
    id: number;
    image: string;
    category: string;
    date: string;
    author: string;
    comments: number;
    title: string;
    excerpt: string;
    content: React.ReactNode;
}

// Fix: Implement the main App component to handle page rendering and state. This resolves the errors about App.tsx not being a module.
const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isAdmissionFormOpen, setAdmissionFormOpen] = useState(false);

    const navigate = useCallback((page: Page, options?: { post?: BlogPost, anchor?: string }) => {
        const { post, anchor } = options || {};

        const scrollToAction = () => {
            if (anchor) {
                document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo(0, 0);
            }
        };

        // If we're not changing the page, just scroll.
        if (page === currentPage) {
            scrollToAction();
            return;
        }

        // Otherwise, change the page and then scroll.
        setCurrentPage(page);
        if (post) {
            setSelectedPost(post);
        } else if (page !== 'blog-post') {
            setSelectedPost(null);
        }

        // Use a timeout to ensure the new page components are mounted before scrolling.
        setTimeout(scrollToAction, 100);
    }, [currentPage]);

    const handleAdmissionClick = () => {
        setAdmissionFormOpen(true);
    };
    
    const handleCloseAdmissionForm = () => {
        setAdmissionFormOpen(false);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <Hero />
                        <FeatureCards />
                        <AboutSection />
                        <StatsSection />
                        <WhyChooseUs />
                        <PopularCourses />
                        <TestimonialsSection />
                    </>
                );
            case 'about':
                return <AboutPage />;
            case 'courses':
                return <CoursesPage />;
            case 'blog':
                return <BlogPage navigate={navigate} />;
            case 'blog-post':
                return selectedPost 
                    ? <SingleBlogPostPage post={selectedPost} navigate={navigate} /> 
                    : <BlogPage navigate={navigate} />; // Fallback to blog list
            case 'contact':
                return <ContactPage />;
            default:
                return (
                    <>
                        <Hero />
                        <FeatureCards />
                        <AboutSection />
                        <StatsSection />
                        <WhyChooseUs />
                        <PopularCourses />
                        <TestimonialsSection />
                    </>
                );
        }
    };

    return (
        <>
            <Header navigate={navigate} onAdmissionClick={handleAdmissionClick} />
            {renderPage()}
            <Footer navigate={navigate} />
            {isAdmissionFormOpen && <AdmissionForm onClose={handleCloseAdmissionForm} />}
        </>
    );
};

export default App;