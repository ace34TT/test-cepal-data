import React from 'react';
import Link from 'next/link';
import { ShoppingBasket, User } from 'lucide-react';

const Navbar = () => {
  return (
      <nav className="w-full px-4 py-6">
        <div className="container mx-auto">
          <div className="bg-[#D9D9D9] rounded-full px-8 py-4 flex items-center justify-between shadow-sm">

            <Link href="/" className="text-xl font-medium text-gray-800 hover:opacity-80 transition">
              Logo
            </Link>

            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6 font-medium">
                <Link href="/collections" className="text-gray-700 hover:text-black transition">
                  Collections
                </Link>
                <Link href="/nouveautes" className="text-gray-700 hover:text-black transition">
                  Nouveautés
                </Link>
                <Link href="/a-propos" className="text-gray-700 hover:text-black transition">
                  À propos
                </Link>
              </div>

              <div className="flex items-center space-x-5 border-l border-gray-400 pl-6">
                <Link href="/panier" className="text-gray-800 hover:scale-110 transition-transform">
                  <ShoppingBasket size={24} strokeWidth={2.5} />
                </Link>
                <Link href="/profil" className="text-gray-800 hover:scale-110 transition-transform">
                  <User size={24} strokeWidth={2.5} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </nav>
  );
};

export default Navbar;