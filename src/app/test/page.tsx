import React from 'react'

export default function page() {
  return (
    <div>
       <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-200 p-4">Item 1</div>
      <div className="bg-gray-200 p-4">Item 2</div>
      <div className="bg-gray-200 p-4">Item 3</div>
      <div className="bg-gray-200 p-4">Item 1</div>
      <div className="bg-gray-200 p-4">Item 2</div>
      
      {/* Add more grid items dynamically as needed */}
    </div>
    </div>
  )
}
