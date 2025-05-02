'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
   const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        
        <Link href="/" className="text-xl font-bold">
          Inventory Tracker
        </Link>

        
        <div className="space-x-6 hidden md:flex">
          <Link href="/" className= {`hover:text-gray-300 ${pathname === '/' ? 'text-blue-400' : ''}`}>
            Dashboard
          </Link>
          <Link href="/items" className= {`hover:text-gray-300 ${pathname === '/items' ? 'text-blue-400' : ''}`}>
            Items
          </Link>
          <Link href="/additem" className= {`hover:text-gray-300 ${pathname === '/additem' ? 'text-blue-400' : ''}`}>
            Add Item
          </Link>
          <Link href="/categories" className= {`hover:text-gray-300 ${pathname === '/categories' ? 'text-blue-400' : ''}`}>
            Categories
          </Link>
        </div>

        
      </div>
    </nav>
  );
}

export default Navbar;
