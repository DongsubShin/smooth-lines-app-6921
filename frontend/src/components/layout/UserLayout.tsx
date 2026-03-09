import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-[#1E3A5F] font-bold text-xl">Smooth Lines</Link>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-slate-800 hover:text-[#ED1C24] font-medium">Home</a>
              <a href="#services" className="text-slate-800 hover:text-[#ED1C24] font-medium">Services</a>
              <a href="#about" className="text-slate-800 hover:text-[#ED1C24] font-medium">About</a>
              <Link to="/booking" className="bg-[#ED1C24] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-colors">
                Book Now
              </Link>
            </div>
            <div className="md:hidden">
              <button type="button" className="text-slate-800">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Smooth Lines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;