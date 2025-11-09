import React from 'react';
import { GraduationCapIcon, UniversityIcon, BookOpenIcon } from './icons';

interface FeatureCardProps {
  // Fix: Specify SVG props for the icon to allow className to be passed via cloneElement.
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
}

const Card: React.FC<FeatureCardProps> = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-center sm:space-x-4 p-4 sm:p-6">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0 mb-3 sm:mb-0">
      {React.cloneElement(icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
    </div>
    <h3 className="text-base sm:text-xl font-bold text-gray-800">{title}</h3>
  </div>
);

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <GraduationCapIcon />,
      title: 'Graduation',
    },
    {
      icon: <UniversityIcon />,
      title: 'Skillsup',
    },
    {
      icon: <BookOpenIcon />,
      title: 'Education',
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