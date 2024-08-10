// components/UserLayout.tsx
import LeftSideBar from '@/components/layout/LeftSideBar';
import TopBar from '@/components/layout/TopBar';
import React, { ReactNode } from 'react';

interface DashboardLayout {
  children: ReactNode;
}

const UserLayout: React.FC<DashboardLayout> = ({ children }) => {
  return (
    <div className='flex max-lg:flex-col'>
      <LeftSideBar />
      <TopBar/>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
