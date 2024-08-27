import Caterer from '@/models/caterer'
import { connectToDB } from '@/utils/database'
import React from 'react'
import CatererForm from './CatererForm'

export default async function CatererPage({params}:{params: {id: string}}) {
  await connectToDB()

let caterer = null

if(params.id != 'new'){
  caterer = await Caterer.findById(params.id).lean();
}
  return (
    <div className="text-white">
      <CatererForm initialData = {caterer} />
    </div>
  )
}
