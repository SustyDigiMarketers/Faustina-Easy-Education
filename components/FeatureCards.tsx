
import React from 'react';
import { GraduationCapIcon, UniversityIcon, BookOpenIcon } from './icons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-4 p-4 sm:p-6">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0 mb-3 sm:mb-0">
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
    </div>
    <div>
      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base mb-3 hidden sm:block">{description}</p>
      <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center sm:justify-start text-sm">
        Learn More <span className="ml-2">→</span>
      </a>
    </div>
  </div>
);

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <GraduationCapIcon />,
      title: 'Graduation',
      description: 'Educal University was established it is recognized.',
    },
    {
      icon: <UniversityIcon />,
      title: 'University Life',
      description: 'Educal University was established it is recognized.',
    },
    {
      icon: <BookOpenIcon />,
      title: 'Education',
      description: 'Educal University was established it is recognized.',
    },
  ];

  return (
    <div className="relative -mt-24 sm:-mt-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl grid grid-cols-3 divide-x divide-gray-200">
          {features.map((feature, index) => (
            <Card key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
