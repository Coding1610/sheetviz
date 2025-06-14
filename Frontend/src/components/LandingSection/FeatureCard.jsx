import React from 'react';
import { cn } from '@/lib/utils';

const FeatureCard = ({
  title,
  description,
  icon,
  delay = '0s',
  className
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover animate-fade-in",
        className
      )}
      style={{ animationDelay: delay }}
    >
      <div className="w-12 h-12 bg-brandpurplesoft/80 rounded-lg flex items-center justify-center mb-4">
        <div className="text-brand-purple">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;