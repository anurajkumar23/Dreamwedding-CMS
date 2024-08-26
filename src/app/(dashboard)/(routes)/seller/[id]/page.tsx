import { connectToDB } from '@/utils/database'
import React from 'react'
import SellerForm from './SellerForm'
import Seller from '@/models/seller'

export default async function SellerPage({ params }: { params: { id: string }}) {

  await connectToDB()

  const seller = await Seller.findById(params.id).lean();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
     <SellerForm initialData = {seller} />
     </div>
    </div>
  )
}
