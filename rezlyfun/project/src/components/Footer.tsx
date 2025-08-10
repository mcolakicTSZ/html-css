import React from 'react';
import { Globe, Mail, Phone, MapPin, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Rezly</span>
                <div className="text-sm text-gray-400">Professional Solutions</div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Profesionalna web stranica i napredni booking sustav za vaše poslovanje. 
              Povećajte svoju prodaju s našim dokazanim rješenjima.
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">500+ zadovoljnih klijenata</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">99.9% uptime</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer group">
                <span className="text-lg font-bold group-hover:scale-110 transition-transform">f</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer group">
                <span className="text-lg font-bold group-hover:scale-110 transition-transform">in</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer group">
                <span className="text-lg font-bold group-hover:scale-110 transition-transform">@</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Naše usluge</h3>
            <ul className="space-y-4">
              <li><Link to="/" onClick={handleLinkClick} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">RentMaster AI</Link></li>
              <li><Link to="/rezly" onClick={handleLinkClick} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Rezly Platform</Link></li>
              <li><Link to="/znacajke" onClick={handleLinkClick} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Značajke</Link></li>
              <li><Link to="/cijene" onClick={handleLinkClick} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Cijene</Link></li>
              <li><Link to="/o-nama" onClick={handleLinkClick} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">O nama</Link></li>
              <li><Link to="/kontakt" onClick={handleLinkClick} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Podrška 24/7</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Kontakt informacije</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">info@rezly.com</div>
                  <div className="text-gray-400 text-sm">Općenite informacije</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">+385 1 234 5678</div>
                  <div className="text-gray-400 text-sm">Prodaja i podrška</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Zagreb, Hrvatska</div>
                  <div className="text-gray-400 text-sm">Ilica 1, 10000 Zagreb</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl border border-blue-500/30">
              <h4 className="font-semibold text-white mb-2">Radno vrijeme</h4>
              <div className="text-sm text-gray-300">
                <div>Pon - Pet: 08:00 - 20:00</div>
                <div>Sub: 09:00 - 15:00</div>
                <div className="text-green-400 font-medium">24/7 tehnička podrška</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              © 2024 Rezly Professional Solutions. Sva prava pridržana.
            </div>
            <div className="flex space-x-8 text-sm">
              <Link to="/o-nama" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Uvjeti korištenja</Link>
              <Link to="/o-nama" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Privatnost</Link>
              <Link to="/o-nama" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Kolačići</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}