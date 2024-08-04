import { Separator } from '@/components/ui/separator'
import React from 'react'
import UsersPage from './UsersPage'

const UserPage = () => {
  return (
    <div className="px-8 py-10">
    <p className="text-2xl font-semibold text-white">Users Data</p>
    <Separator className="bg-white my-5" />
    <UsersPage/>
    </div>
  )
}

export default UserPage
