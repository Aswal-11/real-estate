import { createClient } from '@supabase/supabase-js';

// Initialize Supabase safely
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
}

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      project_name, 
      full_name, 
      mobile_number, 
      email, 
      configuration_interested, 
      budget_range 
    } = req.body;

    // Validation
    if (!project_name || !full_name || !mobile_number || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Database credentials not configured. Please add SUPABASE_URL and SUPABASE_KEY to your environment variables.' });
    }

    // Check for duplicates (same phone + project within 24 hours)
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('mobile_number', mobile_number)
      .eq('project_name', project_name)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .single();

    if (existingLead) {
      return res.status(409).json({ 
        error: 'Lead already submitted for this project in the last 24 hours',
        isDuplicate: true 
      });
    }

    // Insert lead into database
    const { data: newLead, error: insertError } = await supabase
      .from('leads')
      .insert([{
        project_name,
        full_name,
        mobile_number,
        email,
        configuration_interested,
        budget_range
      }])
      .select();

    if (insertError) {
      console.error('Database error:', insertError);
      return res.status(500).json({ 
        error: 'Failed to save lead' 
      });
    }

    // Success response
    res.status(201).json({ 
      success: true, 
      message: 'Lead submitted successfully',
      leadId: newLead?.[0]?.id 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}
