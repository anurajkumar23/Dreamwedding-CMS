import React, { useState } from 'react'
import { connectToDB } from "@/utils/database";
import Seller from '@/models/seller';
import Pendingblock from './pendingblock';
import { SellerInterface } from '@/interfaces/seller';

export default async function Page() {
    await connectToDB()
    
    const sellers:SellerInterface[] = await Seller.find({ status: "Pending" }).sort({ createdAt: -1 });

    console.log(sellers,"dataseller")
  return (
   
  <div><Pendingblock data={sellers}/></div>
  )
}
