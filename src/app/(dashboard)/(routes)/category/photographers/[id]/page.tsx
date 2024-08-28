import Photographer from '@/models/photographer';
import { connectToDB } from '@/utils/database';
import React from 'react'
import PhotographerForm from './Photographer';


export default async function page({ params }: { params: { id: string } }) {
  await connectToDB();

  let photographer = null;

  if (params.id !== 'new') {
    photographer = await Photographer.findById(params.id).lean();
  }
  return (
    <div >
       <PhotographerForm initialData={photographer} />
    </div>
  )
}
