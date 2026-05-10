# Quick Start Guide - HTML/CSS/JS Version

Get your premium real estate landing pages running in 5 minutes!

## 🚀 Step-by-Step Setup

### Step 1: Clone or Download Project
```bash
# If you have the ZIP file
unzip real-estate-landing-pages.zip
cd real-estate-landing-pages
```

### Step 2: Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

**What gets installed:**
- express (4.18.2) - Web server framework
- cors (2.8.5) - Cross-origin support
- dotenv (16.3.1) - Environment configuration
- @supabase/supabase-js (2.38.4) - Database client

### Step 3: Setup Supabase

#### 3a. Create Supabase Project
1. Go to https://supabase.com
2. Sign up / Log in
3. Create a new project
4. Wait for setup (2-3 minutes)

#### 3b. Get Your Credentials
1. Go to **Settings → API**
2. Copy:
   - `Project URL`
   - `anon public key`
3. Copy these values

#### 3c. Create Environment File
```bash
# Copy the example
cp .env.example .env

# Edit .env file
nano .env
# Or use your preferred editor
```

Add your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
PORT=3000
```

### Step 4: Create Database Table

The leads table is automatically created by Supabase when you connect. If needed, manually run:

1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Create a new query with:

```sql
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  configuration_interested TEXT,
  budget_range TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select all" ON public.leads
  FOR SELECT USING (true);

CREATE INDEX idx_leads_project_name ON public.leads(project_name);
CREATE INDEX idx_leads_mobile_number ON public.leads(mobile_number);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
```

4. Run the query

### Step 5: Run the Server

```bash
# Development mode (with auto-reload)
pnpm dev

# Or production mode
pnpm start
```

**Output:**
```
Server running on http://localhost:3000
```

### Step 6: Visit Your Landing Pages

Open in browser:
- **Home**: http://localhost:3000/
- **Godrej**: http://localhost:3000/godrej
- **Oberoi**: http://localhost:3000/oberoi

## ✅ Verification Checklist

- [ ] Server running on http://localhost:3000
- [ ] Home page loads with project cards
- [ ] Godrej page displays hero and amenities
- [ ] Oberoi page displays with blue theme
- [ ] Click "Inquire" button - form modal opens
- [ ] Fill form and submit
- [ ] Success message appears
- [ ] Check Supabase dashboard - lead is saved

## 🔧 Customization

### Change Phone Numbers
Open `views/godrej.html` and `views/oberoi.html`:

```html
<!-- Find this line and update -->
<body data-phone-number="+919876543210" data-whatsapp-number="919876543210">
```

Change to your numbers:
```html
<body data-phone-number="+919898765432" data-whatsapp-number="919898765432">
```

### Update Pricing
Find the pricing section and update:

```html
<p class="text-3xl font-bold text-gray-900">₹49.99 L</p>
```

### Add Your Images
Replace images in `public/images/`:
- godrej-hero.jpg (hero banner)
- godrej-overview.jpg (project overview)
- godrej-location.jpg (location map)
- godrej-gallery1.jpg, 2.jpg, 3.jpg (amenity photos)
- (Same pattern for oberoi-*)

### Update Meta Pixel ID
In `public/js/main.js`, find:

```javascript
function initMetaPixel() {
  fbq('init', '1234567890');  // ← Update this
}
```

Replace with your actual Pixel ID from Meta Business Manager.

## 📁 File Structure

```
├── server.js               ← Express server (don't modify unless needed)
├── package.json            ← Dependencies (npm/pnpm)
├── .env                    ← Your Supabase credentials (secret!)
├── .env.example            ← Template (reference)
│
├── views/                  ← HTML pages
│   ├── index.html         ← Home page
│   ├── godrej.html        ← Godrej landing
│   └── oberoi.html        ← Oberoi landing
│
└── public/                ← Static files
    ├── css/
    │   └── style.css      ← All styling
    ├── js/
    │   └── main.js        ← All JavaScript
    └── images/            ← Property images
        ├── godrej-*.jpg
        └── oberoi-*.jpg
```

## 🐛 Troubleshooting

### "Cannot find module 'express'"
**Solution:** Run `pnpm install` again

### "Server not starting"
**Solution:** 
- Check port 3000 is not in use
- Check `.env` file exists
- Look for errors in console

### "Form not submitting"
**Solution:**
- Check browser console (F12) for errors
- Verify Supabase URL and key in `.env`
- Check network tab for API response

### "Images not loading"
**Solution:**
- Check images are in `public/images/` folder
- Check image filenames match HTML src attributes
- Browser reload (Ctrl+Shift+R)

### "Leads not saving to database"
**Solution:**
- Verify Supabase credentials in `.env`
- Check browser console for errors
- Go to Supabase dashboard → SQL Editor
- Run: `SELECT * FROM leads;`
- If table doesn't exist, create it manually

## 📊 Check Database

### Via Supabase Dashboard
1. Go to supabase.com and login
2. Select your project
3. Go to **Table Editor**
4. Select **leads** table
5. View all submitted leads

### Via SQL Query
1. Go to **SQL Editor**
2. Run: `SELECT * FROM leads ORDER BY created_at DESC;`

## 🚀 Deploy (Optional)

### Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/repo.git
git push -u origin main

# 2. Go to https://vercel.com
# 3. Click "New Project"
# 4. Import your GitHub repository
# 5. Add Environment Variables:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
# 6. Click "Deploy"
```

### Deploy to Heroku

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Login and deploy
heroku login
heroku create your-app-name
git push heroku main

# Set environment variables
heroku config:set NEXT_PUBLIC_SUPABASE_URL=your_url
heroku config:set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Start server | `pnpm start` |
| Dev mode | `pnpm dev` |
| Stop server | `Ctrl + C` |
| Open home | http://localhost:3000 |
| Open Godrej | http://localhost:3000/godrej |
| Open Oberoi | http://localhost:3000/oberoi |

## ✨ Features Ready to Use

- ✅ Premium hero banners
- ✅ Project overview sections
- ✅ Pricing displays with payment plans
- ✅ Amenities grids
- ✅ Location advantages
- ✅ Image galleries with lightbox
- ✅ Lead capture forms
- ✅ Sticky CTA buttons
- ✅ Mobile responsive design
- ✅ Database lead storage
- ✅ Form validation
- ✅ Success confirmations

## 📚 Learn More

- **Express.js**: https://expressjs.com/
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Meta Pixel**: https://developers.facebook.com/docs/facebook-pixel

## 🎉 You're All Set!

Your premium real estate landing pages are ready to go live. Start capturing leads and growing your business!

**Questions?** Check the `README_HTML_VERSION.md` for detailed documentation.

---

**Happy Launching! 🚀**
