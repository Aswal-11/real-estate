import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Routes to serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/godrej', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'godrej.html'));
});

app.get('/oberoi', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'oberoi.html'));
});

// API endpoint for lead submission
app.post('/api/leads', async (req, res) => {
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
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════════════╗
  ║  Real Estate Landing Pages Server Running                   ║
  ║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
  ║  🌐 Home:     http://localhost:${PORT}                     ║
  ║  🏢 Godrej:   http://localhost:${PORT}/godrej             ║
  ║  🏢 Oberoi:   http://localhost:${PORT}/oberoi             ║
  ║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
  ║  API: POST /api/leads (for form submissions)               ║
  ╚══════════════════════════════════════════════════════════════╝
  `);
});
