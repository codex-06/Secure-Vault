import Link from 'next/link'
import React from 'react'
export default function PortfolioLink() {
    const arrow = "=>"
    return (
    <div>
        <Link href="https://codex-06.github.io/Aryan-Sharma-portfolio/" className='text-green-400 font-thin py-1 px-2 border rounded border-green-400 hover:bg-green-400 hover:text-white ml-6  '> Visit My Portfolio {arrow}</Link>
    </div>
  )
}
