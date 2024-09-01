import Decorator from '@/models/decorator';
import { connectToDB } from '@/utils/database';
import React from 'react';
import DecoratorForm from './DecoratorForm';
import { DecoratorDocument } from '@/interfaces/decorators';
import PhotoForm from "./PhotoForm";

export default async function page({ params }: { params: { id: string } }) {
  await connectToDB();
  

  let decorator:DecoratorDocument ;

  if (params.id !== 'new') {
    decorator = await Decorator.findById(params.id).lean();
    if(decorator){
      decorator={...decorator,_id:decorator._id.toString()}
    }
  }

  return (
    <div >
      {decorator &&  (
        <>
          <DecoratorForm initialData={decorator} />
          <PhotoForm initialPhotos={decorator.photos}  decoratorId={decorator._id}/>
        </>
      )}
    </div>
  );
}
