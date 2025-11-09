import React, { useState, useEffect } from 'react';
import { GalleryImage, BlogPost } from '../../App';
import { Course } from '../CourseCard';
import { media } from '../media';

const initialGalleryImages: GalleryImage[] = media.initialContent.gallery;

const initialCourses: Course[] = [
    {
        id: 1,
        image: media.initialContent.courses.lang,
        category: 'Foreign Languages',
        price: '$49.99',
        title: 'Weekend Crash Courses',
        description: 'For working professionals & visa seeking students / spouses.',
        explanation: 'Our comprehensive foreign language program is designed for learners of all levels, from absolute beginners to advanced speakers. We focus on practical communication skills, cultural understanding, and real-world application. With experienced native-speaking instructors and a dynamic curriculum, you will build confidence in speaking, listening, reading, and writing.',
        uniqueness: [
            'Interactive lessons with native speakers',
            'Focus on conversational fluency',
            'Cultural immersion activities and events',
            'Flexible online and in-person class schedules',
            'Preparation for official language proficiency exams'
        ],
        lessons: 20,
        students: 150,
        rating: 4.8,
        instructor: { name: 'Dr. Sofia Ricci' },
    },
    {
        id: 2,
        image: media.initialContent.courses.phonics,
        category: 'Phonics & English Communication',
        price: '$29.99',
        title: 'Exam Preparation Batches',
        description: 'EFI / DELF / TCF / TEF (French), Zertificat (German), etc.',
        explanation: 'Build a strong foundation in English with our Phonics and Communication course. This program is perfect for young learners and non-native speakers, focusing on clear pronunciation, effective reading strategies, and confident public speaking. Our engaging and interactive methods make learning English fun and effective.',
        uniqueness: [
            'Systematic phonics instruction for all ages',
            'Public speaking and presentation skills workshops',
            'Small group sizes for personalized attention',
            'Engaging activities, games, and role-playing',
            'Certified and experienced language instructors'
        ],
        lessons: 32,
        students: 210,
        rating: 4.9,
        instructor: { name: 'David Wilson' },
    },
    {
        id: 3,
        image: media.initialContent.courses.robot,
        category: 'Robotics & Coding',
        price: '$79.99',
        title: 'Women Skill Development Workshops',
        description: 'For skill development, digital literacy & entrepreneurship.',
        explanation: 'Step into the future with our Robotics and Coding bootcamp. This hands-on program introduces you to the exciting world of automation, programming, and artificial intelligence. You will learn to build and program your own robots, develop problem-solving skills, and work on exciting projects that bring your ideas to life. No prior experience is required!',
        uniqueness: [
            'Hands-on project-based learning approach',
            'Learn popular programming languages like Python',
            'Build and program your own robots from scratch',
            'Compete in exciting robotics challenges',
            'Guidance from experienced engineers and programmers'
        ],
        lessons: 45,
        students: 95,
        rating: 4.7,
        instructor: { name: 'Dr. Kenji Tanaka' },
    },
    {
        id: 4,
        image: media.initialContent.courses.it,
        category: 'Computer Hardware & IT Skills',
        price: '$39.99',
        title: 'Summer & Winter Camps',
        description: 'Short-term fun learning modules for school children and homemakers.',
        explanation: 'Gain essential IT skills with our practical Computer Hardware course. This program covers everything from PC assembly and troubleshooting to network setup and security essentials. Whether you are looking to start a career in IT support or simply want to become more tech-savvy, this course provides the foundational knowledge you need for success.',
        uniqueness: [
            'Assemble a complete PC from components',
            'Diagnose and repair common hardware and software issues',
            'Learn about networking fundamentals',
            'Understand cybersecurity best practices',
            'Prepare for CompTIA A+ certification'
        ],
        lessons: 25,
        students: 120,
        rating: 4.6,
        instructor: { name: 'Maria Rodriguez' },
    },
    {
        id: 5,
        image: media.initialContent.courses.commerce,
        category: 'Commerce & Accounts',
        price: 'Free',
        title: 'Phonics and Super Reader programmes',
        description: 'English Phonics ( level 1 and level 2), Super Reader Programme (Beginner and Pro)',
        explanation: 'Our Commerce and Accounts program provides a solid grounding in the principles of business, finance, and accounting. Taught by industry professionals, this course covers topics like financial accounting, bookkeeping, taxation, and business law. It is ideal for aspiring accountants, entrepreneurs, and anyone interested in the world of commerce.',
        uniqueness: [
            'Real-world case studies and practical assignments',
            'Training on popular accounting software (e.g., Tally, QuickBooks)',
            'Comprehensive understanding of financial statements',
            'Expert guidance on taxation and compliance',
            'Career counseling and placement assistance'
        ],
        lessons: 40,
        students: 550,
        rating: 4.7,
        instructor: { name: 'Samuel Green' },
    },
     {
        id: 6,
        image: media.initialContent.courses.art,
        category: 'Creative Arts',
        price: '$24.99',
        title: 'Creative Arts Workshop',
        description: 'Unleash your inner artist and explore various mediums.',
        explanation: 'Explore your creativity in our diverse Creative Arts program. From painting and sketching to digital illustration and sculpture, this course allows you to experiment with various mediums under the guidance of professional artists. Develop your unique artistic voice and build an impressive portfolio in a supportive and inspiring environment.',
        uniqueness: [
            'Studio access with professional materials',
            'Personalized feedback from established artists',
            'Workshops in various mediums (painting, digital, etc.)',
            'Opportunities to exhibit your work',
            'Portfolio development for college or career'
        ],
        lessons: 15,
        students: 80,
        rating: 4.8,
        instructor: { name: 'Chloé Dubois' },
    },
     {
        id: 7,
        image: media.initialContent.courses.coach,
        category: 'Entrepreneurial coaching',
        price: '$129.99',
        title: 'Startup Launchpad',
        description: 'Turn your business idea into a reality with expert coaching.',
        explanation: 'Have a great business idea? Our Entrepreneurial Coaching program is designed to guide you from concept to launch. Learn how to create a business plan, secure funding, market your product, and navigate the challenges of starting a new venture. Benefit from one-on-one mentorship with successful entrepreneurs and industry experts.',
        uniqueness: [
            'One-on-one mentorship with successful entrepreneurs',
            'Develop a professional business plan',
            'Pitching practice and feedback sessions',
            'Networking opportunities with investors',
            'Legal and financial guidance for startups'
        ],
        lessons: 30,
        students: 50,
        rating: 4.9,
        instructor: { name: 'Raj Patel' },
    },
     {
        id: 8,
        image: media.initialContent.courses.digital,
        category: 'Digital marketing training',
        price: '$59.99',
        title: 'Digital Marketing Bootcamp',
        description: 'Master SEO, social media, and online advertising.',
        explanation: 'Become a digital marketing pro with our intensive training program. This course covers all the essential channels, including SEO, social media marketing, content marketing, email marketing, and paid advertising (PPC). Learn to create and execute effective digital strategies, analyze campaign performance, and drive business growth online.',
        uniqueness: [
            'Learn SEO, SEM, and Social Media Marketing',
            'Manage live ad campaigns on Google and Facebook',
            'Master analytics and data-driven strategies',
            'Build a professional marketing portfolio',
            'Earn industry-recognized certifications'
        ],
        lessons: 35,
        students: 250,
        rating: 4.7,
        instructor: { name: 'Aisha Khan' },
    },
];

