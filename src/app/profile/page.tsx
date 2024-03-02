"use client"
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, LogoutButton, Key, Modal} from '@/components';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import crypto from 'crypto';

export default function Page() {
  const router = useRouter();
  const [vault, setVault] = useState([]);
  const [encryptedVault, setEncryptedVault] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIV] = useState("");
  const [maxId , setMaxId] = useState(-1);
  const [modalOpen, SetModalOpen] = useState(false);
  const handleLogout = useCallback(async () => { // Memoize handleLogout
    console.log('logout initiated');
    try {
        const response = await axios.get('api/users/logout');
        console.log('logout successful');
        router.push('/')
    } catch (error) {
        console.log(error.message);
        toast.error(error);
    }
}, [router]); // Include router as a dependency

  useEffect(() => {
    async function fetchData(passwordHash) {
          try {
            const res = await axios.get("/api/vault");
            const { iv: ivData, salt, vaultContent } = res.data;
            
            const translatedIV = Buffer.from(ivData, 'base64');
            setIV(translatedIV);
            setEncryptedVault(vaultContent);
            
            crypto.pbkdf2(passwordHash, salt, 1000, 32, 'sha256', (error, derivedKey) => {
              if (error) {
                console.log(error.message);
                throw error;
              } else {
                      setKey(derivedKey);
                      console.log("Key derived successfully");
                    }
                  });
                } catch (error) {
                  console.log(error.message);
              toast.error(error.message);
          }
      }
      const passwordHash = sessionStorage.getItem("passwordHash");
      if(! passwordHash){
        handleLogout()
      }
      else{
        fetchData(passwordHash);
      }

  },[handleLogout]);

  useEffect(() => {
      if (iv && key && encryptedVault) {
          try {
              const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
              let decryptedData = decipher.update(encryptedVault, 'hex', 'utf-8');
              decryptedData += decipher.final('utf-8');
              decryptedData =JSON.parse(decryptedData);
              decryptedData.map((element, index)=>{
                element.id = index;
              })
              setMaxId(decryptedData.length)
              setVault(decryptedData)
              console.log(decryptedData)
              toast.success("Vault decrypted successfully");
          } catch (error) {
              console.log(error.message);
              toast.error("Failed to decrypt vault");
          }
      }
  }, [iv, key, encryptedVault]);

const saveVault = async () => {
    try {
        const vaultData = JSON.stringify(vault);
        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        let encryptedData = cipher.update(vaultData, 'utf8', "hex");
        encryptedData += cipher.final("hex");
        
        await axios.put("/api/vault", { encryptedData });
        toast.success("Vault saved successfully");
    } catch (error) {
        toast.error(error.message);
        console.log(error.message);
    }
};

function append(){
  console.log("appending started");
  const newId = maxId + 1; // Generate a new ID
  setMaxId(newId); 
  const newElement = {
    email: "",
    title: "",
    password: "",
    id : maxId,
  };
  setVault((previousVault)=> [newElement,...vault])
  console.log(vault)
}


async function remove(id, title) {
    await setVault(previousVault => previousVault.filter(item => item.id !== id));
    toast.success("Deleted " + title)
    // saveVault();
}

function handlechange(id, target , value){
  const updatedArray = vault.map(obj => {
    if (obj.id === id) {
        return { ...obj, [target] :value }; // Update the object with new properties
    } else {
        return obj; // Return the original object if ID doesn't match
    }
  });
  setVault(updatedArray);
  console.log(updatedArray);
}




return (
  <div>
    <Navbar>
      <LogoutButton/>
    </Navbar>
      <Toaster/>
    <h1 className='text-2xl text-black font-medium mt-4 mb-6'>
      Aryans Vaults
    </h1>
    <Modal isOpen={modalOpen} onClose={()=>{SetModalOpen(!modalOpen)}}/>
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 justify-items-center w-4/6 mx-auto'>
        {vault.map((item, index) => (
          
          <Key id ={item.id}  key={item.id} index={index} keyData={item} remove = {remove} change={handlechange}/>

        ))}
      </div>
  </div>
    
    <button onClick={append} className='fixed left-10 top-64 text-black bg-orange-600  rounded w-10 '>
      <svg className='fill-white w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
    </button>

    <button onClick={saveVault} className='fixed left-10 top-80 text-black bg-purple-600  rounded w-10'>
    <svg className='w-10 p-1  fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
    </button>

    <button onClick={()=>{SetModalOpen(!modalOpen)}} className='fixed left-10 top-96 text-black bg-teal-900 rounded w-10'>
      <svg className='w-10 py-2 px-1 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
    </button>
  </div>
)
}

