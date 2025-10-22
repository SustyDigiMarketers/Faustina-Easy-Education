import React, { useState, useEffect } from 'react';
import StatsSection from './StatsSection'; // Re-use existing component
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from './icons';

const PageHeader = () => (
    <section className="relative h-56 sm:h-64 bg-gray-800 text-white">
        <img 
            src="https://picsum.photos/seed/about-banner/1920/400" 
            alt="University campus background" 
            className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
            <p className="mt-2 text-base sm:text-lg">Home / <span className="text-blue-300">About Us</span></p>
        </div>
    </section>
);

const AboutEduker = () => (
    <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
                <p className="text-blue-600 font-semibold mb-2">Our Story</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                    A Tradition of Excellence & Innovation
                </h2>
                <p className="text-gray-600 mb-4">
                    Founded in 1985, Eduker University has been dedicated to providing world-class education and fostering an environment of innovation and critical thinking. Our mission is to empower students to become leaders and problem-solvers in a rapidly changing world.
                </p>
                <p className="text-gray-600 mb-8">
                    From our humble beginnings, we have grown into a leading institution with a diverse student body from over 50 countries. Our commitment to academic excellence, research, and community service remains at the core of our identity.
                </p>
            </div>
            <div className="relative h-[400px] sm:h-[450px]">
                <img 
                    src="https://picsum.photos/seed/library/500/600" 
                    alt="University Library" 
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
                 <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-blue-600 text-white p-4 sm:p-6 rounded-lg shadow-xl w-48 sm:w-60">
                    <p className="text-4xl sm:text-5xl font-bold">35+</p>
                    <p className="mt-1 text-sm sm:text-base">Years Of Experience</p>
                </div>
            </div>
        </div>
    </section>
);

const facultyMembers = [
    { name: 'Dr. Evelyn Reed', title: 'Professor of Computer Science', avatar: 'https://i.pravatar.cc/150?u=faculty1' },
    { name: 'Dr. Samuel Chen', title: 'Head of Business Department', avatar: 'https://i.pravatar.cc/150?u=faculty2' },
    { name: 'Dr. Maria Garcia', title: 'Lead Arts & Humanities Researcher', avatar: 'https://i.pravatar.cc/150?u=faculty3' },
    { name: 'Dr. Ben Carter', title: 'Professor of Engineering', avatar: 'https://i.pravatar.cc/150?u=faculty4' },
];

const FacultySection = () => (
    <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <p className="text-blue-600 font-semibold mb-2">Expert Faculty</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    Meet Our Esteemed Professors
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {facultyMembers.map(member => (
                    <div key={member.name} className="text-center p-4 group">
                        <div className="relative inline-block">
                            <img src={member.avatar} alt={member.name} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-blue-600">{member.title}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// --- START: Gallery Section logic ---
interface GalleryImage {
    src: string;
    category: string;
    caption: string;
}

const galleryImages: GalleryImage[] = [
    { src: 'https://picsum.photos/seed/g1/500/400', category: 'campus', caption: 'A sunny day on the main campus quad.' },
    { src: 'https://picsum.photos/seed/g2/500/600', category: 'events', caption: 'Students at the annual welcome week concert.' },
    { src: 'https://picsum.photos/seed/g3/500/500', category: 'academics', caption: 'Collaborative study session in the library.' },
    { src: 'https://picsum.photos/seed/g4/500/700', category: 'campus', caption: 'The historic university clock tower.' },
    { src: 'https://picsum.photos/seed/g5/500/450', category: 'events', caption: 'Celebrating at the graduation ceremony.' },
    { src: 'https://picsum.photos/seed/g6/500/550', category: 'academics', caption: 'Professor delivering a lecture in the main hall.' },
    { src: 'https://picsum.photos/seed/g7/500/650', category: 'campus', caption: 'Autumn colors across the university grounds.' },
    { src: 'https://picsum.photos/seed/g8/500/500', category: 'events', caption: 'Teamwork at the annual hackathon event.' },
    { src: 'https://picsum.photos/seed/g9/500/400', category: 'campus', caption: 'Student residences in the evening light.' },
    { src: 'https://picsum.photos/seed/g10/500/750', category: 'academics', caption: 'Hands-on learning in the science lab.' },
    { src: 'https://picsum.photos/seed/g11/500/500', category: 'events', caption: 'Guest speaker series in the auditorium.' },
    { src: 'https://picsum.photos/seed/g12/500/600', category: 'campus', caption: 'The university sports complex and fields.' },
];

const filters = [
    { name: 'All', value: 'all' },
    { name: 'Campus Life', value: 'campus' },
    { name: 'Events', value: 'events' },
    { name: 'Academics', value: 'academics' },
];

const GallerySection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const filteredImages = activeFilter === 'all'
        ? galleryImages
        : galleryImages.filter(image => image.category === activeFilter);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setSelectedImageIndex(null);
    };

    const showNextImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
        }
    };

    const showPrevImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, selectedImageIndex, filteredImages]);
    
    useEffect(() => {
        closeLightbox();
    }, [activeFilter]);

    return (
        <>
            <section id="gallery" className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold mb-2">Campus Moments</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            Our Gallery
                        </h2>
                    </div>
                    <div className="flex justify-center flex-wrap space-x-2 sm:space-x-4 mb-12">
                        {filters.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-4 py-2 rounded-md font-semibold text-sm sm:text-base transition-colors duration-300 ${
                                    activeFilter === filter.value
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter.name}
                            </button>
                        ))}
                    </div>
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
                        {filteredImages.map((image, index) => (
                            <div 
                                key={index} 
                                className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer mb-4 sm:mb-6 [break-inside:avoid]"
                                onClick={() => openLightbox(index)}
                            >
                                <img 
                                    src={image.src} 
                                    alt={`Gallery image ${index + 1} from ${image.category} category`} 
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {isLightboxOpen && selectedImageIndex !== null && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={filteredImages[selectedImageIndex].src}
                            alt={filteredImages[selectedImageIndex].caption || `Enlarged gallery image ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 text-center rounded-b-lg">
                            <p>
                                {filteredImages[selectedImageIndex].caption || `Image ${selectedImageIndex + 1}`}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close lightbox"
                    >
                        <XIcon className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition-colors"
                        aria-label="Previous image"
                    >
                        <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8"/>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); showNextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition-colors"
                        aria-label="Next image"
                    >
                        <ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8"/>
                    </button>
                </div>
            )}
        </>
    );
};
// --- END: Gallery Section logic ---

// Fix: The component was missing its main export and structure. This combines the sections into a single page component and adds the default export.
const AboutPage: React.FC = () => {
    return (
        <main>
            <PageHeader />
            <AboutEduker />
            <StatsSection />
            <FacultySection />
            <GallerySection />
        </main>
    );
};

export default AboutPage;

// Add styles for lightbox animation
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('fade-in-animation-style-about')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'fade-in-animation-style-about';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
