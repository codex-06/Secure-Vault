"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import toast, {Toaster} from "react-hot-toast"
import axios from 'axios';

export default function LogoutButton() {
    const router = useRouter();
    async function handleLogout() {
        console.log('logout initiated');
        try {
            const response = await axios.get('api/users/logout');
            console.log('logout successful');
            toast.success('Log out successful');
           // setTimeout(() => router.push('/'), 1000);
        } catch (error) {
            console.log(error.message);
            toast.error(error);
        }
    }

    return (
        <div>
            <Toaster/>
            <button onClick={handleLogout} className='text-green-400 font-thin py-1 px-2 border rounded border-green-400 hover:bg-green-400 hover:text-white ml-6  '> Log Out</button>
        </div>
    )
}


