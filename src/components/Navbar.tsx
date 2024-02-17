"use client"
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className='flex px-6 lg:px-32 py-3 relative bg-black'>
        {/* Hamburger menu button */}
        <div className="lg:hidden mx-2">
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-6 h-6 fill-white"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </svg>
          </button>
        </div>
        <h1 className='text-2xl font-extrabold italic mr-6 text-green-400'> Secure-Vault</h1>
        {/* Navbar links */}
        <div className={`lg:flex flex-grow items-center ${showMenu ? '' : 'hidden'}`}>
          <Link href="/" className='text-lg font-light px-4 mt-1'> Home</Link>
          <h1 className='text-lg font-light px-4 mt-1'> About</h1>
          <h1 className='text-lg font-light px-4 mt-1'> Contact</h1>
        </div>
          <div className='ml-auto'>
            {children}
          </div>
      </div>
    </>
  );
}
