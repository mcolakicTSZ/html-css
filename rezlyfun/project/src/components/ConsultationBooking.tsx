import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle, Mail, Star, ArrowRight, AlertCircle, Loader, Sparkles, Heart, Trophy, Zap } from 'lucide-react';
import { consultationAPI } from '../lib/supabase';

interface TimeSlot {
  time: string;
  available: boolean;
  popular?: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true, popular: true },
  { time: '11:00', available: true, popular: true },
  { time: '11:30', available: false },
  { time: '12:00', available: true },
  { time: '12:30', available: true },
  { time: '14:00', available: true, popular: true },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: false },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: true },
  { time: '17:30', available: true }
];

export default function ConsultationBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dateAvailability, setDateAvailability] = useState<{[key: string]: boolean}>({});
  const [checkingDate, setCheckingDate] = useState<string | null>(null);

  // Generate next 14 days (excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    while (dates.length < 10) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          date: currentDate.toISOString().split('T')[0],
          display: currentDate.toLocaleDateString('hr-HR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          }),
          fullDisplay: currentDate.toLocaleDateString('hr-HR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        });
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  // Auto-advance steps
  useEffect(() => {
    if (selectedDate && currentStep === 1) {
      setTimeout(() => setCurrentStep(2), 500);
    }
    if (selectedTime && currentStep === 2) {
      setTimeout(() => setCurrentStep(3), 500);
    }
  }, [selectedDate, selectedTime, currentStep]);

  // Check date availability when user hovers or clicks
  const checkDateAvailability = async (date: string) => {
    if (dateAvailability[date] !== undefined) return; // Already checked
    
    setCheckingDate(date);
    try {
      const result = await consultationAPI.checkDateAvailability(date);
      setDateAvailability(prev => ({
        ...prev,
        [date]: result.available
      }));
    } catch (error) {
      console.error('Error checking date:', error);
      setDateAvailability(prev => ({
        ...prev,
        [date]: true // Fallback to available
      }));
    } finally {
      setCheckingDate(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    console.log('🚀 Form submission started...')
    console.log('📝 Form data:', { ...formData, selectedDate, selectedTime })
    
    try {
      const result = await consultationAPI.bookConsultation({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
        date: selectedDate,
        time: selectedTime
      });

      console.log('📊 Booking result:', result)

      if (result.success) {
        console.log('✅ Booking successful!')
        
        // Mark date as unavailable
        setDateAvailability(prev => ({
          ...prev,
          [selectedDate]: false
        }));
        
        setSubmissionData({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          date: selectedDate,
          time: selectedTime,
          emailSent: result.emailSent,
          isDemoMode: result.consultation?.id?.startsWith('demo-') || result.consultation?.id?.startsWith('fallback-'),
          hasError: !!result.error
        });
        
        setShowConfetti(true);
        setIsSubmitted(true);
        
        // Reset form after 25 seconds
        setTimeout(() => {
          console.log('🔄 Resetting form...')
          setIsSubmitted(false);
          setSubmissionData(null);
          setShowConfetti(false);
          setCurrentStep(1);
          setSelectedDate('');
          setSelectedTime('');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            description: ''
          });
        }, 25000);
      } else {
        console.error('❌ Booking failed:', result)
        setError(result.message || 'Greška pri rezervaciji konzultacije');
      }

    } catch (error) {
      console.error('❌ Submission error:', error);
      setError('Greška pri slanju rezervacije. Molimo pokušajte ponovno.');
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

  const isFormValid = selectedDate && selectedTime && formData.firstName && formData.lastName && formData.email && formData.phone && formData.description;

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {isSubmitted ? (
          <div className="text-center py-20 px-8">
            {/* Success Animation */}
            <div className="relative mb-12">
              <div className="w-40 h-40 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl">
                <CheckCircle className="w-20 h-20 text-white animate-bounce" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-8 -left-8 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <h3 className="text-5xl font-bold text-gray-900 mb-8">
              🎉 Fantastično!
            </h3>
            
            <p className="text-2xl text-gray-600 mb-12">
              Vaša konzultacija je uspješno rezervirana!
            </p>
            
            {/* Status indicators */}
            <div className="mb-12 space-y-6">
              {submissionData?.isDemoMode && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                  <div className="flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
                    <p className="text-yellow-800 font-semibold text-lg">Demo mode - Supabase nije konfiguriran</p>
                  </div>
                </div>
              )}
              
              {submissionData?.hasError && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                  <div className="flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
                    <p className="text-orange-800 font-semibold text-lg">Rezervacija je spremljena, ali došlo je do greške s email-ovima</p>
                  </div>
                </div>
              )}
              
              {submissionData?.emailSent ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <p className="text-green-800 font-semibold text-lg">📧 Email obavijesti su uspješno poslane!</p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 mr-3" />
                    <p className="text-blue-800 font-semibold text-lg">Rezervacija je spremljena - kontaktirat ćemo vas direktno</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-10 mb-12 border-2 border-green-200">
              <h4 className="text-2xl font-bold text-green-800 mb-8 flex items-center justify-center">
                <Trophy className="w-8 h-8 mr-3" />
                📋 Vaša rezervacija
              </h4>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <User className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-gray-700 text-lg">Ime:</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-xl">{submissionData?.name}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <Mail className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-gray-700 text-lg">Email:</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-xl">{submissionData?.email}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <Phone className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-gray-700 text-lg">Telefon:</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-xl">{submissionData?.phone}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-gray-700 text-lg">Datum:</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-xl">
                    {submissionData?.date && new Date(submissionData.date).toLocaleDateString('hr-HR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 md:col-span-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <Clock className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-gray-700 text-lg">Vrijeme:</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-2xl text-center">{submissionData?.time}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 border-2 border-blue-200">
              <div className="flex items-center justify-center mb-8">
                <Zap className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="text-2xl font-bold text-blue-800">🔄 Što slijedi?</h4>
              </div>
              <div className="space-y-6 text-blue-700">
                <div className="flex items-center justify-center bg-white rounded-2xl p-6 shadow-lg">
                  <span className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-bold mr-6">1</span>
                  <span className="text-lg font-semibold">Kontaktirat ćemo vas u roku od 2 sata</span>
                </div>
                <div className="flex items-center justify-center bg-white rounded-2xl p-6 shadow-lg">
                  <span className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-bold mr-6">2</span>
                  <span className="text-lg font-semibold">Poslat ćemo email potvrdu i kalendarski poziv</span>
                </div>
                <div className="flex items-center justify-center bg-white rounded-2xl p-6 shadow-lg">
                  <span className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-bold mr-6">3</span>
                  <span className="text-lg font-semibold">Pripremite pitanja za konzultaciju</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a
                href="tel:+385123456789"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:scale-105"
              >
                <Phone className="w-6 h-6 mr-3" />
                Pozovite nas odmah
              </a>
              <a
                href="/"
                className="inline-flex items-center px-10 py-5 border-3 border-gray-300 text-gray-700 font-bold text-xl rounded-2xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              >
                Povratak na početnu
              </a>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full text-lg text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                Forma će se resetirati za 25 sekundi...
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[
                  { step: 1, title: 'Datum', icon: Calendar },
                  { step: 2, title: 'Vrijeme', icon: Clock },
                  { step: 3, title: 'Podaci', icon: User }
                ].map(({ step, title, icon: Icon }) => {
                  const status = getStepStatus(step);
                  return (
                    <div key={step} className="flex items-center">
                      <div className={`flex items-center space-x-3 ${step < 3 ? 'mr-8' : ''}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          status === 'completed' 
                            ? 'bg-green-500 text-white scale-110' 
                            : status === 'active'
                            ? 'bg-white text-blue-600 scale-110 shadow-lg'
                            : 'bg-white/30 text-white/70'
                        }`}>
                          {status === 'completed' ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </div>
                        <span className={`font-semibold transition-all duration-300 ${
                          status === 'active' ? 'text-white text-lg' : 'text-white/70'
                        }`}>
                          {title}
                        </span>
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-500 ${
                          step < currentStep ? 'bg-green-400' : 'bg-white/30'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Rezervirajte besplatnu konzultaciju
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Odaberite datum i vrijeme koji vam odgovaraju
                </p>
                
                {/* Configuration status */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
                    <p className="text-blue-800 font-medium">
                      {import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://demo.supabase.co' 
                        ? '✅ Supabase konfiguriran - rezervacije se spremaju u bazu'
                        : 'Demo mode - Supabase nije konfiguriran (rezervacije se simuliraju)'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Error display */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                    <p className="text-red-800 font-semibold">{error}</p>
                  </div>
                </div>
              )}

              {/* Step 1: Date Selection */}
              <div className={`transition-all duration-500 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <label className="block text-2xl font-bold text-gray-700 mb-8 flex items-center">
                  <Calendar className="w-8 h-8 mr-3 text-blue-600" />
                  Korak 1: Odaberite datum
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {availableDates.map((dateOption) => (
                    <button
                      key={dateOption.date}
                      type="button"
                      onClick={() => {
                        checkDateAvailability(dateOption.date);
                        setSelectedDate(dateOption.date);
                      }}
                      onMouseEnter={() => checkDateAvailability(dateOption.date)}
                      disabled={dateAvailability[dateOption.date] === false}
                      className={`p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 relative ${
                        dateAvailability[dateOption.date] === false
                          ? 'border-red-300 bg-red-50 text-red-500 cursor-not-allowed opacity-60'
                        : selectedDate === dateOption.date
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xl scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-lg'
                      }`}
                    >
                      {checkingDate === dateOption.date && (
                        <div className="absolute top-2 right-2">
                          <Loader className="w-4 h-4 animate-spin text-blue-500" />
                        </div>
                      )}
                      {dateAvailability[dateOption.date] === false && (
                        <div className="absolute top-2 right-2">
                          <span className="text-red-500 font-bold">✗</span>
                        </div>
                      )}
                      <div className="text-lg font-bold">{dateOption.display}</div>
                      {dateAvailability[dateOption.date] === false && (
                        <div className="text-sm text-red-500 mt-1 font-semibold">Rezervirano</div>
                      )}
                      {selectedDate === dateOption.date && (
                        <div className="text-sm text-blue-600 mt-2 font-semibold">✓ Odabrano</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Time Selection */}
              {selectedDate && (
                <div className={`transition-all duration-500 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                  <label className="block text-2xl font-bold text-gray-700 mb-8 flex items-center">
                    <Clock className="w-8 h-8 mr-3 text-blue-600" />
                    Korak 2: Odaberite vrijeme
                  </label>
                  <div className="mb-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                    <p className="text-blue-800 font-semibold text-lg text-center">
                      📅 {availableDates.find(d => d.date === selectedDate)?.fullDisplay}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`relative p-4 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                          !slot.available
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : selectedTime === slot.time
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xl scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-lg'
                        }`}
                      >
                        <div className="font-bold text-lg">{slot.time}</div>
                        {slot.popular && slot.available && (
                          <div className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full font-bold">
                            Popularno
                          </div>
                        )}
                        {selectedTime === slot.time && (
                          <div className="text-sm text-blue-600 mt-1 font-semibold">✓ Odabrano</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Personal Information */}
              {selectedTime && (
                <div className={`transition-all duration-500 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center mb-8">
                    <User className="w-8 h-8 mr-3 text-blue-600" />
                    Korak 3: Vaši podaci
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label htmlFor="firstName" className="block text-lg font-bold text-gray-700 mb-3">
                          Ime *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                          placeholder="Vaše ime"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-lg font-bold text-gray-700 mb-3">
                          Prezime *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                          placeholder="Vaše prezime"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-3">
                        <Mail className="w-5 h-5 inline mr-2" />
                        Email adresa *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="vasa.adresa@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-lg font-bold text-gray-700 mb-3">
                        <Phone className="w-5 h-5 inline mr-2" />
                        Broj telefona *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="+385 xx xxx xxxx"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-lg font-bold text-gray-700 mb-3">
                        <MessageSquare className="w-5 h-5 inline mr-2" />
                        Opis razgovora *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-lg"
                        placeholder="Opišite što biste htjeli razgovarati na konzultaciji..."
                      />
                    </div>

                    <div className="text-center pt-8">
                      <button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className={`px-12 py-6 font-bold text-xl rounded-2xl transition-all duration-300 flex items-center justify-center mx-auto transform ${
                          isFormValid && !isLoading
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-2xl hover:shadow-blue-500/25'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader className="w-6 h-6 mr-3 animate-spin" />
                            Rezervira se...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-6 h-6 mr-3" />
                            Rezerviraj konzultaciju
                            <ArrowRight className="w-6 h-6 ml-3" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center text-lg text-gray-500">
                      * Obavezna polja
                    </div>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}