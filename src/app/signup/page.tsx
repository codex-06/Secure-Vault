import React from 'react'
import {Navbar, LoginAndRegister, SignUp } from '@/components'
import { Toaster } from 'react-hot-toast'

export default function page() {
  return (
    <div>
        <Toaster></Toaster>
        <Navbar>
          <LoginAndRegister/>
        </Navbar>

        <div className='w-4/12 mx-auto mt-14'>
          <SignUp/>
        </div>
    </div>
  )
}
