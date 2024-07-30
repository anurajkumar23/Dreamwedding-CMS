"use client"
import { useRouter } from "next/navigation"


export default function page() {
    const router = useRouter()
    router.push("/dashboard")
    
  return (
    <div>
     !!  Welcome Admin !!
    </div>
  )
}

