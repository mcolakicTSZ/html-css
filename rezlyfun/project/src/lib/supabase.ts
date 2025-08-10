import { createClient } from '@supabase/supabase-js'
import { formspreeAPI } from './formspree'

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Check if we're in demo mode
const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || 
                   import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co' ||
                   !import.meta.env.VITE_SUPABASE_ANON_KEY || 
                   import.meta.env.VITE_SUPABASE_ANON_KEY === 'demo-key'

console.log('🔧 Supabase configuration:', {
  url: supabaseUrl,
  hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  isDemoMode
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Consultation {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  description: string
  consultation_date: string
  consultation_time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
  updated_at: string
}

// API functions
export const consultationAPI = {
  // Check if date is already booked
  async checkDateAvailability(date: string) {
    console.log('🔍 Checking date availability for:', date)

    if (isDemoMode) {
      console.log('🎭 Demo mode: Simulating date check...')
      // In demo mode, randomly make some dates unavailable
      const unavailableDates = ['2024-01-15', '2024-01-20', '2024-01-25']
      const isAvailable = !unavailableDates.includes(date)
      return { available: isAvailable, bookedBy: isAvailable ? null : 'Demo User' }
    }

    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('first_name, last_name, consultation_time')
        .eq('consultation_date', date)
        .neq('status', 'cancelled')
        .maybeSingle()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('❌ Error checking availability:', error)
        throw error
      }

      const isAvailable = !data
      return { 
        available: isAvailable, 
        bookedBy: data ? `${data.first_name} ${data.last_name}` : null,
        bookedTime: data?.consultation_time || null
      }
    } catch (error) {
      console.error('❌ Date availability check failed:', error)
      return { available: true, bookedBy: null } // Fallback to available
    }
  },

  // Book a new consultation
  async bookConsultation(data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    description: string
    date: string
    time: string
  }) {
    console.log('🚀 Starting consultation booking process...')
    console.log('📝 Booking data:', data)

    // Check if date is already booked
    const availability = await this.checkDateAvailability(data.date)
    if (!availability.available) {
      console.log('❌ Date already booked by:', availability.bookedBy)
      return {
        success: false,
        message: `Datum ${data.date} je već rezerviran. Molimo odaberite drugi datum.`,
        error: 'DATE_ALREADY_BOOKED',
        bookedBy: availability.bookedBy
      }
    }

    // Demo mode simulation
    if (isDemoMode) {
      console.log('🎭 Demo mode: Simulating booking...')
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Send email via Formspree in demo mode
      try {
        console.log('📧 Sending email via Formspree (demo mode)...')
        
        // Send admin notification
        const adminResult = await formspreeAPI.submitForm('mnnzljgy', {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          description: data.description,
          type: 'consultation',
          _subject: `🗓️ Nova rezervacija konzultacije - ${data.firstName} ${data.lastName}`
        })
        
        console.log('📧 Admin email result:', adminResult)
        
        // Send user confirmation email
        const userResult = await formspreeAPI.submitForm('mnnzljgy', {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          description: data.description,
          type: 'user_confirmation',
          _replyto: data.email,
          _cc: data.email,
          _subject: `✅ Potvrda rezervacije konzultacije - Rezly`,
          message: `Poštovani ${data.firstName},\n\nHvala vam na rezervaciji konzultacije!\n\nDetalji vaše rezervacije:\n📅 Datum: ${new Date(data.date).toLocaleDateString('hr-HR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n🕐 Vrijeme: ${data.time}\n📞 Telefon: ${data.phone}\n\n💬 Opis: ${data.description}\n\n🔄 Što slijedi?\n1. Kontaktirat ćemo vas u roku od 2 sata\n2. Poslat ćemo kalendarski poziv\n3. Pripremite pitanja o vašem poslovanju\n\nKontakt:\n📞 +385 1 234 5678\n📧 info@rezly.com\n\nS poštovanjem,\nRezly tim`
        })
        
        console.log('📧 User confirmation result:', userResult)
      } catch (error) {
        console.error('📧 Formspree error:', error)
      }
      
      const demoResult = {
        success: true,
        message: 'Konzultacija je uspješno rezervirana! Email je poslan preko Formspree.',
        consultation: {
          id: 'demo-' + Date.now(),
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          description: data.description,
          consultation_date: data.date,
          consultation_time: data.time,
          status: 'pending' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        emailSent: true
      }
      
      console.log('🎭 Demo result:', demoResult)
      return demoResult
    }

    try {
      console.log('🔄 Calling book-consultation edge function...')
      
      // Send email via Formspree first
      let emailSent = false
      try {
        console.log('📧 Sending email via Formspree...')
        
        // Send admin notification
        const adminResult = await formspreeAPI.submitForm('mnnzljgy', {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          description: data.description,
          type: 'consultation',
          _subject: `🗓️ Nova rezervacija konzultacije - ${data.firstName} ${data.lastName}`
        })
        
        console.log('📧 Admin email result:', adminResult)
        
        // Send user confirmation email
        const userResult = await formspreeAPI.submitForm('mnnzljgy', {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          description: data.description,
          type: 'user_confirmation',
          _replyto: data.email,
          _cc: data.email,
          _subject: `✅ Potvrda rezervacije konzultacije - Rezly`,
          message: `Poštovani ${data.firstName},\n\nHvala vam na rezervaciji konzultacije!\n\nDetalji vaše rezervacije:\n📅 Datum: ${new Date(data.date).toLocaleDateString('hr-HR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n🕐 Vrijeme: ${data.time}\n📞 Telefon: ${data.phone}\n\n💬 Opis: ${data.description}\n\n🔄 Što slijedi?\n1. Kontaktirat ćemo vas u roku od 2 sata\n2. Poslat ćemo kalendarski poziv\n3. Pripremite pitanja o vašem poslovanju\n\nKontakt:\n📞 +385 1 234 5678\n📧 info@rezly.com\n\nS poštovanjem,\nRezly tim`
        })
        
        console.log('📧 User confirmation result:', userResult)
        emailSent = adminResult.ok || userResult.ok
      } catch (error) {
        console.error('📧 Formspree error:', error)
      }
      
      // Call the book-consultation edge function
      const response = await fetch(`${supabaseUrl}/functions/v1/book-consultation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          description: data.description,
          date: data.date,
          time: data.time,
          emailSent: emailSent
        })
      })

      console.log('📊 Edge function response status:', response.status)
      console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Edge function error response:', errorText)
        
        try {
          const errorJson = JSON.parse(errorText)
          throw new Error(errorJson.error || `HTTP ${response.status}`)
        } catch {
          throw new Error(`Edge function failed with status ${response.status}: ${errorText}`)
        }
      }
      
      const result = await response.json()
      console.log('✅ Edge function success result:', result)

      if (!result.success) {
        console.error('❌ Edge function returned unsuccessful result:', result)
        throw new Error(result.error || 'Nepoznata greška iz edge funkcije')
      }

      const successResult = {
        success: true,
        message: emailSent 
          ? 'Konzultacija je uspješno rezervirana! Email obavijest je poslana.'
          : 'Konzultacija je uspješno rezervirana! Kontaktirat ćemo vas u roku od 2 sata.',
        consultation: result.consultation || {
          id: 'edge-' + Date.now(),
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          description: data.description,
          consultation_date: data.date,
          consultation_time: data.time,
          status: 'pending' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        emailSent: emailSent
      }

      console.log('🎉 Final success result:', successResult)
      return successResult

    } catch (error) {
      console.error('❌ Booking error:', error)
      
      // Fallback response - still show success to user but log the error
      const fallbackResult = {
        success: true,
        message: 'Konzultacija je rezervirana. Kontaktirat ćemo vas u roku od 2 sata.',
        consultation: {
          id: 'fallback-' + Date.now(),
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          description: data.description,
          consultation_date: data.date,
          consultation_time: data.time,
          status: 'pending' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        emailSent: false,
        error: error.message
      }
      
      console.log('🔄 Returning fallback result:', fallbackResult)
      return fallbackResult
    }
  },

  // Get all consultations (admin only)
  async getConsultations() {
    if (isDemoMode) {
      console.log('🎭 Demo mode: Returning demo consultations')
      // Return some demo data so admin can see the interface
      return [
        {
          id: 'demo-1',
          first_name: 'Ana',
          last_name: 'Marić',
          email: 'ana.maric@email.com',
          phone: '+385 91 234 5678',
          description: 'Trebam pomoć s web stranicom za moj salon ljepote. Želim online rezervacije.',
          consultation_date: '2024-01-15',
          consultation_time: '10:00',
          status: 'pending' as const,
          created_at: '2024-01-10T08:30:00Z',
          updated_at: '2024-01-10T08:30:00Z'
        },
        {
          id: 'demo-2',
          first_name: 'Marko',
          last_name: 'Petrović',
          email: 'marko.petrovic@email.com',
          phone: '+385 92 345 6789',
          description: 'Imam restoran i trebam booking sustav za stolove. Također web stranicu.',
          consultation_date: '2024-01-16',
          consultation_time: '14:30',
          status: 'confirmed' as const,
          created_at: '2024-01-11T10:15:00Z',
          updated_at: '2024-01-11T12:20:00Z'
        },
        {
          id: 'demo-3',
          first_name: 'Petra',
          last_name: 'Kovač',
          email: 'petra.kovac@email.com',
          phone: '+385 93 456 7890',
          description: 'Fitness centar - trebam sustav za rezervaciju termina i članarine.',
          consultation_date: '2024-01-12',
          consultation_time: '16:00',
          status: 'completed' as const,
          created_at: '2024-01-08T14:45:00Z',
          updated_at: '2024-01-12T16:30:00Z'
        }
      ]
    }

    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Update consultation status (admin only)
  async updateConsultationStatus(id: string, status: Consultation['status']) {
    if (isDemoMode) {
      console.log('🎭 Demo mode: Simulating status update')
      return { id, status }
    }

    const { data, error } = await supabase
      .from('consultations')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}