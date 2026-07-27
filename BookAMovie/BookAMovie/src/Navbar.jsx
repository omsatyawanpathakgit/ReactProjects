import React from 'react';
import './App.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const categories = [
    { to: '/contents', label: 'Contents' },
    { to: '/book', label: 'Book' },
    { to: '/wishlist', label: 'Wish List' },
  ];

  const handleSignOut = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-button">
            <span className="logo-text">BookAContent</span>
          </Link>
        </div>
        

        <div className="location">
          <select name="city" id="city" defaultValue="Rajkot">
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Baroda">Baroda</option>
            <option value="Surat">Surat</option>
            <option value="Rajkot">Rajkot</option>
            <option value="Gandhinagar">Gandhinagar</option>
            <option value="Junagadh">Junagadh</option>
            <option value="Bhavnagar">Bhavnagar</option>
            <option value="Jamnagar">Jamnagar</option>
            <option value="Anand">Anand</option>
            <option value="Navsari">Navsari</option>
          </select>
        </div>

        

        {isLoggedIn ? (
          <>
            <div className="search-bar">
              <input type="text" placeholder="Browse your favorite movies..." />
            </div>
            <div className="nav-right">
              <button className="sign-in-btn" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <div className="nav-right" style={{ gap: '10px' }}>
            <button className="sign-in-btn" type="button" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="sign-in-btn" type="button" onClick={() => navigate('/signup')}>
              Sign up
            </button>
            <Link to="/about" className="nav-link-btn">
              About Us
            </Link>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div className="categories">
          {categories.map((category) => (
            <NavLink
              key={category.to}
              to={category.to}
              className={({ isActive }) =>
                `category-button${isActive ? ' active' : ''}`
              }
            >
              {category.label}
            </NavLink>
          ))}
        </div>
        
      )}
    </nav>
  );
}
