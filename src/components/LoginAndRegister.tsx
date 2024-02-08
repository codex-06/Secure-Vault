import React from 'react'
import Link from 'next/link'

export default function LoginAndRegister() {
  return (
    <div className='float-right'>
        <Link href={"/signup"} className='text-green-400 text-lg  hover:underline hover:decoration-green-400'>Signup</Link>
        <Link href={"/login"} className='text-green-400 font-thin py-1 px-2 border rounded border-green-400 hover:bg-green-400 hover:text-white ml-6  '> Login</Link>
    </div>
  )
}
