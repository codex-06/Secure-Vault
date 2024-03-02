import React from 'react'
import { Login, Navbar, LoginAndRegister, Footer } from '@/components'
import {Taster, Toaster} from "react-hot-toast"
import Image from 'next/image'

export default function Home() {
  return (
    <div >
      <Navbar>
        <LoginAndRegister/>
      </Navbar>
      <Toaster></Toaster>
      <div className='grid md:grid-cols-2 grid-cols-1 p-20 mb-'>
        <div className='hidden md:block px-20'>
          <Image src="/lock.png" alt="lock" width={500} height={500}/>
        </div>
        <div className='flex justify-end py-10'>
          <div style={{width : 500}}>
            <Login ></Login>
         </div>
        </div>
      </div>
      <div className='mt-32'>
        <Footer></Footer>

      </div>
    </div>
  )
}
