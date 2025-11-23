import React from 'react';
import { UniversityIcon, BookOpenIcon, MailIcon } from './icons';
import { Page } from '../types';

interface FeatureCardsProps {
    navigate: (page: Page) => void;
    onAdmissionClick: () => void;
}

interface CardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ icon, title, onClick }) => (
  <div 
    onClick={onClick}
    className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-center sm:space-x-4 p-4 sm:p-6 cursor-pointer bg-white hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
  >
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0 mb-3 sm:mb-0 shadow-sm">
      {React.cloneElement(icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
    </div>
    <h3 className="text-base sm:text-xl font-bold text-gray-800 group-hover:text-blue-700">{title}</h3>
  </div>
);

const FeatureCards: React.FC<FeatureCardsProps> = ({ navigate, onAdmissionClick }) => {
  const features = [
    {
      icon: <BookOpenIcon />,
      title: 'Topics',
      onClick: () => navigate('courses'),
    },
    {
      icon: <UniversityIcon />,
      title: 'Admission',
      onClick: onAdmissionClick,
    },
    {
      icon: <MailIcon />,
      title: 'Contact',
      onClick: () => navigate('contact'),
    },
  ];

  return (
    <div className="relative -mt-24 sm:-mt-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl grid grid-cols-3 divide-x divide-gray-200 overflow-hidden border border-gray-100">
          {features.map((feature, index) => (
            <Card key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;