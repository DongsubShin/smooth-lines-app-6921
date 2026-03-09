import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-[#F59E0B] text-sm font-bold mb-4 uppercase tracking-wider">
                Premium Grooming Experience
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Precision in Every <span className="text-[#ED1C24]">Stroke.</span> Confidence in Every Cut.
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Experience the art of modern grooming. From classic fades to precision beard trims, we bring out your best look with expert care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking" className="bg-[#ED1C24] text-white px-8 py-4 rounded-md font-bold text-center hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                  Book Appointment
                </Link>
                <a href="#services" className="px-8 py-4 rounded-md font-bold text-slate-700 border border-slate-200 text-center hover:bg-white transition-all">
                  View Services
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 relative">
              <div className="aspect-square rounded-2xl bg-slate-200 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800" 
                  alt="Barber at work" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">5-Star Rated</p>
                    <p className="text-xs text-slate-500">By 500+ Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;