import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 2000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">CreativeHub</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Transform your digital presence with creative solutions that connect and inspire.
            </p>
            
            {/* Social Links - Instagram/Twitter style */}
            <div className="flex space-x-4">
              {[
                { name: 'Instagram', bg: 'from-purple-500 to-pink-500' },
                { name: 'Twitter', bg: 'from-blue-400 to-blue-600' },
                { name: 'LinkedIn', bg: 'from-blue-600 to-blue-800' },
                { name: 'YouTube', bg: 'from-red-500 to-red-600' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-10 h-10 bg-gradient-to-r ${social.bg} rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transform transition-all duration-200 shadow-md hover:shadow-lg`}
                >
                  {social.name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Services', 'About', 'Portfolio', 'Blog', 'Careers', 'Contact', 'Support', 'Resources'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 text-sm py-1 hover:text-purple-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Card */}
          <div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-2">Stay Connected</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get updates and inspiration delivered to your inbox.
              </p>
              
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className={`w-full py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">© {currentYear} CreativeHub</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-gray-500 text-sm">Made with ❤️</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Terms of Service</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <span className="text-gray-600 text-xs">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;