import React, { useEffect } from 'react';
import { Page, BlogPost } from './types';
import {
    Header,
    Footer,
    Hero,
    FeatureCards,
    AboutSection,
    StatsSection,
    WhyChooseUs,
    PopularCourses,
    TestimonialsSection,
    AboutPage,
    CoursesPage,
    BlogPage,
    SingleBlogPostPage,
    AdmissionForm,
    GalleryManagement,
    SuperAdminDashboard,
    ContactPage,
    CourseDetailPage,
    Course,
    LoginPage,
    Notification
} from './components';

import { useContentManagement } from './components/hooks/useContentManagement';
import { useNavigation } from './components/hooks/useNavigation';
import { useAuth } from './components/hooks/useAuth';
import { useModals } from './components/hooks/useModals';
import { media } from './components/media';

const App: React.FC = () => {
    useEffect(() => {
        const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (favicon) {
            favicon.href = media.favicon;
            favicon.type = 'image/png';
        }
    }, []);

    const { 
        galleryImages, 
        blogPosts, 
        courses, 
        contentHandlers,
        notification,
        clearNotification
    } = useContentManagement();

    const { currentPage, selectedPost, selectedCourse, navigate } = useNavigation();
    
    const { userRole, login, logout } = useAuth();

    const { 
        isAdmissionFormOpen,
        isLoginPageOpen,
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
                        <FeatureCards navigate={navigate} onAdmissionClick={modalHandlers.handleAdmissionClick} />
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
                    onLogout={logout}
                />
                 {isAdmissionFormOpen && <AdmissionForm onClose={modalHandlers.handleCloseAdmissionForm} courses={courses} />}
                 {isLoginPageOpen && <LoginPage onClose={modalHandlers.handleCloseLoginPage} onLogin={login} />}
                 {notification && <Notification notification={notification} onClose={clearNotification} />}
            </>
        );
    }

    return (
        <>
            <Header navigate={navigate} onAdmissionClick={modalHandlers.handleAdmissionClick} userRole={userRole} onLogout={logout} />
            {renderPageContent()}
            <Footer navigate={navigate} onLoginClick={modalHandlers.handleOpenLoginPage} />
            {isAdmissionFormOpen && <AdmissionForm onClose={modalHandlers.handleCloseAdmissionForm} courses={courses} />}
            {isLoginPageOpen && <LoginPage onClose={modalHandlers.handleCloseLoginPage} onLogin={login} />}
            {notification && <Notification notification={notification} onClose={clearNotification} />}
        </>
    );
};

export default App;