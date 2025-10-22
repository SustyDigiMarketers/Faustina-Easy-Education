
import React from 'react';
import { GlobeIcon, LaptopIcon, UsersIcon, LibraryIcon } from './icons';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left p-4">
    <div className="text-blue-600 mb-3 sm:mb-0 sm:mr-4">
      {React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10 sm:w-12 sm:h-12" })}
    </div>
    <div>
      <p className="text-3xl sm:text-4xl font-bold text-blue-900">{value}</p>
      <p className="text-gray-600 text-sm sm:text-base">{label}</p>
    </div>
  </div>
);

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <GlobeIcon />,
      value: '3+',
      label: 'Years of Language Education Experience',
    },
    {
      icon: <LaptopIcon />,
      value: '99+',
      label: 'Innovative Foreign Online Courses',
    },
    {
      icon: <UsersIcon />,
      value: '10+',
      label: 'Qualified Teachers and language experts',
    },
    {
      icon: <LibraryIcon />,
      value: '11+',
      label: 'Learners Enrolled in Educal Courses',
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;