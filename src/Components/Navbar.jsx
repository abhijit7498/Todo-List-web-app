import React from 'react'
const Navbar = () => {
  return (
    <div>
        <nav className='flex justify-between bg-violet-400 px-5 py-2'>
            <div>
                <span className='font-bold text-xl'> iTask</span> 
            </div>
            <ul className='flex gap-8'>
                <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Task</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar