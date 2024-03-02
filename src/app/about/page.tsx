// AboutPage.js

import React from 'react';
import { Navbar } from '@/components';
export default function page(){
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-4">About Secure-Vault</h1>
      <p className="text-lg mb-4">
        Secure-Vault is a resilient password manager and generator built using React, Next.js, and MongoDB.
      </p>
      <p className="text-lg mb-4">
        The project implements industry-standard security measures to ensure the safety of user data.
        It utilizes PBKDF2 for cryptographic key generation, providing robust security against potential threats.
        Additionally, user data is protected with AES256 encryption, further fortified by a bcrypt-protected master key.
      </p>
      <p className="text-lg mb-4">
        One of the key features of Secure-Vault is its use of Next.js, which allows rendering components on the server side.
        This results in decreased load times, enhancing the overall user experience by approximately 20%.
      </p>
      <div className="mt-8">
        <a 
          href="https://github.com/codex-06/Secure-Vault" 
          className="text-blue-600 font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to GitHub Repository
        </a>
      </div>
    </div>
    </>
  );
};

