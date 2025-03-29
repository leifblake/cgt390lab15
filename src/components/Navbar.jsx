import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = ({ theme, toggleTheme }) => {
  const { isAuthenticated, logout, username } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
        {/* Left side links */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/add-profile">Add Profiles</Link>
        </li>

        {/* Right side links */}
        <li style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <>
              <span
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: "'Josefin Sans', serif",
                  fontWeight: 700,
                  fontStyle: 'normal',
                }}
              >
                Hello, {username}!
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;