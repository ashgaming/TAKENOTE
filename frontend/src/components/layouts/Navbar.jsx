import { Menu } from 'lucide-react'
import React from 'react'

const Navbar = ({toggleSidebar}) => {
  return (
     <nav className="bg-gray-800 p-4 flex items-center justify-between sticky top-0 z-20">
       <button
         onClick={toggleSidebar}
         className="lg:hidden text-white hover:text-gray-300 transition-colors"
       >
         <Menu size={24} />
       </button>
       <div className="text-white font-semibold">Active Chat</div>
       <div className="w-8"></div>
     </nav>
  )
}

export default Navbar
