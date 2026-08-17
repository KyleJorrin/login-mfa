import React from 'react';
import {Link} from 'react-router-dom';

export default function Start(){

  return (
    <div className="bg-gray-200 flex flex-col h-screen">
      <h1 id="start-title"className="text-3xl font-semibold text-center text-blue-500">
        Website.com</h1>
        
      <div className="flex items-center justify-between h-12 bg-gray-200 text-blue-500 px-4">
        <div className="text-bold">Logo</div>
        <div className="flex gap-2 font-sans cursor-pointer">
            <span className="text-lg border border-lg px-4 transition-transform duration-200 hover:scale-110 hover:text-green-500">Home</span>
            <span className="text-lg border border-lg px-4 transition-transform duration-200 hover:scale-110 hover:text-green-500">About</span>
            <span className="text-lg border border-lg px-4 transition-transform duration-200 hover:scale-110 hover:text-green-500">Products</span>
        </div>
      </div>
      <div className="flex text-6xl items-center justify-center h-12 bg-gray-200 text-blue-500 px-4 py-30">
        <h1>WELCOME!!!</h1>
      </div>
      <div className="flex items-center justify-center h-12 bg-gray-200 text-blue-500 px-4">
        <Link to={"/signup"}>
          <button id="sign-in-button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
        </Link>
        <Link to={"/login"}>
          <button id="log-in-button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log in</button>
        </Link>
      </div>
    </div>
  )
}