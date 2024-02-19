"use client"
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, LogoutButton, Key,} from '@/components';
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
    <h1>hello</h1>
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
  </div>
)
}

