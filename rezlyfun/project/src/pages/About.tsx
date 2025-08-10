import React from 'react';
import { Award, Users, Target, Heart, TrendingUp, Shield, Clock, Globe } from 'lucide-react';

const stats = [
  { number: "500+", label: "Zadovoljnih klijenata", icon: Users },
  { number: "127%", label: "Prosječno povećanje prodaje", icon: TrendingUp },
  { number: "99.9%", label: "Uptime garancija", icon: Shield },
  { number: "48h", label: "Prosječno vrijeme implementacije", icon: Clock }
];

const values = [
  {
    icon: Target,
    title: "Fokus na rezultate",
    description: "Svaki projekt pristupamo s ciljem maksimiziranja vašeg ROI-ja i poslovnog uspjeha."
  },
  {
    icon: Heart,
    title: "Partnerski pristup",
    description: "Nismo samo dobavljač - mi smo vaš partner u digitalnoj transformaciji."
  },
  {
    icon: Award,
    title: "Kvaliteta bez kompromisa",
    description: "Koristimo najnovije tehnologije i najbolje prakse u industriji."
  },
  {
    icon: Globe,
    title: "Inovacija",
    description: "Kontinuirano unapređujemo naša rješenja kako bismo ostali korak ispred konkurencije."
  }
];

const team = [
  {
    name: "Marko Petrović",
    role: "CEO & Founder",
    description: "15+ godina iskustva u digitalnom marketingu i razvoju web aplikacija.",
    image: "MP"
  },
  {
    name: "Ana Kovač",
    role: "CTO",
    description: "Stručnjakinja za cloud arhitekturu i skalabilne web sustave.",
    image: "AK"
  },
  {
    name: "Petar Novak",
    role: "Head of Customer Success",
    description: "Specijalist za korisničko iskustvo i optimizaciju poslovnih procesa.",
    image: "PN"
  },
  {
    name: "Maja Jurić",
    role: "Lead Designer",
    description: "Kreativna direktorica s fokusom na UX/UI dizajn i branding.",
    image: "MJ"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              O nama -
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Rezly timu</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Mi smo tim strastvenih stručnjaka koji pomaže poduzećima da ostvare svoj puni digitalni potencijal kroz inovativna web rješenja.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Naša priča
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Rezly je osnovan 2019. godine s jasnom vizijom - omogućiti svakom poduzeću, bez obzira na veličinu, 
                  pristup profesionalnim web rješenjima koja mogu transformirati njihovo poslovanje.
                </p>
                <p>
                  Počeli smo kao mali tim developera i dizajnera koji su bili frustrirani složenošću i visokim troškovima 
                  postojećih rješenja na tržištu. Odlučili smo stvoriti platformu koja je moćna, ali jednostavna za korištenje.
                </p>
                <p>
                  Danas, nakon 5 godina rada, ponosni smo što smo pomogli preko 500 poduzeća da povećaju svoju prodaju 
                  u prosjeku za 127% kroz naša digitalna rješenja.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Naša misija</h3>
                <p className="text-lg leading-relaxed mb-6">
                  Demokratizirati pristup profesionalnim web rješenjima i omogućiti svakom poduzeću 
                  da ostvari svoj puni digitalni potencijal.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Naša vizija</div>
                    <div className="text-blue-100">Biti #1 platforma za booking sustave u regiji</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Naše vrijednosti
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vrijednosti koje nas vode u svakom projektu i odnosu s klijentima
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Upoznajte naš tim
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stručnjaci koji stoje iza svakog uspješnog projekta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">{member.image}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
                <div className="text-blue-600 font-semibold mb-4 text-center">{member.role}</div>
                <p className="text-gray-600 text-center leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Spremni ste postati dio naše priče uspjeha?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Pridružite se stotinama zadovoljnih klijenata koji su transformirali svoje poslovanje s Rezly
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            Kontaktirajte nas danas
          </button>
        </div>
      </section>
    </div>
  );
}