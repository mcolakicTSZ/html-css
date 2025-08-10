import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { formspreeAPI } from '../lib/formspree';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    console.log('📧 Contact form submission via Formspree started...')
    console.log('📝 Form data:', formData)
    
    try {
      // Send directly via Formspree
      const result = await formspreeAPI.submitForm('mnnzljgy', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: 'contact',
        _subject: `📧 Nova poruka s web stranice - ${formData.firstName} ${formData.lastName}`
      })

      console.log('📧 Formspree result:', result)

      if (result.ok) {
        console.log('✅ Contact form sent via Formspree!')
        setIsSubmitted(true);
        
        // Reset form after 10 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          });
        }, 10000);
      } else {
        console.error('❌ Contact form failed:', result)
        setError(result.errors?.[0]?.message || 'Greška pri slanju poruke');
      }

    } catch (error) {
      console.error('❌ Formspree submission error:', error);
      setError('Greška pri slanju poruke. Molimo pokušajte ponovno.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.message;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white animate-bounce" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            🎉 Poruka uspješno poslana!
          </h3>
          
          <p className="text-xl text-gray-600 mb-8">
            Hvala vam {formData.firstName}! Kontaktirat ćemo vas u roku od 2 sata.
          </p>
          
          <div className="bg-green-50 rounded-2xl p-6 mb-8 border border-green-200">
            <h4 className="text-lg font-bold text-green-800 mb-4">🔄 Što slijedi?</h4>
            <div className="space-y-3 text-green-700">
              <p className="flex items-center justify-center">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Kontaktirat ćemo vas u roku od 2 sata
              </p>
              <p className="flex items-center justify-center">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Dogovorit ćemo najbolje rješenje za vas
              </p>
              <p className="flex items-center justify-center">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Počet ćemo s implementacijom
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Forma će se resetirati za 10 sekundi...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kontaktirajte nas
          </h2>
          <p className="text-gray-600">
            Pošaljite nam poruku i kontaktirat ćemo vas u roku od 2 sata
          </p>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Ime *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Vaše ime"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Prezime *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Vaše prezime"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email adresa *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="vasa.adresa@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Broj telefona *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="+385 xx xxx xxxx"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Vaša poruka *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Opišite kako vam možemo pomoći..."
            />
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center mx-auto ${
                isFormValid && !isLoading
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-2xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Šalje se...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Pošaljite poruku
                </>
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            * Obavezna polja
          </div>
        </form>
      </div>
    </div>
  );
}