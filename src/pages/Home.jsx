import React from 'react';
import heroImg from '../assets/hero.avif';
import FeatureHighlights from './Featured';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    {/* Hero Section */}
    <div
      className="min-h-screen bg-cover bg-center flex items-center 
                 justify-center lg:justify-start relative px-4 sm:px-6"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative p-6 md:p-12 lg:ml-24 max-w-xl space-y-6 z-10 text-center lg:text-left">
        <h1 className="text-white   text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Rent Umbrellas, <span className="text-purple-400">Rain or Shine</span>!
        </h1>
        <p className="text-white text-md   md:text-lg mt-2 md:mt-4">
          Convenient, affordable umbrella rentals from kiosks near you. Stay dry and stylish, no matter the weather.
        </p>
        <div className="mt-4 md:mt-6">
          <Link to={'/payment'}> {/* Change route from '/rent' to '/payment' */}
            <button className="bg-purple-600 text-[white] px-5 md:px-8 py-2 md:py-3 rounded-full shadow-lg 
                     hover:bg-purple-700 transition-transform transform hover:scale-105">
              Start Renting Now
            </button>
          </Link>

        </div>
      </div>
    </div>

    {/* Feature Highlights Section */}
    <FeatureHighlights />
  </>
);

export default Home;
