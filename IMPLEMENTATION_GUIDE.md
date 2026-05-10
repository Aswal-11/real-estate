# Real Estate Landing Pages - Implementation Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Timeline](#timeline)
4. [Tech Stack Details](#tech-stack-details)
5. [Setup Instructions](#setup-instructions)
6. [Features Breakdown](#features-breakdown)
7. [Database Operations](#database-operations)
8. [API Endpoints](#api-endpoints)
9. [Meta Pixel Setup](#meta-pixel-setup)
10. [Deployment Checklist](#deployment-checklist)

---

## 📌 Project Overview

### Deliverables
✅ Two separate landing pages (Godrej & Oberoi)
✅ Lead capture system with database storage
✅ Mobile-responsive design (320px - 1920px+)
✅ Meta Pixel tracking for lead generation
✅ Sticky CTA buttons (Inquire, WhatsApp, Call)
✅ Premium UI/UX design
✅ Fast loading (<2.5s LCP)

### Target Audience
- High net-worth individuals
- First-time homebuyers
- Property investors
- Real estate consultants

### Business Goals
- Generate qualified leads
- Increase inquiry conversion rate
- Track marketing ROI via Meta Pixel
- Build premium brand perception

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  (Next.js SPA with React Components)                   │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼──┐    ┌───▼──┐    ┌───▼──┐
│ Meta │    │ APIs │    │Pages │
│Pixel │    │      │    │      │
└──────┘    └───┬──┘    └──────┘
               │
    ┌──────────▼──────────┐
    │  Next.js API Route   │
    │  /api/leads/route.ts │
    └──────────┬───────────┘
               │
    ┌──────────▼──────────┐
    │    Supabase         │
    │  PostgreSQL DB      │
    │  leads table        │
    └─────────────────────┘
```

### Component Hierarchy
```
RootLayout (with Meta Pixel)
├── Home Page
│   ├── Header
│   ├── Hero Section
│   ├── Projects Grid
│   │   ├── Godrej Card
│   │   └── Oberoi Card
│   ├── Features Section
│   ├── CTA Section
│   └── Footer
│
├── Godrej Page
│   ├── HeroBanner
│   ├── ProjectOverview
│   ├── PricePayment
│   ├── Amenities
│   ├── Location
│   ├── Gallery
│   ├── LeadForm (modal)
│   ├── SuccessModal
│   └── StickyCTA
│
└── Oberoi Page (same structure)
```

---

## ⏱️ Timeline

### Phase 1: Foundation (Week 1)
- ✅ Database schema creation
- ✅ Supabase integration setup
- ✅ Project directory structure
- ✅ Component creation
- ✅ Styling with Tailwind

**Deliverable**: Functional prototype with all components

### Phase 2: Features (Week 2)
- ✅ Lead form modal with validation
- ✅ API route for form submission
- ✅ Duplicate detection logic
- ✅ Success/error handling
- ✅ Meta Pixel integration

**Deliverable**: Complete lead capture system

### Phase 3: Polish (Week 3)
- ✅ Responsive design optimization
- ✅ Image generation and optimization
- ✅ Performance tuning
- ✅ SEO optimization
- ✅ Testing and QA

**Deliverable**: Production-ready landing pages

### Phase 4: Deployment (Week 4)
- ✅ Environment configuration
- ✅ Vercel deployment
- ✅ DNS setup
- ✅ Analytics verification
- ✅ Launch

**Deliverable**: Live landing pages

---

## 🛠️ Tech Stack Details

### Frontend Stack

#### Next.js 16 (App Router)
```
Why? 
- Server Components for optimization
- Built-in SEO features
- Fast refresh for development
- API routes capability
- Vercel native support
```

**Key Features Used**:
- App Router (not Pages Router)
- Dynamic routes (/godrej, /oberoi)
- API routes (/api/leads)
- Image optimization
- Head metadata

#### React 19
```
Why?
- Latest hooks and features
- Better performance
- Concurrent features
```

**Hooks Used**:
- useState: Form state, modals, visibility
- useEffect: Meta Pixel tracking, scroll detection
- Custom hooks: Form validation, API calls

#### TypeScript
```
Why?
- Type safety
- Better IDE support
- Prevents runtime errors
- Self-documenting code
```

**Usage**:
- Component props interfaces
- API response types
- Database types
- Utility function types

#### Tailwind CSS 3
```
Why?
- Fast styling
- Mobile-first approach
- Responsive design
- Consistent spacing
```

**Key Classes**:
- Responsive: md:, lg: prefixes
- Flexbox: flex, gap, items-center
- Spacing: p-*, m-*, gap-*
- Colors: Amber, Gray, Blue
- Effects: shadow-*, hover:, transition-*

### Backend Stack

#### Supabase
```
What?
- PostgreSQL database
- Row Level Security (RLS)
- Real-time capabilities
- Authentication-ready

Why?
- Perfect for lead storage
- Secure with RLS policies
- Easy integration with Next.js
- Built-in authentication
```

**Database Features**:
- PostgreSQL 14+
- Connection pooling
- Real-time subscriptions
- Full-text search capability
- Automated backups

#### Supabase Client Libraries
```typescript
// Browser client
import { createClient } from '@supabase/ssr'

// Server client
import { createServerClient } from '@supabase/ssr'
```

### Third-Party Integrations

#### Meta Pixel
```javascript
// Initialized in root layout
fbq('init', 'PIXEL_ID')
fbq('track', 'PageView')
fbq('track', 'ViewContent', {...})
fbq('track', 'Lead', {...})
```

**Tracked Events**:
- PageView: Every page visit
- ViewContent: Project page loads
- Lead: Form submission

#### Vercel Analytics
```typescript
import { Analytics } from '@vercel/analytics/next'
// Tracks Core Web Vitals
```

---

## 🚀 Setup Instructions

### 1. Environment Configuration

Create `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
POSTGRES_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
POSTGRES_URL_NON_POOLING=postgresql://postgres:password@db.xxxxx.supabase.co:6543/postgres
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
SUPABASE_JWT_SECRET=super-secret-jwt-token-here

# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=1234567890

# Contact Configuration (optional)
NEXT_PUBLIC_PHONE_GODREJ=+919876543210
NEXT_PUBLIC_PHONE_OBEROI=+919876543211
```

### 2. Supabase Setup

**Step 1: Create Project**
```
1. Go to supabase.com
2. Create new project
3. Get URL and API keys
4. Add to .env.local
```

**Step 2: Verify Database Schema**
```sql
-- Already created by migration
-- Check: Tables > leads
-- Verify: 7 columns, 3 indexes, RLS enabled
```

**Step 3: Test Connection**
```bash
# Run development server
pnpm dev

# Try form submission on http://localhost:3000/godrej
# Check database for new lead entry
```

### 3. Meta Pixel Setup

**Step 1: Get Pixel ID**
```
1. Go to Meta Business Suite
2. Data Sources > Pixels
3. Create/Get Pixel ID
```

**Step 2: Configure in Project**
```env
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
```

**Step 3: Verify Events**
```
1. Open page in browser
2. Go to Meta Pixel helper tool
3. Should see PageView and ViewContent events
4. Submit form to see Lead event
```

### 4. Local Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Open browser
open http://localhost:3000

# Test functionality:
# - Click project cards
# - Scroll to see sticky CTA
# - Click "Inquire Now"
# - Fill and submit form
# - Check Supabase for new lead
```

---

## 🎨 Features Breakdown

### 1. Hero Banner Component
```typescript
<HeroBanner
  projectName={string}
  tagline={string}
  price={string}
  imageUrl={string}
  onLeadClick={() => void}
/>
```

**Features**:
- Full-viewport hero image
- Text overlay with shadow
- Call-to-action button
- Mobile-responsive text sizing

**File**: `components/HeroBanner.tsx`

### 2. Lead Form Component
```typescript
<LeadForm
  projectName={string}
  onClose={() => void}
  onSuccess={() => void}
/>
```

**Features**:
- Modal overlay
- 5 form fields with validation
- Client-side validation
- Supabase insertion
- Error handling
- Meta Pixel tracking

**File**: `components/LeadForm.tsx`

**Form Fields**:
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| Full Name | Text | Yes | Non-empty |
| Mobile | Tel | Yes | 10 digits |
| Email | Email | Yes | Valid email |
| Configuration | Select | No | 1-5 BHK |
| Budget | Select | No | Range options |

### 3. Sticky CTA Component
```typescript
<StickyCTA
  projectName={string}
  phoneNumber={string}
  whatsappNumber={string}
  onInquiryClick={() => void}
/>
```

**Features**:
- Fixed bottom position
- Slide-in animation at 300px scroll
- Three action buttons
- WhatsApp deep linking
- Phone call integration
- Mobile-optimized button sizing

**File**: `components/StickyCTA.tsx`

### 4. Success Modal Component
```typescript
<SuccessModal
  isOpen={boolean}
  projectName={string}
  onClose={() => void}
/>
```

**Features**:
- Confirmation message
- Next steps information
- Auto-dismiss after 5 seconds
- Professional design

**File**: `components/SuccessModal.tsx`

### 5. Gallery Component
```typescript
<Gallery images={Array<{title, url}>} />
```

**Features**:
- Responsive grid (3 columns on desktop, 1 on mobile)
- Hover zoom effect
- Click to open lightbox
- Modal image viewer
- Close button

**File**: `components/Gallery.tsx`

### 6. Other Components
- **HeroBanner**: Hero section
- **ProjectOverview**: Description + highlights
- **PricePayment**: Pricing grid + payment plan
- **Amenities**: 6-column amenity showcase
- **Location**: Map + advantages list

---

## 💾 Database Operations

### Lead Insertion (Form Submission)

```typescript
// In LeadForm.tsx
const supabase = createClient()
const { error } = await supabase.from('leads').insert([
  {
    project_name: projectName,
    full_name: formData.full_name,
    mobile_number: formData.mobile_number,
    email: formData.email,
    configuration_interested: formData.configuration_interested,
    budget_range: formData.budget_range,
  },
])
```

### Duplicate Detection

```typescript
// In /api/leads/route.ts
const { data: existingLead } = await supabase
  .from('leads')
  .select('id')
  .eq('mobile_number', body.mobile_number)
  .eq('project_name', body.project_name)
  .single()

if (existingLead) {
  return NextResponse.json(
    { error: 'Already registered' },
    { status: 409 }
  )
}
```

### Query Lead Data

```typescript
// Get all leads for a project
const { data: leads } = await supabase
  .from('leads')
  .select('*')
  .eq('project_name', 'Godrej Properties – Thane Extension')
  .order('created_at', { ascending: false })

// Get recent leads (last 24 hours)
const yesterday = new Date(Date.now() - 86400000).toISOString()
const { data: recentLeads } = await supabase
  .from('leads')
  .select('*')
  .gt('created_at', yesterday)
```

---

## 🔌 API Endpoints

### POST /api/leads

**Purpose**: Submit a new lead

**Request Body**:
```json
{
  "project_name": "Godrej Properties – Thane Extension",
  "full_name": "John Doe",
  "mobile_number": "9876543210",
  "email": "john@example.com",
  "configuration_interested": "2BHK",
  "budget_range": "50L-1Cr"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "id": "uuid",
    "project_name": "...",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

**Response (409 Conflict - Duplicate)**:
```json
{
  "error": "This phone number is already registered for this project",
  "isDuplicate": true
}
```

**Response (400 Bad Request)**:
```json
{
  "error": "Missing required fields"
}
```

**Response (500 Server Error)**:
```json
{
  "error": "Internal server error"
}
```

---

## 📊 Meta Pixel Setup

### Pixel Initialization

```typescript
// In app/layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s){...}
      fbq('init', 'PIXEL_ID');
      fbq('track', 'PageView');
    `,
  }}
/>
```

### Events Tracked

#### 1. PageView
**When**: Every page load
**Data**: None
```javascript
fbq('track', 'PageView')
```

#### 2. ViewContent
**When**: Project landing page loads
**Data**: 
```javascript
fbq('track', 'ViewContent', {
  content_name: 'Godrej Properties',
  value: 49.99,
  currency: 'INR'
})
```

#### 3. Lead
**When**: Form submission success
**Data**:
```javascript
fbq('track', 'Lead', {
  value: 1.0,
  currency: 'INR'
})
```

### Meta Pixel Testing

**Method 1: Meta Pixel Helper**
1. Install "Meta Pixel Helper" Chrome extension
2. Enable on site
3. Perform actions
4. Should see green checkmarks

**Method 2: Browser Console**
```javascript
// Check if pixel loaded
typeof fbq !== 'undefined' // Should be true

// View pixel ID
console.log(facebook_business_extension.getID())
```

**Method 3: Meta Business Suite**
1. Go to Data Sources > Pixels
2. Click your pixel
3. Go to Testing Tools
4. Enter your site URL
5. Events should appear in real-time

---

## ✅ Deployment Checklist

### Pre-Deployment (Development)
- [ ] All components rendering correctly
- [ ] Form submission working
- [ ] Database records being saved
- [ ] Duplicate detection functioning
- [ ] Meta Pixel events firing
- [ ] Mobile responsive on all devices
- [ ] No console errors or warnings
- [ ] All images loaded correctly

### Environment Setup
- [ ] Vercel project created
- [ ] GitHub repo connected
- [ ] All env vars added to Vercel
- [ ] Supabase production database ready
- [ ] Meta Pixel ID configured
- [ ] Domain/subdomain configured

### Pre-Launch Checklist
- [ ] SEO meta tags optimized
- [ ] Open Graph tags set
- [ ] Favicon configured
- [ ] 404 page working
- [ ] Error pages styled
- [ ] Analytics script added (if using)
- [ ] Privacy policy linked
- [ ] Terms of service linked

### Post-Deployment Testing
- [ ] Home page loads
- [ ] Both project pages load
- [ ] Form submission works
- [ ] Database records appear
- [ ] Meta Pixel events appear in helper
- [ ] WhatsApp links working
- [ ] Phone call links working
- [ ] Images loading fast
- [ ] Mobile experience verified
- [ ] SEO tags visible in source

### Monitoring
- [ ] Vercel Analytics dashboard active
- [ ] Error alerts set up
- [ ] Lead notifications configured
- [ ] Meta Pixel dashboard monitoring
- [ ] Supabase usage monitoring

---

## 🎯 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load Time** | <2.5s LCP | Lighthouse, PageSpeed Insights |
| **Mobile Score** | >90 | Lighthouse mobile audit |
| **Desktop Score** | >95 | Lighthouse desktop audit |
| **Form Conversion** | >5% | Google Analytics 4 |
| **Meta Pixel Events** | 100% | Meta Pixel dashboard |
| **Bounce Rate** | <40% | GA4 |
| **Average Session** | >2min | GA4 |

---

## 🔐 Security Considerations

### Data Protection
✅ Supabase RLS policies enabled
✅ No sensitive data in frontend
✅ Environment variables never exposed
✅ API route rate limiting recommended
✅ HTTPS enforced in production

### Input Validation
✅ Client-side form validation
✅ Server-side email/phone validation
✅ SQL injection prevention via parameterized queries
✅ XSS prevention via React escaping

### Best Practices
✅ Minimal dependencies
✅ Regular security updates
✅ Dependency vulnerability scanning
✅ Code review before deployment

---

## 📞 Troubleshooting

### Form Not Submitting
```
1. Check console for errors
2. Verify Supabase env vars
3. Check browser network tab
4. Ensure RLS policies allow inserts
```

### Supabase Connection Failed
```
1. Verify NEXT_PUBLIC_SUPABASE_URL
2. Verify NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Check Supabase project status
4. Test connection with Supabase CLI
```

### Meta Pixel Events Not Firing
```
1. Verify NEXT_PUBLIC_META_PIXEL_ID
2. Check browser console for fbq errors
3. Ensure script loads before tracking
4. Test with Meta Pixel Helper
```

### Images Not Loading
```
1. Verify image paths in public/images/
2. Check Next.js Image optimization
3. Verify file formats (JPG, PNG, WebP)
4. Check browser cache
```

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Supabase Docs**: https://supabase.com/docs
- **Meta Pixel Docs**: https://developers.facebook.com/docs/facebook-pixel/

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: Development Team
