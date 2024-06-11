// import { redirect } from 'next/navigation';

// // import Navbar from '@/components/navbar'
// import { auth } from '@clerk/nextjs/server';


// export default async function DashboardLayout({
//   children,

// }: {
//   children: React.ReactNode
// }) {
//   const { userId } = auth();

//   if (!userId) {
//     redirect('/sign-in');
//   }

//   return (
//     <>
//       {/* <Navbar /> */}
//       hello world
//       {/* {children} */}
//     </>
//   );
// };

import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {

  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
    </div>
  )
}

export default DashboardPage;
