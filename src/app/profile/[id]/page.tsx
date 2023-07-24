import React from 'react'

function UserProfile({params}:any) {
  return (
    <div className='flex flex-col justify-center text-center min-h-screen'>
        <h1 className='text-xl/8'>Profile</h1>
        <p className='text-2xl m-2'>User Profile 
            <span className='ml-2 p-2 rounded bg-orange-400'>{params.id}</span>
        </p>
        </div>
  )
}

export default UserProfile