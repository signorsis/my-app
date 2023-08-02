"use client"
import axios from 'axios'
import React from 'react'
import {useEffect,useState,useCallback} from 'react'
export default function Verify () {
    const [error,setError]= useState(false)
    const [token,setToken]= useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifyUserEmail=async()=>{
      try {
        const response=await axios.post('/api/users/verify',{token});
        console.log(response.data.message);
        

      } catch (error:any) {
        setError(error);
        console.log(error.message);
        
      }
    }

    useEffect(()=>{
    const urlToken=window.location.search.split("=")[1];
    setToken(urlToken || "");     

    },[]);

    useEffect(()=>{
         if(token.length>0) 
         {verifyUserEmail();}
      console.log("hi");
      
      },[verifyUserEmail,token]);



    return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
    <h1>verification page</h1>
    
    </div>
  )
}

 