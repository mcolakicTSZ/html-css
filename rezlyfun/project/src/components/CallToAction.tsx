import React from 'react';
import { ArrowRight, Phone, Mail, Calendar } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Spremni ste za
            <span className="text-yellow-300"> transformaciju</span>?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Pridružite se stotinama uspješnih poduzeća koja su već transformirala svoje poslovanje s Rezly
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Brza implementacija</h3>
            <p className="text-blue-100">Vaš sustav bit će spreman za 48 sati</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Osobna podrška</h3>
            <p className="text-blue-100">Dedicirani account manager za vaš uspjeh</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">ROI garancija</h3>
            <p className="text-blue-100">Povrat investicije u prva 3 mjeseca</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6">
              Počnite svoju transformaciju danas
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Rezervirajte besplatnu konzultaciju s našim stručnjakom i saznajte kako Rezly može transformirati vaše poslovanje
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/kontakt"
                className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Rezerviraj besplatnu konzultaciju
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <button className="inline-flex items-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300">
                Pogledaj demo uživo
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Bez obveza</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>30 min konzultacija</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Personalizirane preporuke</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}