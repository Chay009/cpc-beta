import React from 'react';
import Link from 'next/link';



const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md  px-16 py-4 flex justify-between items-center h-[7vh]">
      <Link href="/" className="text-2xl font-bold flex items-center">
        <div className="w-8 h-8 mr-2">
          <img
            src="https://framerusercontent.com/assets/rPxzXX6SLkvePv07TWveOgHq4.png"
            alt="atom11 logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span>atom11</span>
      </Link>
      <nav className="space-x-4">
        <a
          href="https://meetings.hubspot.com/neha-bhuchar?uuid=afebf53a-e64a-4c54-9d06-9bf8cd9eb995"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
            {/* <button
              onClick={() => setBookDemo(!bookDemo)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            > */}
              {/* {bookDemo ? "Back to Results" : "Book a Demo"} */}
              Book a Demo
            {/* </button> */}
        </a>
      </nav>
    </header>
  );
};

export default Header;
