import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const shouldUseTransparent = isHomePage && !isScrolled;

  const navigation = [
    { name: 'Početna', href: '/' },
    { name: 'Značajke', href: '/znacajke' },
    { name: 'Cijene', href: '/cijene' },
    { name: 'O nama', href: '/o-nama' },
    { name: 'Kontakt', href: '/kontakt' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldUseTransparent
          ? 'bg-transparent' 
          : 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={handleLinkClick}>
            <Logo 
              textColor={shouldUseTransparent ? 'text-white' : 'text-gray-900'}
              className="hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={`font-semibold hover:text-blue-600 transition-all duration-300 relative group ${
                  shouldUseTransparent ? 'text-white' : 'text-gray-700'
                } ${location.pathname === item.href ? 'text-blue-600' : ''}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 ml-8">
              <a 
                href="tel:+385123456789" 
                className={`flex items-center space-x-2 font-medium hover:text-blue-600 transition-colors ${
                  shouldUseTransparent ? 'text-white' : 'text-gray-700'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+385 1 234 5678</span>
              </a>
              
              <Link
                to="/kontakt"
                onClick={handleLinkClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Rezerviraj konzultaciju
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${shouldUseTransparent ? 'text-white' : 'text-gray-900'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${shouldUseTransparent ? 'text-white' : 'text-gray-900'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-2xl mt-4 p-6 shadow-2xl border border-gray-200">
            <nav className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    location.pathname === item.href ? 'text-blue-600 font-semibold' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <a 
                  href="tel:+385123456789" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium mb-4"
                >
                  <Phone className="w-4 h-4" />
                  <span>+385 1 234 5678</span>
                </a>
                
                <Link
                  to="/kontakt"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-center"
                  onClick={handleLinkClick}
                >
                  Besplatna konzultacija
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}