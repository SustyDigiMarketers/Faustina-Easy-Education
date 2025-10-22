import React from 'react';
import { BlogPost, Page } from '../App';
import { ClockIcon, UserCircleIcon, SearchIcon, FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from './icons';

// Fix: Using mock data for blog posts and implementing the component. Ideally this data would be shared from a single source.
const allPosts: BlogPost[] = [
    {
        id: 1,
        image: 'https://picsum.photos/seed/blog1/800/500',
        category: 'Technology',
        date: 'July 21, 2024',
        author: 'Admin',
        comments: 2,
        title: 'The Impact of AI on Modern Education',
        excerpt: 'Artificial intelligence is revolutionizing the way we learn and teach. Discover the key changes and what to expect in the coming years...',
        content: (
            <div className="prose lg:prose-lg max-w-none text-gray-600">
                <p>The integration of Artificial Intelligence (AI) into education is no longer a futuristic concept but a present-day reality that is reshaping learning environments. From personalized learning paths to automated administrative tasks, AI is setting new standards for efficiency and effectiveness in schools and universities worldwide.</p>
                
                <h3 className="text-gray-800">Personalized Learning Experiences</h3>
                <p>One of the most significant impacts of AI is its ability to tailor educational content to individual student needs. AI-powered platforms can analyze a student's performance, identify their strengths and weaknesses, and adapt the curriculum accordingly. This ensures that students are neither bored by material they've already mastered nor overwhelmed by concepts that are too advanced.</p>
                
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
                    "AI will not replace teachers, but teachers who use AI will replace those who don't." - Unknown
                </blockquote>

                <h3 className="text-gray-800">Enhancing Teaching Tools</h3>
                <p>AI also serves as a powerful assistant for educators. It can automate grading for multiple-choice and fill-in-the-blank questions, freeing up valuable time for teachers to focus on student interaction and lesson planning. Furthermore, AI tools can help create engaging digital content, such as interactive simulations and virtual labs, making learning more immersive.</p>

                <ul className="list-disc pl-5 space-y-2">
                    <li>Automated grading and feedback systems.</li>
                    <li>Intelligent tutoring systems providing 24/7 support.</li>
                    <li>Plagiarism detection and academic integrity tools.</li>
                    <li>Data analytics for curriculum improvement.</li>
                </ul>

                <p>As we continue to explore the potential of AI in education, it's crucial to address the ethical considerations and ensure equitable access for all students. The future is bright, and with thoughtful implementation, AI can unlock unprecedented opportunities for learners and educators alike.</p>
            </div>
        )
    },
    {
        id: 2,
        image: 'https://picsum.photos/seed/blog2/800/500',
        category: 'Student Life',
        date: 'July 18, 2024',
        author: 'Jane Smith',
        comments: 5,
        title: 'Top 10 Study Tips for Exam Success',
        excerpt: 'Exams can be stressful, but with the right strategies, you can excel. Here are our top 10 tips for effective studying...',
        content: <p>Full content for blog post 2...</p>
    },
    {
        id: 3,
        image: 'https://picsum.photos/seed/blog3/800/500',
        category: 'Campus Events',
        date: 'July 15, 2024',
        author: 'Admin',
        comments: 0,
        title: 'Recap: Annual University Innovation Fair 2024',
        excerpt: 'Our annual Innovation Fair was a massive success! Read about the winning projects and the brilliant minds behind them...',
        content: <p>Full content for blog post 3...</p>
    },
    {
        id: 4,
        image: 'https://picsum.photos/seed/blog4/800/500',
        category: 'Career',
        date: 'July 12, 2024',
        author: 'David Lee',
        comments: 8,
        title: 'How to Build a Standout Resume for Your First Job',
        excerpt: 'Your resume is your first impression on potential employers. Learn how to craft a document that highlights your skills and gets you noticed...',
        content: <p>Full content for blog post 4...</p>
    },
];

interface SingleBlogPostPageProps {
    post: BlogPost;
    navigate: (page: Page, options?: { post?: BlogPost }) => void;
}

const PageHeader: React.FC = () => (
    <section className="relative h-64 bg-gray-800 text-white">
        <img 
            src="https://picsum.photos/seed/blog-banner/1920/400" 
            alt="Person typing on a laptop" 
            className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold">Blog Details</h1>
            <p className="mt-2 text-lg">Home / <span className="text-blue-300">Blog Details</span></p>
        </div>
    </section>
);

const Sidebar: React.FC<{ navigate: (page: Page, options?: { post?: BlogPost }) => void; }> = ({ navigate }) => (
    <aside className="space-y-8">
        {/* Search Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Search</h3>
            <div className="relative">
                <input type="text" placeholder="Search posts..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10" />
                <button className="absolute inset-y-0 right-0 px-3 text-gray-500">
                    <SearchIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        {/* Recent Posts Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>
            <div className="space-y-4">
                {allPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex items-start space-x-4">
                        <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-500">{post.date}</p>
                            <button onClick={() => navigate('blog-post', { post })} className="font-semibold text-gray-800 hover:text-blue-600 leading-tight block text-left">{post.title}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </aside>
);

const SingleBlogPostPage: React.FC<SingleBlogPostPageProps> = ({ post, navigate }) => {
    return (
        <main>
            <PageHeader />
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <article className="lg:col-span-2">
                            <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" />
                            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                <div className="flex items-center">
                                    <UserCircleIcon className="w-4 h-4 mr-1.5" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="w-4 h-4 mr-1.5" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">{post.title}</h1>
                            
                            {post.content}

                            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                                <span className="font-semibold text-gray-800">Share this post:</span>
                                <div className="flex space-x-3">
                                    <a href="#" aria-label="Share on Facebook" className="text-gray-500 hover:text-blue-600"><FacebookIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on Twitter" className="text-gray-500 hover:text-blue-500"><TwitterIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on LinkedIn" className="text-gray-500 hover:text-blue-700"><LinkedinIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on Instagram" className="text-gray-500 hover:text-pink-500"><InstagramIcon className="w-5 h-5"/></a>
                                </div>
                            </div>
                        </article>

                        <div className="lg:col-span-1">
                            <Sidebar navigate={navigate} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SingleBlogPostPage;