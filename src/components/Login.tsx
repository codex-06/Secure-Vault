"use client"

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import cryptojs from "crypto-js"

export default function Login() {
    const router = useRouter();
    const [formData , setFormData] = useState({
      email : "",
      password : ""
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        console.log("form submitted", formData.email , formData.password);
        try {
          const hash =  await cryptojs.SHA256(formData.password);
          const hashedPassword = hash.toString(cryptojs.enc.Hex);
          const response = await axios.post("/api/users/login", {
            email : formData.email,
            password : hashedPassword
          });
          sessionStorage.setItem('passwordHash', hashedPassword);
          toast.success("Logged in successfully");
          router.push("/");
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
          setFormData({
            email : "",
            password : ""
          })
        }
        finally{
          setLoading(false)
        }

    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };



    
    return (

    <div className='px-10 py-10 bg-slate-100 rounded justify-center w-full '>

        <div className='my-8'>

            <h1 className='text-black text-2xl font-bold text-center'>Sign in to your account</h1>
            <p className='text-gray-500 text-center'>Dont have an account? <Link href="/signup" className='text-green-500 hover:underline hover:decoration-green-500'>Sign up</Link> </p>
        </div>
        
        <form onSubmit={handleSubmit} className='m-4 '>

            <label htmlFor="email" className='text-black '> Email address</label> <br />
            <input onChange={handleChange} type="email" value={formData.email} name="email" id="email"  className='px-2 border border-gray-300 rounded-sm w-full mb-2 leading-8 bg-inherit  text-black '/>
            <br />
            <label htmlFor="password" className='text-black mt-2 '> Password</label> <br />
            <input onChange={handleChange} type="password" value={formData.password} name="password" id="password"  className=' px-2 border border-gray-300 rounded-sm  w-full mb-4 leading-8 bg-inherit  text-black'/>
            <br />
            <button className='rounded bg-green-500 w-full leading-8' type="submit">{loading ? "Processing..." : "Log In"}</button>
        
        </form>

    </div>
  )
}

