import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-inner container">
        <Link to="/" className="brand">VocaLearn</Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/lessons">Lessons</Link>
          <Link to="/history">History</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/help">Help</Link>
        </nav>
        <div>
          <Link to="/login" className="btn btn-ghost" style={{ marginRight: 8 }}>Sign in</Link>
          <Link to="/signup" className="btn btn-primary">Get started</Link>
        </div>
      </div>
    </header>
  );
}
