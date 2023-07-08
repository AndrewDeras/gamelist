import React from 'react';
import { Link } from 'react-router-dom';

// Context
import { useAuthValue } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuthValue();

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {user ? (
            `Hello ${user.displayName}`
          ) : (
            `Free games to play`
          )}
        </Link>
        {!user ? (
          <ul>
            <li>
              <Link to="/auth">Login</Link>
            </li>
            <li>
              <Link to="/register">Create Account</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/fav">Favorite Games</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
