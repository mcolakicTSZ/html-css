const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailNotificationRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  description: string
  date: string
  time: string
}

Deno.serve(async (req) => {
  console.log('📧 Email notification function called')
  console.log('📧 Request method:', req.method)
  console.log('📧 Request URL:', req.url)
  console.log('📧 All environment variables:', Object.keys(Deno.env.toObject()))
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const requestBody = await req.json()
    console.log('📧 Email request body received')
    console.log('📧 Request keys:', Object.keys(requestBody))
    
    // Check if Resend API key is available
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    console.log('📧 RESEND_API_KEY exists:', !!resendApiKey)
    console.log('📧 RESEND_API_KEY length:', resendApiKey ? resendApiKey.length : 0)
    console.log('📧 RESEND_API_KEY starts with re_:', resendApiKey ? resendApiKey.startsWith('re_') : false)
    console.log('📧 All env vars:', Object.keys(Deno.env.toObject()).join(', '))
    
    const { firstName, lastName, email, phone, description, date, time }: EmailNotificationRequest = requestBody

    console.log('📧 Processing email for:', firstName, lastName, email)
    
    // Format date for Croatian locale
    const consultationDate = new Date(date).toLocaleDateString('hr-HR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    console.log('📧 Formatted date:', consultationDate)

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not found in environment variables!')
      console.error('❌ Available environment variables:', Object.keys(Deno.env.toObject()))
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'RESEND_API_KEY nije konfiguriran u Supabase Edge Functions',
          emailSent: false
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare admin email
    const adminEmailSubject = `🗓️ NOVA REZERVACIJA - ${firstName} ${lastName}`
    
    const adminEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
          .header { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 30px 20px; border-radius: 12px; text-align: center; margin-bottom: 20px; }
          .content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
          .info-box { background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0; }
          .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 NOVA REZERVACIJA KONZULTACIJE</h1>
            <p style="margin: 0; font-size: 18px;">Rezly Professional Solutions</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 20px;">📋 Podaci o klijentu</h2>
            
            <div class="info-box">
              <strong>👤 IME:</strong> ${firstName} ${lastName}<br>
              <strong>📧 EMAIL:</strong> <a href="mailto:${email}">${email}</a><br>
              <strong>📞 TELEFON:</strong> <a href="tel:${phone}">${phone}</a><br>
              <strong>📅 DATUM:</strong> ${consultationDate}<br>
              <strong>🕐 VRIJEME:</strong> ${time}
            </div>
            
            <div class="info-box">
              <strong>💬 OPIS RAZGOVORA:</strong><br>
              ${description}
            </div>
          </div>
          
          <div class="footer">
            <p>📧 Automatski generirano iz Rezly sustava</p>
            <p>🕐 ${new Date().toLocaleString('hr-HR')}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Prepare client confirmation email
    const clientEmailSubject = `✅ Potvrda rezervacije - Rezly`
    
    const clientEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; border-radius: 12px; text-align: center; margin-bottom: 20px; }
          .content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
          .info-box { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
          .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Konzultacija rezervirana!</h1>
            <p style="margin: 0; font-size: 18px;">Hvala vam ${firstName}!</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1e293b;">📋 Vaša rezervacija</h2>
            
            <div class="info-box">
              <p><strong>📅 Datum:</strong> ${consultationDate}</p>
              <p><strong>🕐 Vrijeme:</strong> ${time}</p>
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>📞 Telefon:</strong> ${phone}</p>
            </div>
            
            <h3>🔄 Što slijedi?</h3>
            <ol>
              <li>Kontaktirat ćemo vas u roku od 2 sata</li>
              <li>Poslat ćemo kalendarski poziv</li>
              <li>Pripremite pitanja o vašem poslovanju</li>
            </ol>
            
            <p style="text-align: center; margin: 30px 0;">
              <strong>Kontakt:</strong><br>
              📞 +385 1 234 5678<br>
              📧 info@rezly.com
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 Rezly Professional Solutions</p>
          </div>
        </div>
      </body>
      </html>
    `

    let emailResults = { adminSent: false, clientSent: false }
    
    try {
      console.log('📧 Sending admin email...')
      console.log('📧 Using Resend API key:', resendApiKey.substring(0, 10) + '...')
      
      // Send admin notification
      console.log('📧 Preparing admin email...')
      const adminEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Rezly <onboarding@resend.dev>',
          to: ['info@rezly.com'], // Zamijenite s vašim email-om
          subject: adminEmailSubject + ' [LIVE]',
          html: adminEmailBody
        })
      })

      console.log('📧 Admin email status:', adminEmailResponse.status)
      console.log('📧 Admin email response headers:', Object.fromEntries(adminEmailResponse.headers.entries()))
      
      if (!adminEmailResponse.ok) {
        const errorText = await adminEmailResponse.text()
        console.error('❌ Admin email failed!')
        console.error('❌ Status:', adminEmailResponse.status)
        console.error('❌ Error:', errorText)
      } else {
        const successResponse = await adminEmailResponse.json()
        console.log('✅ Admin email success response:', successResponse)
      }
      
      emailResults.adminSent = adminEmailResponse.ok

      // Send client confirmation if email is provided
      if (email) {
        console.log('📧 Sending client email...')
        console.log('📧 Client email address:', email)
        
        const clientEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Rezly <onboarding@resend.dev>',
            to: [email],
            subject: clientEmailSubject,
            html: clientEmailBody
          })
        })

        console.log('📧 Client email status:', clientEmailResponse.status)
        console.log('📧 Client email response headers:', Object.fromEntries(clientEmailResponse.headers.entries()))
        
        if (!clientEmailResponse.ok) {
          const errorText = await clientEmailResponse.text()
          console.error('❌ Client email failed!')
          console.error('❌ Status:', clientEmailResponse.status)
          console.error('❌ Error:', errorText)
        } else {
          const successResponse = await clientEmailResponse.json()
          console.log('✅ Client email success response:', successResponse)
        }
        
        emailResults.clientSent = clientEmailResponse.ok
      }

    } catch (emailError) {
      console.error('❌ CRITICAL EMAIL ERROR:', emailError)
      console.error('❌ Error details:', emailError.message)
      console.error('❌ Error stack:', emailError.stack)
    }

    console.log('📧 Email results:', emailResults)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email obavijesti poslane',
        emailResults: emailResults
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('❌ Email notification error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Greška pri slanju email-ova',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})