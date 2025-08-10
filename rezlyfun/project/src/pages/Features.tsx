import React from 'react';
import { Globe, Calendar, Shield, Users, Bell, Settings, Zap, BarChart3, CheckCircle, Star } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: "Profesionalna web stranica",
    description: "Moderna, responzivna web stranica optimizirana za konverzije i SEO.",
    details: [
      "Responzivni dizajn za sve uređaje",
      "SEO optimizacija",
      "Brzo učitavanje (< 2s)",
      "SSL sigurnost",
      "Google Analytics integracija"
    ],
    highlight: "Premium dizajn"
  },
  {
    icon: Calendar,
    title: "Napredni booking sustav",
    description: "Inteligentno upravljanje rezervacijama s automatskim potvrđivanjem.",
    details: [
      "Real-time dostupnost",
      "Automatske potvrde",
      "Kalendar sinkronizacija",
      "Grupne rezervacije",
      "Waitlist funkcionalnost"
    ],
    highlight: "AI optimizacija"
  },
  {
    icon: BarChart3,
    title: "Analitika i izvještaji",
    description: "Detaljni uvidi u vaše poslovanje i performanse rezervacija.",
    details: [
      "Real-time dashboard",
      "Financijski izvještaji",
      "Analiza klijenata",
      "Trend praćenje",
      "Export podataka"
    ],
    highlight: "Real-time podaci"
  },
  {
    icon: Users,
    title: "CRM sustav",
    description: "Upravljanje klijentima s poviješću rezervacija i preferencijama.",
    details: [
      "Profili klijenata",
      "Povijest rezervacija",
      "Preferencije i bilješke",
      "Segmentacija klijenata",
      "Loyalty programi"
    ],
    highlight: "Personalizacija"
  },
  {
    icon: Bell,
    title: "Automatizacija",
    description: "Pametni podsjetnici, potvrde i follow-up komunikacija.",
    details: [
      "Email automatizacija",
      "SMS podsjetnici",
      "Follow-up kampanje",
      "Personalizirane poruke",
      "Workflow automatizacija"
    ],
    highlight: "Štedi vrijeme"
  },
  {
    icon: Shield,
    title: "Sigurnost i backup",
    description: "Enterprise-level sigurnost s automatskim sigurnosnim kopijama.",
    details: [
      "SSL enkripcija",
      "Dnevne sigurnosne kopije",
      "GDPR compliance",
      "Firewall zaštita",
      "99.9% uptime garancija"
    ],
    highlight: "99.9% uptime"
  },
  {
    icon: Zap,
    title: "Brze performanse",
    description: "Optimizirane stranice koje se učitavaju u manje od 2 sekunde.",
    details: [
      "CDN mreža",
      "Optimizirane slike",
      "Caching strategije",
      "Minimalizirani kod",
      "Performance monitoring"
    ],
    highlight: "Lightning fast"
  },
  {
    icon: Settings,
    title: "Potpuna prilagodba",
    description: "Prilagodite sve aspekte prema vašim specifičnim potrebama.",
    details: [
      "Custom branding",
      "Prilagođeni workflow",
      "API integracije",
      "White-label opcije",
      "Fleksibilne konfiguracije"
    ],
    highlight: "Vaš brend"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 mr-2" />
              Sve što trebate za uspjeh
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Profesionalne značajke za
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> vaš uspjeh</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Svaka značajka je pažljivo dizajnirana da maksimizira vaše prihode i poboljša korisničko iskustvo
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:transform hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Spremni ste iskusiti sve značajke?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rezervirajte besplatnu demonstraciju i vidite kako Rezly može transformirati vaše poslovanje
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            Rezerviraj demo
          </button>
        </div>
      </section>
    </div>
  );
}