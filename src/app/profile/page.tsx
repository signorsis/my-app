"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {useState,useEffect} from 'react'

function Profile() {
  const router = useRouter();
  type userType={
    _id: string,
    email: string,
    username:string
}
  const logout = async (event: any) => {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("log out not successful ", error.message);
    }
  };
  const [user,setUser]=useState<userType>();
  const getUserDetail = async () => {
    try {
   const response= await axios.get('./api/users/me');
   setUser(response.data.user);

   
  
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen">
      <h1 className="text-xl/8">Profile</h1>
      { user &&  (<Link href={`profile/${user._id}`}> {user._id!} </Link> )}
      <button
        onClick={getUserDetail}
        className="bg-emerald-400 p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none hover:bg-emerald-600"
      >
        GetUserDetail
      </button>

      <button
        onClick={logout}
        className="bg-emerald-400 p-2 m-4 border rounded-lg border-gray-300 focus:outline-none hover:bg-emerald-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
