  "use client"
  import { useRouter } from 'next/navigation'
  import React, { useCallback, useEffect, useState } from 'react';
  import { Navbar, LogoutButton, KeyHolder, Key } from '@/components';
  import toast, { Toaster } from 'react-hot-toast';
  import { handleLogout } from './controllers/logout.controller';
  import axios from 'axios';
  import crypto from 'crypto';
 


  export default function Page() {
      const router = useRouter();
      const [vault, setVault] = useState([]);
      const [encryptedVault, setEncryptedVault] = useState("");
      const [key, setKey] = useState("");
      const [iv, setIV] = useState("");

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

      }, [router]);

      useEffect(() => {
          if (iv && key && encryptedVault) {
              try {
                  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
                  let decryptedData = decipher.update(encryptedVault, 'hex', 'utf-8');
                  decryptedData += decipher.final('utf-8');
                  setVault(JSON.parse(decryptedData));
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



    return (
      <div>
        <Navbar>
          <LogoutButton/>
        </Navbar>
          <Toaster/>
        <h1 className='text-2xl text-black font-medium mt-4 mb-6'>
          Aryans Vault
        </h1>

        <div className='mt-8 grid grid-cols-1 md:space-x-14 md:grid-cols-2 space-y-6 md:space-y-0 mx-10 '>
          <div className=' space-y-6 grid md:justify-items-end justify-items-center'>
            {vault.slice(0, vault.length/2).map((item, index) => (
              <div key={index}>
                <Key title={item.title} email={item.email} password={item.password} />
              </div>
            ))}
          </div>

          <div className='space-y-6 grid md:justify-items-start justify-items-center'>
            {vault.slice(vault.length/2).map((item, index) => (
              <div key={index}>
                <Key title={item.title} email={item.email} password={item.password} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={saveVault} className='fixed  text-black bg-orange-600  rounded w-6'>
        <svg className=' fill-white w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        </button>
      </div>
    )
  }
