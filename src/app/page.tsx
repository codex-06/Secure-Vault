import React from 'react'
import { Login, Navbar, LoginAndRegister } from '@/components'
import {Taster, Toaster} from "react-hot-toast"

export default function Home() {
  return (
    <div className='relative'>
      <Navbar>
        <LoginAndRegister/>
      </Navbar>
        <Toaster></Toaster>
      <div className=' absolute right-32 top-60  w-4/12'>
        <Login></Login>
      </div>
        
    </div>
  )
}
