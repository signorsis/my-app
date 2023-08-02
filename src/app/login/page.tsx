"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import Loader from "../component/loaderSpinner";
import axios from "axios";

export default function Login () {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    
  });
  const [isLoading,setIsLoading]=React.useState(false);
  const [buttonDisabled,setButtonDisabled]=React.useState(false);
  const router=useRouter();
  
  const onLogin
   = async (event:any) => {
      try { 
        setIsLoading(true)
       const response= await axios.post('/api/users/login',user)
       console.log(response.data);
       router.push('/profile');
            
      } catch (error) {
        console.log("login not Successful",error);
        setIsLoading(false);
      }
      finally{
        setIsLoading(false)
      }
   };
   React.useEffect(()=>{ 
    if(user.email.length>3 && user.password.length>6)
    {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true)
    }

    },[user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {isLoading? <Loader/> : ""}
      <h1 className="mb-4 text-xl/8">Login
      </h1>
      <hr />
     
      <label htmlFor="email">Email </label>
      <input
        className="text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="email">password </label>
      <input
        className="text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
     <div className="flex flex-col item-center ">
     <button className=" bg-emerald-400 p-2 mb-4 mr-2 border border-gray-300 focus:outline-none rounded-lg focus:border-gray-600" 
      onClick={onLogin}
     > Login
     </button>
     <Link href="/signup" className="p-2 mb-4 mr-2 border border-gray-300 bg-amber-300 focus:outline-none rounded-lg focus:border-gray-600">Go here to Signup</Link>
     
     </div>
     </div>
  );
};

