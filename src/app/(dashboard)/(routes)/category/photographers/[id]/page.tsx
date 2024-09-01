import Photographer from '@/models/photographer';
import { connectToDB } from '@/utils/database';
import React from 'react'
import PhotographerForm from './Photographer';
import { PhotographerDocument } from '@/interfaces/photographers';
import PhotoForm from './PhotoForm';


export default async function page({ params }: { params: { id: string } }) {
  await connectToDB();

  let photographer:PhotographerDocument | null = null;

  if (params.id !== 'new') {
    photographer = await Photographer.findById(params.id).lean();
  }
  if (params.id !== 'new') {
    photographer = await Photographer.findById(params.id).lean();
    if(photographer){
      photographer={...photographer,_id:photographer._id.toString()}
    }
  }
  return (
    <div >
    {photographer &&  (
      <>
        <PhotographerForm initialData={photographer} />
        <PhotoForm initialPhotos={photographer.photos}  photographerId={photographer._id}/>
      </>
    )}
  </div>
  )
}
