import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => "px-3 py-2 rounded-md text-sm font-medium " + (isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100");

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-lg font-bold">VocaLearn</h1>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
        </nav>
      </div>
    </header>
  );
}
