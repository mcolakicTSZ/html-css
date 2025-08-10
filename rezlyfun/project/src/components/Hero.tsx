import React from 'react';
import { ArrowRight, Globe, Calendar, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-sm font-semibold shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              Profesionalno rješenje za vaše poslovanje
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Rezly – <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Profesionalna</span> web stranica i 
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> booking sustav</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Povećajte svoju prodaju s modernom web stranicom i naprednim booking sustavom. 
              Sve što trebate za uspješno poslovanje u jednom paketu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
                Počnite odmah
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="inline-flex items-center px-10 py-5 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Pogledajte demo
              </button>
            </div>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Zadovoljnih klijenata</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400">99.9%</div>
                <div className="text-sm text-gray-400">Uptime garancija</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-400">Podrška</div>
              </div>
            </div>
          </div>
          
          {/* Right column - Visual */}
          <div className="relative">
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-white/20 rounded-full px-6 py-2 text-sm text-white/80">
                    admin.rezly.com
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-blue-400/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-8 h-8 text-blue-400" />
                        <div>
                          <h3 className="font-bold text-white">Web stranica</h3>
                          <p className="text-sm text-gray-300">Moderna i responzivna</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-400">✓</div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-400/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-8 h-8 text-indigo-400" />
                        <div>
                          <h3 className="font-bold text-white">Booking sustav</h3>
                          <p className="text-sm text-gray-300">Napredan i intuitivan</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-400">✓</div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl p-4 shadow-xl animate-bounce">
                <div className="text-white font-bold text-sm">+127% prodaja</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 shadow-xl animate-pulse">
                <div className="text-white font-bold text-sm">24/7 aktivno</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}