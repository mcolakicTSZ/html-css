const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface NotificationRequest {
  type: string
  consultation: {
    id: string
    first_name: string
    last_name: string
    phone: string
    description: string
    consultation_date: string
    consultation_time: string
    created_at: string
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type, consultation }: NotificationRequest = await req.json()

    if (type === 'new_consultation') {
      // Format date for Croatian locale
      const consultationDate = new Date(consultation.consultation_date).toLocaleDateString('hr-HR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Prepare email content
      const emailSubject = `🗓️ Nova rezervacija konzultacije - ${consultation.first_name} ${consultation.last_name}`
      
      const emailBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .info-box { background: white; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 4px solid #3b82f6; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🗓️ Nova rezervacija konzultacije</h1>
              <p>Rezly Professional Solutions</p>
            </div>
            
            <div class="content">
              <h2>Podaci o klijentu:</h2>
              <div class="info-box">
                <strong>👤 Ime:</strong> ${consultation.first_name} ${consultation.last_name}<br>
                <strong>📞 Telefon:</strong> <a href="tel:${consultation.phone}">${consultation.phone}</a><br>
                <strong>📅 Datum:</strong> ${consultationDate}<br>
                <strong>🕐 Vrijeme:</strong> ${consultation.consultation_time}
              </div>
              
              <h3>💬 Opis razgovora:</h3>
              <div class="info-box">
                ${consultation.description}
              </div>
              
              <h3>ℹ️ Dodatne informacije:</h3>
              <div class="info-box">
                <strong>🆔 ID rezervacije:</strong> ${consultation.id}<br>
                <strong>⏰ Vrijeme rezervacije:</strong> ${new Date(consultation.created_at).toLocaleString('hr-HR')}
              </div>
            </div>
            
            <div class="footer">
              <p>Ova poruka je automatski generirana iz Rezly sustava.</p>
              <p>© 2024 Rezly Professional Solutions</p>
            </div>
          </div>
        </body>
        </html>
      `

      // Send email using Resend
      const emailData = {
        from: 'Rezly <noreply@rezly.com>',
        to: ['admin@rezly.com'], // Zamijenite s vašim emailom
        subject: emailSubject,
        html: emailBody
      }

      const resendApiKey = Deno.env.get('RESEND_API_KEY')
      
      if (resendApiKey) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        })

        if (!emailResponse.ok) {
          console.error('Failed to send email:', await emailResponse.text())
        } else {
          console.log('📧 Email sent successfully to admin')
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Obavijesti su poslane',
            emailSent: emailResponse.ok
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      } else {
        console.log('⚠️ RESEND_API_KEY not configured, email not sent')
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Rezervacija spremljena, ali email nije poslan (RESEND_API_KEY nije konfiguriran)',
            emailSent: false
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    return new Response(
      JSON.stringify({ error: 'Nepoznat tip obavijesti' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Notification error:', error)
    return new Response(
      JSON.stringify({ error: 'Greška pri slanju obavijesti' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})