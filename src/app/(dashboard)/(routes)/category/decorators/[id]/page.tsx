import Decorator from '@/models/decorator';
import { connectToDB } from '@/utils/database';
import React from 'react';
import DecoratorForm from './DecoratorForm';

export default async function page({ params }: { params: { id: string } }) {
  await connectToDB();

  let decorator = null;

  if (params.id !== 'new') {
    decorator = await Decorator.findById(params.id).lean();
  }

  return (
    <div className="text-white">
      <DecoratorForm initialData={decorator} />
    </div>
  );
}
