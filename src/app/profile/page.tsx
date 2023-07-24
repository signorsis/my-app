"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

function Profile() {
  const router=useRouter();
   const logout=async (event:any)=>{
    try {
      const response=await axios.get('api/users/logout')
    console.log(response.data);
      router.push('/login')
    } catch (error: any) {
      
    console.log("log out not successful ", error.message)
   }
  }
  return (
    <div className='flex flex-col justify-center items-center text-center min-h-screen'>
        <h1 className='text-xl/8'>Profile</h1>
        <button 
         onClick={logout }
        className='bg-emerald-400 p-2  border rounded-lg border-gray-300 focus:outline-none hover:bg-emerald-600'>
           Logout</button>
        </div>
  )

}

export default Profile