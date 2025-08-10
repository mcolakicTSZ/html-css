import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ConsultationRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  description: string
  date: string
  time: string
}

Deno.serve(async (req) => {
  console.log('🚀 Book consultation function called')
  console.log('🚀 Request method:', req.method)
  console.log('🚀 Request URL:', req.url)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('📋 Handling CORS preflight')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    console.log('🔧 Supabase URL exists:', !!supabaseUrl)
    console.log('🔧 Service key exists:', !!supabaseServiceKey)
    console.log('🔧 Resend API key exists:', !!resendApiKey)
    console.log('🔧 Available environment variables:', Object.keys(Deno.env.toObject()))

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase configuration')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    const requestBody = await req.json()
    console.log('📝 Request body received:', requestBody)
    
    const { firstName, lastName, email, phone, description, date, time }: ConsultationRequest = requestBody

    // Validate required fields
    if (!firstName || !lastName || !phone || !description || !date || !time) {
      console.error('❌ Missing required fields')
      return new Response(
        JSON.stringify({ error: 'Sva polja su obavezna' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ All required fields present')

    // Insert consultation into database
    console.log('💾 Inserting into database...')
    const { data: consultation, error: dbError } = await supabaseClient
      .from('consultations')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email || '',
        phone: phone,
        description: description,
        consultation_date: date,
        consultation_time: time,
        status: 'pending'
      })
      .select()
      .single()

    if (dbError) {
      console.error('❌ Database error:', dbError)
      return new Response(
        JSON.stringify({ 
          error: 'Greška pri spremanju rezervacije',
          details: dbError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ Consultation saved to database:', consultation.id)

    // Send email notifications
    console.log('📧 Attempting to send email notifications...')
    console.log('📧 Supabase URL for email function:', supabaseUrl)
    console.log('📧 Available environment variables:', Object.keys(Deno.env.toObject()))
    console.log('📧 RESEND_API_KEY exists:', !!Deno.env.get('RESEND_API_KEY'))
    let emailSent = false
    
    try {
      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email-notification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          description: description,
          date: date,
          time: time
        })
      })

      console.log('📧 Email response status:', emailResponse.status)
      
      if (emailResponse.ok) {
        const emailResult = await emailResponse.json()
        console.log('✅ Email notifications sent successfully:', emailResult)
        emailSent = emailResult.emailResults?.adminSent || emailResult.emailResults?.clientSent || false
      } else {
        const errorText = await emailResponse.text()
        console.error('❌ Email function failed!')
        console.error('❌ Status:', emailResponse.status)
        console.error('❌ Response:', errorText)
      }
    } catch (emailError) {
      console.error('❌ CRITICAL: Email function call failed!')
      console.error('❌ Error:', emailError.message)
      console.error('❌ Stack:', emailError.stack)
    }

    // Return success response
    const successResponse = { 
      success: true, 
      message: emailSent 
        ? 'Konzultacija je uspješno rezervirana! Email obavijesti su poslane.'
        : 'Konzultacija je uspješno rezervirana!',
      consultation: consultation,
      emailSent: emailSent
    }

    console.log('🎉 Returning success response:', successResponse)

    return new Response(
      JSON.stringify(successResponse),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Neočekivana greška',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})