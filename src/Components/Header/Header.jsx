import React from 'react';
import { Container, Logo, LogoutBtn, ProfileBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  // ✅ Safe access with fallback to {}
  const authStatus = useSelector((state) => state.auth?.status || false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },

  ];

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="py-3 shadow bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">
      <Container>
        <nav className="flex items-center justify-between relative">
          <div className="mr-4 flex items-center">
            <Link to="/" className="flex items-center group">
              <Logo width="70px" />
              <span className="ml-2 text-2xl font-extrabold text-white tracking-wide hidden sm:inline group-hover:text-blue-300 transition-colors duration-200">MegaBlog</span>
            </Link>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded-lg text-white border-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
          {/* Desktop menu */}
          <ul className="hidden md:flex ml-auto items-center space-x-4">
            {authStatus && (
              <li>
                <ProfileBtn />
              </li>
            )}
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-full transition-all duration-200 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          {/* Mobile dropdown menu */}
          {menuOpen && (
            <ul className="absolute top-16 right-4 bg-white shadow-2xl rounded-xl flex flex-col items-start p-4 z-50 md:hidden min-w-[200px] border border-gray-200 animate-fade-in">
              {authStatus && (
                <li className="mb-2 w-full">
                  <ProfileBtn />
                </li>
              )}
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="mb-2 w-full">
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 font-semibold text-gray-800 bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-lg transition-all duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="w-full">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
