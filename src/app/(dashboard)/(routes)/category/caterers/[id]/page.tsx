import Caterer from '@/models/caterer'
import { connectToDB } from '@/utils/database'
import React from 'react'
import CatererForm from './CatererForm'

export default async function CatererPage({params}:{params: {id: string}}) {
  await connectToDB()



  const caterer = await Caterer.findById(params.id).lean();

  // if (caterer && caterer._id) {
  //   caterer._id = caterer._id.toString();
  // }


  return (
    <div className="text-white">
      <CatererForm initialData = {caterer} />
    </div>
  )
}
