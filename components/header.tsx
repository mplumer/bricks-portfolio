import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => (
  <header className="top-0 py-5 bg-white border-b sm:h-20 sm:sticky">
    <div className="max-w-5xl px-6 mx-auto">
      <div className="flex flex-col items-center justify-center w-full sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center mb-4 sm:flex-row sm:mb-0">
          <img src="/max-profile-pic.ico" className="w-12" alt="React Bricks" />
          <div className="flex space-x-5 text-center sm:ml-8">
            <Link href="/">
              <a className="text-gray-500 hover:text-pink-700">Home</a>
            </Link>
            <Link href="/projects">
              <a className="text-gray-500 hover:text-pink-700">Projects</a>
            </Link>
            <Link href="/resume">
              <a className="text-gray-500 hover:text-pink-700">Resume</a>
            </Link>
          </div>
        </div>
        <Link href="/admin" prefetch={false}>
          <a className="px-5 py-2 font-medium text-white transition duration-200 rounded bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg">
            Top of Page
          </a>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
