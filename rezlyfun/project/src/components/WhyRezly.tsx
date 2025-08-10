import React from 'react';
import { Award, HeadphonesIcon, TrendingUp, Shield, Clock, Users } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: "Dokazana kvaliteta",
    description: "Preko 500 zadovoljnih klijenata koji su povećali svoju prodaju za 127% u prosjeku.",
    stats: "127% povećanje prodaje"
  },
  {
    icon: HeadphonesIcon,
    title: "Stručna podrška 24/7",
    description: "Naš tim stručnjaka dostupan je 24/7 za sve vaše potrebe i pitanja.",
    stats: "< 2h vrijeme odgovora"
  },
  {
    icon: TrendingUp,
    title: "ROI garancija",
    description: "Garantiramo povrat investicije u prva 3 mjeseca ili vraćamo novac.",
    stats: "300% ROI garancija"
  },
  {
    icon: Shield,
    title: "Enterprise sigurnost",
    description: "Najviši standardi sigurnosti s redovitim sigurnosnim kopijama.",
    stats: "99.9% uptime SLA"
  },
  {
    icon: Clock,
    title: "Brza implementacija",
    description: "Vaša web stranica i booking sustav bit će spremni u roku od 48 sati.",
    stats: "48h setup"
  },
  {
    icon: Users,
    title: "Stručni tim",
    description: "Radimo s preko 50 različitih industrija i razumijemo vaše potrebe.",
    stats: "50+ industrija"
  }
];

export default function WhyRezly() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
            Zašto odabrati Rezly?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Više od 500 poduzeća
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> vjeruje nama</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pridružite se uspješnim poduzećima koja su transformirala svoje poslovanje s Rezly
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="group relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{benefit.stats}</div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Testimonial Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 text-yellow-400">★</div>
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6">
              "Rezly je transformirao naše poslovanje. Povećali smo rezervacije za 200% u prva tri mjeseca!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">MK</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Marko Kovač</div>
                <div className="text-gray-300">Vlasnik, Wellness Centar Zagreb</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}