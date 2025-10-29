<<<<<<< HEAD
// src/components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
=======
import React from 'react';
import { cn } from '../../utils/cn';

const LoadingSpinner = ({ size = 'medium', className }) => {
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

<<<<<<< HEAD
  const spinner = (
    <div className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      {spinner}
=======
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className={cn(
        "border-4 border-primary/20 border-t-primary rounded-full animate-spin",
        sizeClasses[size]
      )} />
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    </div>
  );
};

export default LoadingSpinner;