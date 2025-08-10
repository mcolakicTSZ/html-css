import React from 'react';
import { Globe, Calendar, Shield, Users, Bell, Settings, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: "Profesionalna web stranica",
    description: "Moderna, responzivna web stranica optimizirana za konverzije i SEO.",
    highlight: "Premium dizajn"
  },
  {
    icon: Calendar,
    title: "Napredni booking sustav",
    description: "Inteligentno upravljanje rezervacijama s automatskim potvrđivanjem.",
    highlight: "AI optimizacija"
  },
  {
    icon: BarChart3,
    title: "Analitika i izvještaji",
    description: "Detaljni uvidi u vaše poslovanje i performanse rezervacija.",
    highlight: "Real-time podaci"
  },
  {
    icon: Users,
    title: "CRM sustav",
    description: "Upravljanje klijentima s poviješću rezervacija i preferencijama.",
    highlight: "Personalizacija"
  },
  {
    icon: Bell,
    title: "Automatizacija",
    description: "Pametni podsjetnici, potvrde i follow-up komunikacija.",
    highlight: "Štedi vrijeme"
  },
  {
    icon: Shield,
    title: "Sigurnost i backup",
    description: "Enterprise-level sigurnost s automatskim sigurnosnim kopijama.",
    highlight: "99.9% uptime"
  },
  {
    icon: Zap,
    title: "Brze performanse",
    description: "Optimizirane stranice koje se učitavaju u manje od 2 sekunde.",
    highlight: "Lightning fast"
  },
  {
    icon: Settings,
    title: "Potpuna prilagodba",
    description: "Prilagodite sve aspekte prema vašim specifičnim potrebama.",
    highlight: "Vaš brend"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            Sve što trebate za uspjeh
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Profesionalne značajke za
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> vaš uspjeh</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Svaka značajka je pažljivo dizajnirana da maksimizira vaše prihode i poboljša korisničko iskustvo
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:transform hover:-translate-y-3"
              >
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}