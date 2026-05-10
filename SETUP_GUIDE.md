# Quick Setup Guide - 5 Minutes to Launch

## Step 1: Extract Project (1 minute)
```bash
unzip real-estate-landing-pages.zip
cd real-estate-landing-pages
```

## Step 2: Install Dependencies (2 minutes)
```bash
npm install
# or
pnpm install
# or
yarn install
```

## Step 3: Configure Environment (1 minute)
```bash
cp .env.example .env
```

Edit `.env` file and add your Supabase credentials:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-key-here
META_PIXEL_ID=your-pixel-id-here
PORT=3000
```

## Step 4: Start Server (30 seconds)
```bash
npm start
```

You should see:
```
╔══════════════════════════════════════════════════════════════╗
║  Real Estate Landing Pages Server Running                   ║
║  🌐 Home:     http://localhost:3000                         ║
║  🏢 Godrej:   http://localhost:3000/godrej                 ║
║  🏢 Oberoi:   http://localhost:3000/oberoi                 ║
╚══════════════════════════════════════════════════════════════╝
```

## Step 5: Open in Browser (30 seconds)
Navigate to: `http://localhost:3000`

✅ **Done!** Your landing pages are live!

---

## Quick Customization

### Change Phone Numbers
Edit in `views/godrej.html` and `views/oberoi.html`:
```html
<!-- Find and replace -->
+917799995555    <!-- Old number -->
+919876543210    <!-- Your number -->
```

### Change Company Name
Search and replace "RE Luxe" with your company name in HTML files

### Update Pricing
Open `views/godrej.html` and `views/oberoi.html`, find the pricing section and update amounts

### Add Your Meta Pixel
Get ID from Facebook Business Manager, update in `.env`:
```
META_PIXEL_ID=1234567890
```

---

## For Development (with auto-reload)

```bash
npm run dev
```

This uses nodemon to auto-restart server when files change

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Run server |
| `npm run dev` | Run with auto-reload |
| `npm install` | Install dependencies |

---

## File Structure Overview

```
├── server.js              ← Main server file
├── .env                   ← Your settings (create from .env.example)
├── package.json           ← Project config
├── README.md              ← Full documentation
├── views/                 ← HTML pages
│   ├── index.html        ← Home page
│   ├── godrej.html       ← Godrej project
│   └── oberoi.html       ← Oberoi project
├── public/               ← Static files
│   ├── js/               ← JavaScript
│   │   ├── form.js
│   │   └── gallery.js
│   └── images/           ← Project images
└── routes/               ← API routes
```

---

## Troubleshooting

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Can't connect to database?**
- Check SUPABASE_URL in .env
- Verify SUPABASE_KEY is correct
- Ensure Supabase project is active

**Images not showing?**
- Check if files exist in `public/images/`
- Clear browser cache (Ctrl+Shift+Delete)

**Form not working?**
- Open browser Developer Tools (F12)
- Check Console tab for errors
- Verify API endpoint is accessible

---

## Next Steps

1. ✅ Customize contact numbers
2. ✅ Update Meta Pixel ID
3. ✅ Change company branding
4. ✅ Test forms locally
5. ✅ Deploy to production

---

## Deployment Guides

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Answer prompts, connect GitHub repo

### Heroku
```bash
npm install -g heroku
heroku login
heroku create your-app
git push heroku main
```

### AWS, Google Cloud, etc.
Use standard Node.js deployment procedures for your platform

---

**Need help?** Check README.md for detailed documentation

**Ready to deploy?** Visit your deployment platform's documentation
