import React from 'react';
import heroImg from "../assets/home.jpeg";
import FeatureHighlights from './Featured';




const Home = () => (
  <>
    <div className="min-h-screen bg-cover bg-center flex items-center justify-start relative" style={{ backgroundImage: `url(${heroImg})` }}>
    {/* Overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    {/* Content */}
    <div className="relative text-left ml-24 p-8 max-w-xl space-y-6 z-10">
      <h1 className="text-white text-6xl font-extrabold leading-tight">
        Rent Umbrellas, <span className="text-purple-400">Rain or Shine</span>!
      </h1>
      <p className="text-white text-lg mt-4">
        Convenient, affordable umbrella rentals from kiosks near you. Stay dry and stylish, no matter the weather.
      </p>
      <div className="mt-6">
        <button className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
          Start Renting Now
        </button>
      </div>
    </div>
  </div>

  <FeatureHighlights/>
  </>
);

export default Home;
