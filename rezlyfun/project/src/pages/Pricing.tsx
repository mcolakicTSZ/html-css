import React from 'react';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "299",
    period: "mjesečno",
    description: "Savršeno za mala poduzeća koja počinju",
    icon: Zap,
    features: [
      "Profesionalna web stranica",
      "Osnovni booking sustav",
      "Do 100 rezervacija mjesečno",
      "Email podrška",
      "Osnovne analitike",
      "SSL certifikat",
      "Mobilna optimizacija",
      "Osnovni CRM",
      "Email potvrde"
    ],
    popular: false,
    color: "from-gray-600 to-gray-700",
    setupFee: "Besplatno postavljanje"
  },
  {
    name: "Professional",
    price: "599",
    period: "mjesečno",
    description: "Najbolji izbor za rastuća poduzeća",
    icon: Star,
    features: [
      "Sve iz Starter paketa",
      "Napredni booking sustav",
      "Neograničene rezervacije",
      "Napredni CRM sustav",
      "Detaljne analitike i izvještaji",
      "Automatizacija email-ova",
      "SMS podsjetnici",
      "Prioritetna podrška",
      "Integracije s vanjskim sustavima",
      "Prilagođeni dizajn",
      "Multi-location podrška"
    ],
    popular: true,
    color: "from-blue-600 to-indigo-600",
    setupFee: "Besplatno postavljanje + obuka"
  },
  {
    name: "Enterprise",
    price: "1299",
    period: "mjesečno",
    description: "Za velika poduzeća s posebnim zahtjevima",
    icon: Crown,
    features: [
      "Sve iz Professional paketa",
      "Potpuna prilagodba",
      "Dedicirani account manager",
      "24/7 telefonska podrška",
      "Napredne integracije (API)",
      "White-label rješenje",
      "Sigurnosne kopije u realnom vremenu",
      "SLA garancija 99.9%",
      "Obuka tima",
      "Prioritetni razvoj značajki",
      "Custom reporting",
      "Advanced security features"
    ],
    popular: false,
    color: "from-purple-600 to-pink-600",
    setupFee: "Besplatno postavljanje + dedicirani support"
  }
];

const faqs = [
  {
    question: "Postoje li dodatni troškovi?",
    answer: "Ne, sve navedene cijene su konačne. Nema skrivenih naknada, provizija po rezervaciji ili dodatnih troškova."
  },
  {
    question: "Mogu li promijeniti paket?",
    answer: "Da, možete nadograditi ili smanjiti paket bilo kada. Promjene se primjenjuju od sljedećeg ciklusa naplate."
  },
  {
    question: "Što ako nisam zadovoljan?",
    answer: "Nudimo 30-dnevnu garanciju povrata novca bez pitanja. Također garantiramo ROI u prva 3 mjeseca."
  },
  {
    question: "Koliko dugo traje implementacija?",
    answer: "Standardna implementacija traje 48-72 sata. Enterprise rješenja mogu potrajati do 2 tjedna ovisno o složenosti."
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold mb-6">
              Transparentne cijene
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Odaberite paket koji
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> odgovara vama</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Bez skrivenih troškova. Bez ugovora na dugi rok. Možete promijeniti paket bilo kada.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div 
                  key={index}
                  className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                    plan.popular 
                      ? 'border-blue-500 ring-4 ring-blue-500/20' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        Najpopularniji
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {plan.popular && (
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          NAJBOLJA VRIJEDNOST
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-xl text-gray-600 ml-2">kn</span>
                      </div>
                      <div className="text-gray-500 text-sm mb-2">{plan.period}</div>
                      <div className="text-green-600 text-sm font-medium">{plan.setupFee}</div>
                    </div>
                    
                    <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 mb-8 group ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}>
                      <span className="flex items-center justify-center">
                        Odaberite {plan.name}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Često postavljana pitanja
            </h2>
            <p className="text-xl text-gray-600">
              Odgovori na najčešća pitanja o našim cijenama i uslugama
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Trebate prilagođeno rješenje?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Kontaktirajte nas za personaliziranu ponudu koja odgovara vašim specifičnim potrebama
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            Kontaktirajte prodaju
          </button>
        </div>
      </section>
    </div>
  );
}