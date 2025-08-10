import React from 'react';
import { Calendar, Users, TrendingUp, Shield, Clock, Star, ArrowRight, CheckCircle, Home, Car, Plane, Building } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const features = [
  {
    icon: Calendar,
    title: "Automatsko upravljanje rezervacijama",
    description: "Nikad više propuštene rezervacije. Naš AI sustav automatski upravlja dostupnošću 24/7."
  },
  {
    icon: TrendingUp,
    title: "Povećanje prihoda do 300%",
    description: "Optimizirajte cijene u realnom vremenu i maksimalizirajte popunjenost."
  },
  {
    icon: Users,
    title: "Upravljanje gostima",
    description: "Automatski check-in/out, komunikacija s gostima i review management."
  },
  {
    icon: Shield,
    title: "Sigurnost i osiguranje",
    description: "Potpuna zaštita vaše imovine s integriranim osiguranjem i provjere gostiju."
  }
];

const stats = [
  { number: "2,500+", label: "Aktivnih iznajmljivača" },
  { number: "€2.3M", label: "Mjesečni prihod" },
  { number: "98%", label: "Zadovoljstvo gostiju" },
  { number: "24/7", label: "Automatska podrška" }
];

const propertyTypes = [
  { icon: Home, name: "Apartmani", count: "1,200+" },
  { icon: Building, name: "Vile", count: "450+" },
  { icon: Car, name: "Vozila", count: "300+" },
  { icon: Plane, name: "Jahte", count: "150+" }
];

export default function RentalLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-0">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden pt-0">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-sm font-bold shadow-lg mb-8 animate-bounce">
              <Star className="w-4 h-4 mr-2" />
              USKORO - Revolucija u iznajmljivanju!
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">RentMaster</span>
              <br />
              Budućnost je stigla
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
              Prva AI-powered platforma u Hrvatskoj koja automatski upravlja vašim iznajmljivanjem. 
              <span className="text-yellow-300 font-semibold"> Povećajte prihode do 300% </span>
              bez dodatnog posla.
            </p>
            
            <div className="mb-16"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-800 mb-6">
              🚨 Gubite novac svaki dan!
            </h2>
            <p className="text-xl text-red-600 max-w-3xl mx-auto">
              Dok se mučite s ručnim upravljanjem rezervacija, vaši konkurenti koriste AI i zarađuju 3x više
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
              <div className="text-6xl mb-4">😰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Propuštene rezervacije</h3>
              <p className="text-gray-600">Gubite 30-50% potencijalnih gostiju jer ne odgovarate dovoljno brzo</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
              <div className="text-6xl mb-4">💸</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Loše cijene</h3>
              <p className="text-gray-600">Vaše cijene nisu optimizirane - gubite €500-2000 mjesečno po objektu</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Previše posla</h3>
              <p className="text-gray-600">Provodite 20+ sati tjedno na administraciji umjesto na širenju biznisa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ✨ RentMaster rješava sve!
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Prva AI platforma koja potpuno automatizira vaš rental biznis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-blue-100">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI Asistent 24/7</h3>
                  <p className="text-blue-100">Automatski odgovara gostima, upravlja rezervacijama i optimizira cijene</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Nova rezervacija</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-sm text-green-200 mt-1">Automatski potvrđeno u 30 sekundi</div>
                  </div>
                  
                  <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Optimizacija cijena</span>
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-sm text-blue-200 mt-1">+47% prihod ovaj mjesec</div>
                  </div>
                  
                  <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Komunikacija s gostima</span>
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-sm text-purple-200 mt-1">15 poruka automatski obrađeno</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Podržavamo sve vrste iznajmljivanja
            </h2>
            <p className="text-xl text-gray-600">
              Od apartmana do jahti - RentMaster radi s bilo kojom vrstom imovine
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                  <div className="text-blue-600 font-semibold">{type.count} aktivnih</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            🎯 Ograničena BETA ponuda
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Prva 100 korisnika dobiva doživotni popust od 50%!
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 mb-8 border border-white/30">
            <div className="text-6xl font-bold mb-4">
              <span className="line-through text-white/50">€1200</span>
              <span className="text-yellow-300"> €450</span>
            </div>
            <div className="text-xl mb-6">mjesečno po objektu</div>
            <div className="text-green-100 mb-8">
              ✅ Sve funkcije uključene<br/>
              ✅ Doživotni popust<br/>
              ✅ Prioritetna podrška<br/>
              ✅ Besplatno postavljanje
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-full text-lg font-bold animate-pulse">
              ⏰ Ostalo samo 23 mjesta!
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ne čekajte - konkurencija neće!
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Svaki dan kašnjenja košta vas stotine eura. Budite prvi u svojoj regiji koji koristi AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xl rounded-2xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse">
              🚀 REZERVIRAJ SADA
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <div className="mt-12 text-gray-400">
            <p>🔒 Bez obveza • 💰 30-dana garancija povrata novca • ⚡ Postavljanje u 24h</p>
          </div>
        </div>
      </section>
    </div>
  );
}