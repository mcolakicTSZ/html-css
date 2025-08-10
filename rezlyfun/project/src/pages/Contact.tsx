import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import ConsultationBooking from '../components/ConsultationBooking';

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "info@rezly.com",
    description: "Odgovaramo u roku od 2 sata"
  },
  {
    icon: Phone,
    title: "Telefon",
    details: "+385 1 234 5678",
    description: "Pon-Pet: 08:00-20:00, Sub: 09:00-15:00"
  },
  {
    icon: MapPin,
    title: "Adresa",
    details: "Ilica 1, 10000 Zagreb",
    description: "Hrvatska"
  },
  {
    icon: Clock,
    title: "Radno vrijeme",
    details: "24/7 tehnička podrška",
    description: "Uvijek dostupni za hitne slučajeve"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Kontaktirajte
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> naš tim</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Spremni smo odgovoriti na sva vaša pitanja i pomoći vam da transformirate svoje poslovanje
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                  <div className="text-lg font-semibold text-blue-600 mb-2">{info.details}</div>
                  <p className="text-gray-600">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConsultationBooking />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Naša lokacija
            </h2>
            <p className="text-gray-600">
              Nalazimo se u srcu Zagreba, lako dostupni javnim prijevozom
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-xl font-semibold text-gray-600">Interaktivna mapa</div>
              <div className="text-gray-500">Ilica 1, 10000 Zagreb, Hrvatska</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Preferirate direktan razgovor?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rezervirajte besplatnu 30-minutnu konzultaciju s našim stručnjakom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+385123456789"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Pozovite nas
            </a>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300">
              Rezerviraj konzultaciju
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}