//hooks
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Context
import { useContextValue } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContextValue();
  const { logout } = useAuth();


  return (
    <nav id='top' className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {user ? (
            <h4 id='brand-h4'> Hello {user.displayName}</h4>
          ) : (
            <h4 id='brand-h4'> Free games to play</h4>
          )}
        </Link>
        {!user ? (
          <ul>
            <li>
              <Link to='/' >
                <i className="bi bi-house-door-fill"> </i></Link>
            </li>
            <li>
              <Link to="/auth">Login / Create Account</Link>
            </li>

          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/' >
                <i className="bi bi-house-door-fill"> </i> Home
              </Link>
            </li>
            <li>
              <Link to="/favorite">
                My Favorite Games
              </Link>
            </li>
            <li>
              <Link onClick={() => {
                logout();
                navigate('/');
              }}> Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
