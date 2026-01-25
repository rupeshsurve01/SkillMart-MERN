import React from 'react'
import  { Link } from 'react-router-dom'

const Navbar = () => {
  return (
          <nav>
        <div className="flex gap-10 justify-end p-4 text-black text-2xl bg-cyan-200">
            <Link className="cursor-pointer hover:underline" to='/'>Home</Link>
            <Link className="cursor-pointer hover:underline" to='/contact'>Contact Us</Link>
            <Link className="cursor-pointer hover:underline" to='/login'>Log out</Link>  
        </div>
      </nav>
  )
}

export default Navbar