// Fix: Replaced JSX syntax with React.createElement to resolve parsing errors in a .ts file.
const initialBlogPosts: BlogPost[] = [
    {
        id: 1,
        image: media.initialContent.blog.blog1,
        category: 'Technology',
        date: 'July 21, 2024',
        author: 'Admin',
        comments: 2,
        title: 'The Impact of AI on Modern Education',
        excerpt: 'Artificial intelligence is revolutionizing the way we learn and teach. Discover the key changes and what to expect in the coming years...',
        content: React.createElement(
            React.Fragment,
            null,
            React.createElement('p', null, `Artificial intelligence is no longer the stuff of science fiction. It's a pervasive technology that's reshaping industries, and education is no exception. In this article, we'll explore the profound impact AI is having on modern learning environments.`),
            React.createElement('h2', null, `Personalized Learning Paths`),
            React.createElement('p', null, `One of the most significant advantages of AI in education is its ability to create personalized learning experiences. AI-powered platforms can analyze a student's performance, identify their strengths and weaknesses, and adapt the curriculum in real-time. This ensures that every student learns at their own pace, receiving extra help where they struggle and advanced material when they're ready to move ahead.`),
            React.createElement('h2', null, `Automating Administrative Tasks`),
            React.createElement('p', null, `Teachers often spend a considerable amount of time on administrative tasks like grading, scheduling, and paperwork. AI can automate many of these processes, freeing up educators to focus on what they do best: teaching and mentoring students. Automated grading systems, for example, can provide instant feedback on assignments, helping students learn from their mistakes more quickly.`),
            React.createElement('h3', null, `AI Tutors and Support`),
            React.createElement('p', null, `24/7 academic support is now a reality thanks to AI-powered tutors and chatbots. These tools can answer student questions, provide explanations for complex topics, and offer guidance on homework assignments at any time of day. This immediate access to help can significantly reduce student frustration and improve learning outcomes.`),
            React.createElement('h2', null, `Future Outlook`),
            React.createElement('p', null, `The integration of AI in education is still in its early stages, but the potential is immense. From virtual reality labs to predictive analytics that identify at-risk students, AI promises to make education more effective, accessible, and engaging for everyone. As we move forward, it's crucial for educators, policymakers, and technologists to collaborate to ensure that AI is implemented thoughtfully and ethically in our schools and universities.`)
        )
    },
    {
        id: 2,
        image: media.initialContent.blog.blog2,
        category: 'Student Life',
        date: 'July 18, 2024',
        author: 'Jane Smith',
        comments: 5,
        title: 'Top 10 Study Tips for Exam Success',
        excerpt: 'Exams can be stressful, but with the right strategies, you can excel. Here are our top 10 tips for effective studying...',
        content: React.createElement('p', null, 'Full content for blog post 2...')
    },
];

