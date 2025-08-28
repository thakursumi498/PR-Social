import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const cursorRef = useRef(null);
  const animationFrameRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  // Scroll detection with smooth threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium bubble cursor effect with proper cleanup
  useEffect(() => {
    // Don't create cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.remove('custom-cursor');
      return;
    }

    document.body.classList.add('custom-cursor');
    
    const cursor = document.createElement('div');
    cursor.className = 'premium-cursor';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      
      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-hover');
      }
    };
    
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(updateCursor);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownEnter = (item) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setHoveredItem(item);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: '◉' },
    { label: 'Services', path: '/services', icon: '◈' },
    { 
      label: 'More', 
      path: '#', 
      icon: '◎',
      dropdown: [
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'About', path: '/about' },
        { label: 'Team', path: '/team' },
        { label: 'Testimonials', path: '/testimonials' }
      ]
    },
    { label: 'Contact', path: '/contact', icon: '◐' }
  ];

  // Check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav ref={menuRef} className={`fixed top-0 w-full z-[9999] transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-3' 
          : 'bg-transparent py-6'
      }`}>
        
        {/* Premium glass morphism overlay */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between">
            
            {/* Ultra Premium Logo */}
            <Link to="/" className="group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-white/90 to-white/70 rounded-xl flex items-center justify-center">
                      <span className="text-black font-black text-lg">PS</span>
                    </div>
                  </div>
                  {/* Floating particles around logo */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:animate-bounce"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 group-hover:animate-bounce delay-100"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    PR Sparkz
                  </h1>
                  <p className="text-xs text-white/50 font-medium -mt-1">Digital Excellence</p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Ultra Modern */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.dropdown ? (
                    <div
                      className="nav-item group relative px-6 py-3 rounded-2xl transition-all duration-500 hover:bg-white/5 flex items-center cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400/70 text-sm group-hover:text-blue-300 transition-colors duration-300">
                          {item.icon}
                        </span>
                        <span className="text-white/80 font-medium group-hover:text-white transition-all duration-300">
                          {item.label}
                        </span>
                        <svg 
                          className="w-3 h-3 text-white/60 transition-transform duration-300 group-hover:rotate-180" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Fixed underline animation */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-4/5 transition-all duration-500 rounded-full"></div>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-item group relative px-6 py-3 rounded-2xl transition-all duration-500 hover:bg-white/5 flex items-center ${
                        isActive(item.path) ? 'bg-white/10' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400/70 text-sm group-hover:text-blue-300 transition-colors duration-300">
                          {item.icon}
                        </span>
                        <span className="text-white/80 font-medium group-hover:text-white transition-all duration-300">
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive(item.path) && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      )}
                      
                      {/* Hover underline animation */}
                      {!isActive(item.path) && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-4/5 transition-all duration-500 rounded-full"></div>
                      )}
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && hoveredItem === item.label && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-56 bg-[#8666A5] backdrop-blur-2xl border border-[#DBC865]/20 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-50"
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem, idx) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.path}
                            className={`block px-6 py-3 text-white/90 hover:text-white hover:bg-[#B3972A]/20 transition-all duration-300 group ${
                              isActive(dropdownItem.path) ? 'bg-[#B3972A]/20 text-white' : ''
                            }`}
                            onClick={() => setHoveredItem(null)}
                          >
                            <div className="flex items-center">
                              <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-opacity duration-300 ${
                                isActive(dropdownItem.path) 
                                  ? 'bg-[#DBC865] opacity-100' 
                                  : 'bg-[#DBC865] opacity-0 group-hover:opacity-100'
                              }`}></div>
                              <span>{dropdownItem.label}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Premium CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/contact" className="group relative overflow-hidden px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 text-white font-semibold flex items-center space-x-2">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Ultra Modern Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-white rounded-full top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-black/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <span className="text-blue-400 text-xl">{item.icon}</span>
                          <span className="text-white/90 font-medium group-hover:text-white text-lg">
                            {item.label}
                          </span>
                        </div>
                        <svg 
                          className="w-4 h-4 text-white/60" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 ${
                          isActive(item.path) ? 'bg-white/10' : ''
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-blue-400 text-xl">{item.icon}</span>
                          <span className="text-white/90 font-medium group-hover:text-white text-lg">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    )}
                    
                    {/* Mobile dropdown items */}
                    {item.dropdown && (
                      <div className="pl-14 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block py-2 px-4 rounded-xl text-white/70 hover:text-white hover:bg-[#8666A5]/20 transition-all duration-300 ${
                              isActive(dropdownItem.path) ? 'bg-[#8666A5]/20 text-white' : ''
                            }`}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 hover:scale-105 block"
                >
                  <span className="relative z-10 text-white font-semibold flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add CSS styles for the cursor and animations */}
      <style jsx global>{`
        .premium-cursor {
          position: fixed;
          width: 16px;
          height: 16px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.3s, height 0.3s, background 0.3s;
          transform: translate(-50%, -50%);
          backdrop-filter: blur(1px);
        }
        
        .cursor-hover {
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%);
          border: 2px solid rgba(147, 51, 234, 0.4);
        }
        
        body.custom-cursor, 
        body.custom-cursor * {
          cursor: none !important;
        }
        
        /* Premium scroll animations */
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-item {
          animation: float-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default ModernNavbar;