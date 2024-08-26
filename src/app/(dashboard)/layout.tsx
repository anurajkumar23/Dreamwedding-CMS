import LeftSideBar from '@/components/layout/LeftSideBar';
import TopBar from '@/components/layout/TopBar';
import React, { ReactNode } from 'react';

interface DashboardLayout {
  children: ReactNode;
}

const UserLayout: React.FC<DashboardLayout> = ({ children }) => {
  return (
    <div className='flex flex-col  h-auto min-h-screen'>
      <LeftSideBar />
      <div className='flex-1 lg:ml-[250px]'>
        <TopBar />
        <main className=''>{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;
