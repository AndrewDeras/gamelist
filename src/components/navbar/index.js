import React from 'react';
import { Link } from 'react-router-dom';

//hooks
import { useAuth } from '../../hooks/useAuth';

// Context
import { useAuthValue } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuth();
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
              <Link to="/auth">Login/CreateAccount</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/fav">Favorite Games</Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;