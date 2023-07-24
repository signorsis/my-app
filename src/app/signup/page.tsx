"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../component/loaderSpinner";
import toast from "react-hot-toast";
const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSignup = async (event: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data.message);

      router.push("/login");
      // if (response.data.error) {
      //   throw response.data.error;
      // }
    } catch (error: any) {
      console.log("unsuccessful signup ", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 3 &&
      user.username.length > 3 &&
      user.password.length > 6
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading ? <Loader /> : ""}
      <h1 className="mb-4 text-xl/8">Signup</h1>
      <hr />
      <label htmlFor="username">username </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">Email </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="email">password </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <div className="flex flex-row item-center ">
        <button
          className="bg-amber-300  p-2 mb-4 mr-2 border border-gray-300 focus:outline-none rounded-lg focus:border-gray-600"
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          Signup here
        </button>
        <Link
          href="/login"
          className="  bg-emerald-400  p-2 mb-4 ml-2 border border-gray-300 focus:outline-none rounded-lg focus:border-gray-600"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};
export default Signup;
