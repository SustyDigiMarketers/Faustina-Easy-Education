import React, { useMemo } from 'react';
import { BlogPost, Page } from '../App';
import { ClockIcon, UserCircleIcon, SearchIcon, FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from './icons';
import { media } from './media';

interface SingleBlogPostPageProps {
    post: BlogPost;
    allPosts: BlogPost[];
    navigate: (page: Page, options?: { post?: BlogPost }) => void;
}

const PageHeader: React.FC = () => (
    <section className="relative h-64 bg-gray-800 text-white">
        <img 
            src={media.pageHeaders.blog} 
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

const Sidebar: React.FC<{ allPosts: BlogPost[]; navigate: (page: Page, options?: { post?: BlogPost }) => void; }> = ({ allPosts, navigate }) => (
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

const SingleBlogPostPage: React.FC<SingleBlogPostPageProps> = ({ post, allPosts, navigate }) => {
    
    const { headings, contentWithIds } = useMemo(() => {
        const generatedHeadings: { level: number; text: string; id: string }[] = [];
        if (!post.content || !React.isValidElement(post.content)) {
            return { headings: [], contentWithIds: post.content };
        }

        const slugify = (text: string) =>
            text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const getNodeText = (node: React.ReactNode): string => {
            if (typeof node === 'string' || typeof node === 'number') return String(node);
            if (Array.isArray(node)) return node.map(getNodeText).join('');
            // Fix for errors on lines 70 & 71: Cast props to a type with an optional children property.
            if (React.isValidElement(node)) {
                const props = node.props as { children?: React.ReactNode };
                if (props.children) {
                    return getNodeText(props.children);
                }
            }
            return '';
        };

        const processNode = (node: React.ReactNode): React.ReactNode => {
            if (!React.isValidElement(node)) {
                return node;
            }

            const nodeType = node.type;
            if (typeof nodeType === 'string' && (nodeType === 'h2' || nodeType === 'h3')) {
                const text = getNodeText(node);
                
                if (text) {
                    const id = slugify(text);
                    generatedHeadings.push({
                        level: nodeType === 'h2' ? 2 : 3,
                        text,
                        id,
                    });
                    // This key is important to avoid React warnings about cloning elements
                    // Fix for error on line 93: TypeScript cannot infer that intrinsic elements accept 'id'. 
                    // We cast the props to allow adding the id.
                    return React.cloneElement(node, { id, key: id } as any);
                }
            }

            // Fix for errors on lines 97, 98, 99: Cast props to safely access children and use spread.
            const props = node.props as { children?: React.ReactNode };
            if (props.children) {
                const newChildren = React.Children.map(props.children, processNode);
                return React.cloneElement(node, { ...(node.props as object) }, newChildren);
            }

            return node;
        };

        const contentWithIds = processNode(post.content);
        return { headings: generatedHeadings, contentWithIds };
    }, [post.content]);


    const TableOfContents = () => (
        <nav className="mb-12 p-6 bg-slate-50 border-l-4 border-blue-500 rounded-r-lg" aria-label="Table of contents">
            <h2 className="text-xl font-bold text-gray-800 mb-4">On This Page</h2>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
                        <a href={`#${heading.id}`} className="text-gray-600 hover:text-blue-600 hover:underline transition-colors">
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );

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
                            
                            {headings.length > 1 && <TableOfContents />}

                            <div className="prose prose-lg max-w-none text-gray-700">
                                {contentWithIds}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                                <span className="font-semibold text-gray-800">Share this post:</span>
                                <div className="flex space-x-3">
                                    <a href="#" aria-label="Share on Facebook" className="text-gray-500 hover:text-blue-600"><FacebookIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on LinkedIn" className="text-gray-500 hover:text-blue-700"><LinkedinIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on Instagram" className="text-gray-500 hover:text-pink-500"><InstagramIcon className="w-5 h-5"/></a>
                                </div>
                            </div>
                        </article>

                        <div className="lg:col-span-1">
                            <Sidebar allPosts={allPosts} navigate={navigate} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SingleBlogPostPage;