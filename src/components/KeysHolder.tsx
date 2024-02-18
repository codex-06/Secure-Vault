import React from 'react';
import { Key } from '.';

export default function KeysHolder(props) {
  return (
    <div className=''>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 justify-items-center w-4/6 mx-auto'>
      {props.vault.map((item, index) => (
        
        <Key key={index} index={index} title={item.title} email={item.email} password={item.password} remove = {props.remove}/>

      ))}
    </div>
  </div>
  );
}
