# Quick Start Guide - Real Estate Landing Pages

## ⚡ 5 Minute Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Add Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
POSTGRES_URL=your_postgres_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_META_PIXEL_ID=1234567890
```

### 3. Run Development Server
```bash
pnpm dev
```

### 4. Open Browser
Visit: `http://localhost:3000`

---

## 📁 Project Structure at a Glance

```
app/
├── page.tsx              ← Home page
├── godrej/page.tsx       ← Godrej project
├── oberoi/page.tsx       ← Oberoi project
├── api/leads/route.ts    ← Lead form API
└── layout.tsx            ← Meta Pixel setup

components/
├── HeroBanner.tsx        ← Hero section
├── ProjectOverview.tsx   ← Project info
├── PricePayment.tsx      ← Pricing section
├── Amenities.tsx         ← Amenities grid
├── Location.tsx          ← Location info
├── Gallery.tsx           ← Photo gallery
├── LeadForm.tsx          ← Lead capture form
├── StickyCTA.tsx         ← Sticky buttons
└── SuccessModal.tsx      ← Success message

lib/supabase/
├── client.ts             ← Browser client
└── server.ts             ← Server client

public/images/            ← Project images
```

---

## 🎯 Quick Navigation

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Project showcase |
| Godrej | `/godrej` | Godrej Properties landing |
| Oberoi | `/oberoi` | Oberoi Realty landing |

---

## 🔧 Common Tasks

### Update Contact Numbers
```typescript
// In /app/godrej/page.tsx
const PHONE_NUMBER = '+919876543210'  // Change this
const WHATSAPP_NUMBER = '919876543210'  // Change this
```

### Change Project Pricing
```typescript
// In /app/godrej/page.tsx or /app/oberoi/page.tsx
const configurations = [
  {
    name: '1 BHK',
    price: '₹49.99 Lakh',  // Update price
    sqft: '600 - 700 Sq.ft',
  },
  // ...
]
```

### Add New Amenity
```typescript
// In /app/godrej/page.tsx
const amenities = [
  // ... existing amenities
  {
    icon: 'gym',  // Can be: gym, pool, garden, security, parking, community
    name: 'New Amenity',
    description: 'Description of amenity',
  },
]
```

### Update Hero Image
```bash
# 1. Add new image to public/images/
# 2. Update in page component:

<HeroBanner
  imageUrl="/images/new-hero.jpg"  // Change URL
  // ... other props
/>
```

### Customize Form Fields
```typescript
// In components/LeadForm.tsx
// Add more fields or modify existing ones:

<select name="configuration_interested">
  <option value="1BHK">1 BHK</option>
  <option value="2BHK">2 BHK</option>
  <option value="3BHK">3 BHK</option>
  {/* Add more options */}
</select>
```

---

## 📊 Form Submission Flow

```
1. User clicks "Inquire Now"
   ↓
2. LeadForm modal opens
   ↓
3. User fills form
   ↓
4. Form submits to /api/leads
   ↓
5. Server validates & checks duplicates
   ↓
6. Data saved to Supabase
   ↓
7. Meta Pixel Lead event fired
   ↓
8. Success modal shows
```

---

## 🔍 Testing Checklist

### Before Deployment
```bash
# Run build
pnpm build

# Should see: ✓ Compiled successfully

# Visual testing
✓ Home page loads
✓ Godrej page loads
✓ Oberoi page loads
✓ Click form buttons
✓ Form submits successfully
✓ Success message appears
✓ WhatsApp link works
✓ Call button works
```

### Database Testing
```
1. Submit form on /godrej
2. Check Supabase > leads table
3. Should see new row with your data
```

### Meta Pixel Testing
```
1. Install "Meta Pixel Helper" Chrome extension
2. Visit /godrej
3. Should see green checkmark
4. Check for ViewContent event
5. Submit form
6. Should see Lead event
```

---

## 🐛 Troubleshooting

### Form Not Submitting
```
✓ Check browser console for errors
✓ Verify Supabase env vars in .env.local
✓ Check network tab in browser DevTools
✓ Ensure Supabase database running
```

### Images Not Showing
```
✓ Check image files exist in public/images/
✓ Verify correct image path in component
✓ Check browser cache (Ctrl+Shift+R)
✓ Check file format (JPG, PNG, WebP)
```

### Database Connection Error
```
✓ Verify NEXT_PUBLIC_SUPABASE_URL
✓ Verify NEXT_PUBLIC_SUPABASE_ANON_KEY
✓ Check Supabase project status
✓ Test connection with: 
  npx supabase projects list
```

---

## 📱 Testing on Mobile

### Quick Mobile Test
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
hostname -I            # Linux

# Open in mobile browser
http://YOUR_IP:3000
```

### What to Check
- [ ] Layout looks good
- [ ] Text is readable
- [ ] Buttons are tappable (>44px)
- [ ] Form works on mobile
- [ ] Images load properly
- [ ] Sticky CTA appears

---

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Real estate landing pages"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select GitHub repo
4. Click "Import"

### Step 3: Add Environment Variables
In Vercel Dashboard > Settings > Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
POSTGRES_URL
POSTGRES_URL_NON_POOLING
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET
NEXT_PUBLIC_META_PIXEL_ID
```

Then click "Deploy"! 🚀

---

## 📞 Support Resources

| Resource | Link |
|----------|------|
| **Docs** | See README.md |
| **Implementation** | See IMPLEMENTATION_GUIDE.md |
| **Deployment** | See DEPLOYMENT_GUIDE.md |
| **Next.js Docs** | https://nextjs.org/docs |
| **Tailwind Docs** | https://tailwindcss.com/docs |
| **Supabase Docs** | https://supabase.com/docs |

---

## 💡 Pro Tips

### Tip 1: Hot Reload
Changes save automatically in dev mode. Just refresh browser.

### Tip 2: Database Inspection
```bash
# Access Supabase dashboard
# Go to: https://app.supabase.com
# Click your project
# View leads table in real-time
```

### Tip 3: Preview Changes
Before deploying, push to GitHub and create a Pull Request. Vercel creates preview URLs for testing.

### Tip 4: Performance
- Images automatically optimized by Next.js
- Use `pnpm build` to check bundle size
- Lighthouse: DevTools > Lighthouse tab

### Tip 5: Analytics
- Vercel Analytics: Dashboard > Analytics
- Supabase: Dashboard > Reports
- Meta Pixel: Business Suite > Events Manager

---

## 🎉 You're All Set!

Your real estate landing pages are ready:
- ✅ Two complete landing pages
- ✅ Lead capture system
- ✅ Database integration
- ✅ Meta Pixel tracking
- ✅ Responsive design
- ✅ Production-ready code

**Next Step**: Customize content and deploy! 🚀

---

## ⚡ Ultra-Quick Commands

```bash
# Install
pnpm install

# Develop
pnpm dev

# Build
pnpm build

# Start production
pnpm start

# Format code
pnpm format

# Type check
pnpm type-check
```

---

**Need help?** Check the documentation files:
- `README.md` - Full overview
- `IMPLEMENTATION_GUIDE.md` - Detailed guide
- `DEPLOYMENT_GUIDE.md` - Deployment steps
- `PROJECT_SUMMARY.md` - Project stats

---

**Happy Deploying! 🎉**
