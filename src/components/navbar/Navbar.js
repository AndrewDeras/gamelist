import React from 'react';
import { Link } from 'react-router-dom';

//hooks
import { useAuth } from '../../hooks/useAuth';

// Context
import { useContextValue } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useContextValue();
  const { logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {user ? (
            <h4 id='brand-h4'>Hello {user.displayName}</h4>
          ) : (
            <h4>Free games to play</h4>
          )}
        </Link>
        {!user ? (
          <ul>
            <li>
              <Link to='/' >
                <i className="bi bi-house-door-fill"> </i></Link>
            </li>
            <li>
              <Link to="/auth">Login/CreateAccount</Link>
            </li>

          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/' >
                <i className="bi bi-house-door-fill"> </i></Link>
            </li>
            <li>
              <Link to="/favorite">My Favorite Games</Link>
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
