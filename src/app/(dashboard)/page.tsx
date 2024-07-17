import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { BadgeIndianRupee, ShoppingBag, UserRound } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {

  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  const totalRevenue = 300;
  const totalOrders = 15;
  const totalCustomers = 20;


  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold text-white">Dashboard</p>
      <Separator className="bg-white my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Revenue</CardTitle>
            <BadgeIndianRupee  className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">₹ {totalRevenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}

export default DashboardPage;