export const useContentManagement = () => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
        try {
            const savedImages = window.localStorage.getItem('galleryImages');
            if (savedImages) {
                const parsedImages = JSON.parse(savedImages);
                if (Array.isArray(parsedImages) && parsedImages.every(img => typeof img === 'object' && 'src' in img)) {
                    return parsedImages;
                }
            }
        } catch (error) {
            console.error('Error reading gallery images from localStorage', error);
        }
        return initialGalleryImages;
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
        } catch (error) {
            console.error('Error saving gallery images to localStorage', error);
        }
    }, [galleryImages]);

    const contentHandlers = {
        addGalleryImage: (image: GalleryImage) => setGalleryImages(prev => [image, ...prev]),
        deleteGalleryImage: (src: string) => setGalleryImages(prev => prev.filter(image => image.src !== src)),
        
        addBlogPost: (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'comments'>) => setBlogPosts(prev => [{ ...post, id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}), author: 'Admin', comments: 0 }, ...prev]),
        updateBlogPost: (updatedPost: BlogPost) => setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p)),
        deleteBlogPost: (id: number) => setBlogPosts(prev => prev.filter(p => p.id !== id)),

        addCourse: (course: Omit<Course, 'id'>) => setCourses(prev => [{ ...course, id: Date.now(), description: course.title, explanation: '', uniqueness: [] }, ...prev]),
        updateCourse: (updatedCourse: Course) => setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c)),
        deleteCourse: (id: number) => setCourses(prev => prev.filter(c => c.id !== id)),
    };

    return {
        galleryImages,
        blogPosts,
        courses,
        contentHandlers,
    };
};