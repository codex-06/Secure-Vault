"use client"

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
import cryptojs from "crypto-js"

export default function SignUp() {

    const router = useRouter();
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };


    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try {
          
          const hash =  await cryptojs.SHA256(formData.password);
          const hashedPassword = hash.toString(cryptojs.enc.Hex);
          
          const response = await axios.post("/api/users/signup",{
            username : formData.username,
            email : formData.email,
            password : hashedPassword,
          })
          toast.success("User Signed up")
          console.log(response.data)
          //  toast.success("user Signed up successfully")
          setTimeout(()=> {
            router.push("/login")
          },1000)
        } catch (error) {
            console.log(error.message)
            setFormData({
              username: '',
              email: '',
              password: '',
            })
        }
        finally{
          setLoading(false);
        }
    }

    return (

    <div className='px-10 py-10 bg-slate-100 rounded justify-center w-full '>

        <div className='my-8'>

            <h1 className='text-black text-2xl font-bold text-center'>Sign in to your account</h1>
            <p className='text-gray-500 text-center'>Already have an account? <Link href="/login" className='text-green-500 hover:underline hover:decoration-green-500'>Log in</Link> </p>
        </div>
        
        <form onSubmit={handleSubmit} className='m-4 '>

            <label htmlFor="username" className='text-black '> User Name</label> <br />
            <input onChange={handleChange} type="text" value={formData.username} name="username" id="username"  className='px-2 border border-gray-300 rounded-sm w-full mb-2 leading-8 bg-inherit  text-black'/>
            <br />
            <label htmlFor="email" className='text-black '> Email address</label> <br />
            <input onChange={handleChange} type="email" value={formData.email} name="email" id="email"  className='px-2 border border-gray-300 rounded-sm w-full mb-2 leading-8 bg-inherit  text-black'/>
            <br />
            <label htmlFor="password" className='text-black mt-2 '> Password</label> <br />
            <input onChange={handleChange} type="password" value={formData.password} name="password" id="password"  className=' px-2 border border-gray-300 rounded-sm  w-full mb-4 leading-8 bg-inherit text-black'/>
            <br />
            <button className='rounded bg-green-500 w-full leading-8' type="submit">{loading?"Processing..." : "Sign Up"}</button>
        
        </form>

    </div>
  )
}

