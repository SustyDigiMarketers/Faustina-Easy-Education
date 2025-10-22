import React from 'react';
import { ArrowRightIcon, ClockIcon, SearchIcon, UserCircleIcon } from './icons';
import { Page, BlogPost } from '../App';

// Fix: Add content for blog posts and implement the component.
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
        content: <p>Full content for blog post 1...</p>
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

interface BlogPageProps {
    navigate: (page: Page, options: { post: BlogPost }) => void;
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
            <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
            <p className="mt-2 text-lg">Home / <span className="text-blue-300">Blog</span></p>
        </div>
    </section>
);

const BlogPostCard: React.FC<{ post: BlogPost; onReadMore: () => void; }> = ({ post, onReadMore }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
        <div className="relative">
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{post.category}</div>
        </div>
        <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                <div className="flex items-center">
                    <UserCircleIcon className="w-4 h-4 mr-1.5" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1.5" />
                    <span>{post.date}</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 h-24">{post.title}</h2>
            <p className="text-gray-600 mb-6">{post.excerpt}</p>
            <button onClick={onReadMore} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                Read More <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
        </div>
    </div>
);

const Sidebar: React.FC<{ navigate: (page: Page, options: { post: BlogPost }) => void; }> = ({ navigate }) => (
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
        {/* Categories Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between items-center"><a href="#" className="hover:text-blue-600">Technology</a> <span>(1)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-blue-600">Student Life</a> <span>(1)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-blue-600">Campus Events</a> <span>(1)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-blue-600">Career</a> <span>(1)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-blue-600">Academics</a> <span>(0)</span></li>
            </ul>
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

const BlogPage: React.FC<BlogPageProps> = ({ navigate }) => {
    return (
        <main>
            <PageHeader />
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            {allPosts.map(post => (
                                <BlogPostCard 
                                    key={post.id} 
                                    post={post} 
                                    onReadMore={() => navigate('blog-post', { post })}
                                />
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                            <Sidebar navigate={navigate} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogPage;