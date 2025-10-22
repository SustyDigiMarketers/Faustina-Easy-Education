import React, { useState } from 'react';
import { StarIcon, PlayCircleIcon, PlusIcon, MinusIcon } from './icons';
import { 
    DesignIcon, 
    ManagementIcon, 
    ProgrammingIcon, 
    BusinessIcon, 
    MusicIcon, 
    FinanceIcon, 
    AccountingIcon, 
    WritingIcon 
} from './icons';

const CoursesHero: React.FC = () => {
    return (
        <section className="bg-[#0e1f3e] text-white pt-16 sm:pt-20 pb-10 md:pb-24 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wave-grid.png')] opacity-5"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 z-10 relative">
                <div className="text-center md:text-left">
                    <p className="text-sm font-bold text-yellow-400 mb-2 tracking-wide">Education Goal</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                        Free online courses from the experts.
                    </h1>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                        Presenting Academy, the tech school of the future.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto">
                            Explore Courses
                        </button>
                        <button className="flex items-center font-semibold hover:text-yellow-300 transition-colors">
                            <PlayCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 mr-2 text-white" />
                            <span>Watch it Now</span>
                        </button>
                    </div>
                </div>
                <div className="relative h-full flex justify-center items-end order-first md:order-last">
                     <img 
                        src="https://i.ibb.co/6rDSgG3/hero-student.png"
                        alt="A smiling student with a backpack and notebook" 
                        className="max-w-xs sm:max-w-sm md:max-w-md w-full"
                    />
                </div>
            </div>
             {/* Decorative elements */}
            <div className="absolute top-1/4 left-10 w-4 h-4 bg-yellow-400 transform rotate-45 opacity-50 hidden md:block"></div>
            <div className="absolute top-20 right-1/4 w-6 h-6 bg-cyan-400 rounded-full opacity-50 hidden md:block"></div>
        </section>
    );
};

const PartnersSection: React.FC = () => {
    const partnerLogos = ['pencil', 'YBullFit', 'sixbase', 'pelican', 'AQUA', 'insight'];
    return (
        <div className="bg-white py-8 relative md:-mt-16 z-20 shadow-lg rounded-lg mx-4 md:mx-auto max-w-6xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-x-12 gap-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-x-12 gap-y-4">
                        <div className="text-center sm:text-left">
                            <h3 className="font-bold text-lg text-gray-800">Tutorgo</h3>
                            <p className="text-sm text-gray-500">Join over 1490+ partners</p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex text-yellow-400">
                                <StarIcon className="w-5 h-5" />
                                <StarIcon className="w-5 h-5" />
                                <StarIcon className="w-5 h-5" />
                                <StarIcon className="w-5 h-5" />
                                <StarIcon className="w-5 h-5 text-gray-300" />
                            </div>
                            <div className="ml-2 text-left">
                                <p className="font-semibold text-gray-700 text-sm">4.5 Star Rating</p>
                                <p className="text-xs text-gray-500">(20+ Review)</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-4 items-center w-full lg:w-auto">
                        {partnerLogos.map(logo => (
                            <span key={logo} className="font-serif text-2xl text-gray-400 font-semibold text-center">{logo}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface Topic {
    title: string;
    courses: string;
    icon: React.ReactNode;
    color: string;
}

const topics: Topic[] = [
    { title: 'Design', courses: '400+ Course', icon: <DesignIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-red-100 text-red-500' },
    { title: 'Management', courses: '400+ Course', icon: <ManagementIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-blue-100 text-blue-500' },
    { title: 'Programming', courses: '400+ Course', icon: <ProgrammingIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-red-100 text-red-500' },
    { title: 'Business', courses: '400+ Course', icon: <BusinessIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-green-100 text-green-500' },
    { title: 'Audio + Music', courses: '400+ Course', icon: <MusicIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-green-100 text-green-500' },
    { title: 'Finance', courses: '400+ Course', icon: <FinanceIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-purple-100 text-purple-500' },
    { title: 'Accounting', courses: '400+ Course', icon: <AccountingIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-yellow-100 text-yellow-500' },
    { title: 'Content Writing', courses: '400+ Course', icon: <WritingIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-yellow-100 text-yellow-500' },
];

const TopicCard: React.FC<Topic> = ({ title, courses, icon, color }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${color}`}>
                {icon}
            </div>
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{courses}</p>
        </div>
    )
}

const PopularTopicsSection: React.FC = () => {
    return (
         <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Popular Topic, Which are Most <br className="hidden sm:block"/> Favourite To Students
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {topics.map(topic => <TopicCard key={topic.title} {...topic} />)}
                </div>
            </div>
        </section>
    )
}

const faqData = [
    {
        question: "What are the admission requirements?",
        answer: "Admission requirements vary by program. Generally, we require a completed application form, official transcripts, letters of recommendation, and a personal statement. Some programs may have additional requirements like portfolios or standardized test scores."
    },
    {
        question: "Can I apply for financial aid or scholarships?",
        answer: "Yes, we offer a variety of financial aid options, including scholarships, grants, and student loans. We encourage all prospective students to visit our financial aid office's website to explore the opportunities available and submit the necessary forms."
    },
    {
        question: "What is campus life like?",
        answer: "Our university boasts a vibrant and diverse campus life with over 100 student clubs and organizations, regular events, sports teams, and cultural festivals. There's always something happening, providing ample opportunities to get involved, make new friends, and develop new skills."
    },
    {
        question: "Do you offer online or remote learning options?",
        answer: "Absolutely. We offer a wide range of fully online and hybrid programs for both undergraduate and graduate students. Our flexible learning options are designed to accommodate the needs of students from all walks of life, allowing you to learn from anywhere in the world."
    }
];

const FaqSection: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-semibold mb-2">FAQ</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left p-6 font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                                aria-expanded={openFaq === index}
                            >
                                <span>{faq.question}</span>
                                {openFaq === index ? <MinusIcon className="w-5 h-5 text-blue-600" /> : <PlusIcon className="w-5 h-5 text-gray-500" />}
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-6 pt-0 text-gray-600">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CoursesPage: React.FC = () => {
    return (
        <main className="bg-slate-50">
            <CoursesHero />
            <PartnersSection />
            <PopularTopicsSection />
            <FaqSection />
        </main>
    );
};

export default CoursesPage;