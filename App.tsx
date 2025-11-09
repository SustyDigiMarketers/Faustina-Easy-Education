import React from 'react';
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
import LoginPage from './components/LoginPage';
import GalleryManagement from './components/GalleryManagement';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import { Course } from './components/CourseCard';
import { useContentManagement } from './components/hooks/useContentManagement';
import { useNavigation } from './components/hooks/useNavigation';
import { useAuth } from './components/hooks/useAuth';
import { useModals } from './components/hooks/useModals';
import ContactPage from './components/ContactPage';
import CourseDetailPage from './components/CourseDetailPage';

export type Page = 'home' | 'about' | 'blog' | 'courses' | 'contact' | 'blog-post' | 'admin' | 'course-detail';

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

export interface GalleryImage {
    src: string;
    category: string;
    caption: string;
}

const App: React.FC = () => {
    const { 
        galleryImages, 
        blogPosts, 
        courses, 
        contentHandlers 
    } = useContentManagement();

    const { currentPage, selectedPost, selectedCourse, navigate } = useNavigation();
    
    const { 
        userRole, 
        isLoginPageOpen, 
        authHandlers 
    } = useAuth({ navigate });

    const { 
        isAdmissionFormOpen, 
        modalHandlers 
    } = useModals();

    // Create a new courses array for the courses page where titles match categories
    const coursesForCoursesPage = courses.map(course => ({
        ...course,
        title: course.category,
    }));

    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <Hero navigate={navigate} />
                        <FeatureCards />
                        <AboutSection navigate={navigate} />
                        <StatsSection />
                        <WhyChooseUs navigate={navigate} />
                        <PopularCourses courses={courses} />
                        <TestimonialsSection />
                    </>
                );
            case 'about': return <AboutPage galleryImages={galleryImages} />;
            case 'courses': return <CoursesPage courses={coursesForCoursesPage} navigate={navigate} />;
            case 'course-detail': return selectedCourse ? <CourseDetailPage course={selectedCourse} navigate={navigate} /> : <CoursesPage courses={coursesForCoursesPage} navigate={navigate} />;
            case 'blog': return <BlogPage navigate={navigate} blogPosts={blogPosts} />;
            case 'blog-post': return selectedPost ? <SingleBlogPostPage post={selectedPost} navigate={navigate} allPosts={blogPosts} /> : <BlogPage navigate={navigate} blogPosts={blogPosts} />;
            case 'contact': return <ContactPage />;
            case 'admin':
                // SuperAdmin is handled separately
                if (userRole === 'admin') {
                    return <GalleryManagement images={galleryImages} onAddImage={contentHandlers.addGalleryImage} onDeleteImage={contentHandlers.deleteGalleryImage} />;
                }
                // Fallback for unauthenticated or superadmin (handled outside)
                return <Hero navigate={navigate} />;
            default: return <Hero navigate={navigate} />;
        }
    };
    
    // Specific layout for SuperAdmin
    if (currentPage === 'admin' && userRole === 'superadmin') {
        return (
            <>
                <SuperAdminDashboard 
                    galleryImages={galleryImages}
                    onAddGalleryImage={contentHandlers.addGalleryImage}
                    onDeleteGalleryImage={contentHandlers.deleteGalleryImage}
                    blogPosts={blogPosts}
                    onAddBlogPost={contentHandlers.addBlogPost}
                    onUpdateBlogPost={contentHandlers.updateBlogPost}
                    onDeleteBlogPost={contentHandlers.deleteBlogPost}
                    courses={courses}
                    onAddCourse={contentHandlers.addCourse}
                    onUpdateCourse={contentHandlers.updateCourse}
                    onDeleteCourse={contentHandlers.deleteCourse}
                    navigate={navigate}
                    onLogout={authHandlers.handleLogout}
                />
                 {isAdmissionFormOpen && <AdmissionForm onClose={modalHandlers.handleCloseAdmissionForm} courses={courses} />}
                 {isLoginPageOpen && <LoginPage onClose={authHandlers.handleCloseLoginPage} onLoginSuccess={authHandlers.handleLoginSuccess} />}
            </>
        );
    }

    return (
        <>
            <Header navigate={navigate} onAdmissionClick={modalHandlers.handleAdmissionClick} userRole={userRole} onLogout={authHandlers.handleLogout} />
            {renderPageContent()}
            <Footer navigate={navigate} onAdminLoginClick={authHandlers.handleOpenLoginPage} />
            {isAdmissionFormOpen && <AdmissionForm onClose={modalHandlers.handleCloseAdmissionForm} courses={courses} />}
            {isLoginPageOpen && <LoginPage onClose={authHandlers.handleCloseLoginPage} onLoginSuccess={authHandlers.handleLoginSuccess} />}
        </>
    );
};

export default App;