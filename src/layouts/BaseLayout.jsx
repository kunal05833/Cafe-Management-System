import React from 'react';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default BaseLayout;