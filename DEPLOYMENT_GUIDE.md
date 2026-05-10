# Real Estate Landing Pages - Deployment Guide

## 🚀 Quick Start Deployment

### Option 1: Deploy to Vercel (Recommended)

#### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase project with credentials

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Real estate landing pages"

# Create new repo on GitHub
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/real-estate-landing.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel

**Via Vercel Dashboard**:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select GitHub repository
4. Click "Import"
5. Configure environment variables (see below)
6. Click "Deploy"

**Via Vercel CLI**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables when prompted
# Or add them in Vercel dashboard
```

#### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL = your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_key
POSTGRES_URL = your_connection_string
POSTGRES_URL_NON_POOLING = your_non_pooling_url
SUPABASE_SERVICE_ROLE_KEY = your_service_key
SUPABASE_JWT_SECRET = your_jwt_secret
NEXT_PUBLIC_META_PIXEL_ID = your_pixel_id
```

### Option 2: Deploy to Another Platform

#### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build project
pnpm build

# Deploy
netlify deploy --prod
```

#### Deploy to AWS Amplify
```bash
# Install AWS CLI
aws configure

# Deploy
amplify init
amplify publish
```

#### Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repo
4. Add environment variables
5. Deploy

---

## 📋 Complete Environment Variables Checklist

### Supabase Variables

Get from Supabase Dashboard > Project Settings > API

```env
# Required - Project URL
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Required - Anon Key (public, safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Required - Database Connection Strings
POSTGRES_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
POSTGRES_URL_NON_POOLING=postgresql://postgres:password@db.xxxxx.supabase.co:6543/postgres

# Required for server-side operations
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Required for JWT verification
SUPABASE_JWT_SECRET=your-super-secret-jwt-token-here
```

### Meta Pixel Variables

Get from Meta Business Suite > Data Sources > Pixels

```env
# Your Facebook Pixel ID
NEXT_PUBLIC_META_PIXEL_ID=1234567890
```

### Optional Variables

```env
# Contact Numbers (for WhatsApp/Call CTAs)
NEXT_PUBLIC_PHONE_GODREJ=+919876543210
NEXT_PUBLIC_PHONE_OBEROI=+919876543211

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXXX-X

# Feature Flags
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

---

## 🔧 Supabase Setup for Deployment

### 1. Create Supabase Project

```bash
# Go to https://app.supabase.com
# Click "New Project"
# Configure:
# - Organization: Your organization
# - Project name: real-estate-leads
# - Database password: Strong password
# - Region: Closest to your users
```

### 2. Verify Database Schema

After migration runs, verify in Supabase:

1. Go to SQL Editor
2. Run query:
```sql
SELECT 
  table_name,
  column_name,
  data_type
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'leads'
ORDER BY 
  ordinal_position;
```

Should show:
```
leads | id                        | uuid
leads | project_name              | text
leads | full_name                 | text
leads | mobile_number             | text
leads | email                      | text
leads | configuration_interested  | text
leads | budget_range              | text
leads | created_at                | timestamp
leads | updated_at                | timestamp
```

### 3. Verify Indexes

```sql
SELECT 
  indexname,
  indexdef
FROM 
  pg_indexes
WHERE 
  tablename = 'leads';
```

Should show 3 indexes:
- idx_leads_project_name
- idx_leads_created_at
- idx_leads_mobile_number

### 4. Verify RLS Policies

Go to Tables > leads > RLS > Policies

Should show:
- "Allow anonymous inserts on leads"
- "Allow public select on leads"

---

## 🌐 Domain Configuration

### Using Vercel

**Step 1**: In Vercel Project Settings > Domains

**Step 2**: Add domain:
- Custom domain: godrej.example.com
- DNS provider: Choose your DNS provider

**Step 3**: Update DNS records (depends on provider)

**Step 4**: Wait for SSL certificate (usually <5 minutes)

### Using Custom Domain Provider

#### For Godrej Project:
```
Domain: godrej.example.com
Points to: vercel-project.vercel.app

DNS Records:
- A Record: 76.76.19.163
- CNAME: cname.vercel-dns.com
```

#### For Oberoi Project:
```
Domain: oberoi.example.com
Points to: vercel-project.vercel.app

DNS Records:
- A Record: 76.76.19.163
- CNAME: cname.vercel-dns.com
```

---

## 📊 Meta Pixel Verification

### Step 1: Get Pixel ID

1. Go to Meta Business Suite
2. Data Sources > Pixels
3. Create or select pixel
4. Copy Pixel ID

### Step 2: Add to Environment

```env
NEXT_PUBLIC_META_PIXEL_ID=1234567890
```

Redeploy application.

### Step 3: Verify Events

**Method 1: Meta Pixel Helper**
```
1. Install "Meta Pixel Helper" extension
2. Visit landing page
3. Should see green checkmark
4. Tab shows: ViewContent event
5. Submit form
6. Should see: Lead event
```

**Method 2: Meta Business Suite**
```
1. Go to Pixels > Events Manager
2. Click your pixel
3. Set Test URL to your domain
4. View events in real-time
5. Test URL mode (only for development)
```

### Step 4: Test Events

| Event | How to Test |
|-------|-----------|
| PageView | Visit page (automatic) |
| ViewContent | Load /godrej or /oberoi page |
| Lead | Fill & submit form |

---

## ✅ Pre-Launch Checklist

### Code & Build
- [ ] `pnpm build` runs without errors
- [ ] All imports resolve correctly
- [ ] No TypeScript errors
- [ ] All components render
- [ ] Form submits successfully

### Environment
- [ ] All env vars added to Vercel
- [ ] Supabase credentials correct
- [ ] Meta Pixel ID configured
- [ ] Database migration applied
- [ ] RLS policies verified

### Testing
- [ ] Home page loads
- [ ] Godrej page loads and renders
- [ ] Oberoi page loads and renders
- [ ] Lead form opens
- [ ] Form validation works
- [ ] Form submission successful
- [ ] Leads appear in Supabase
- [ ] Meta Pixel fires events
- [ ] WhatsApp links open
- [ ] Phone call links work

### SEO & Performance
- [ ] Meta tags in HTML head
- [ ] Open Graph tags set
- [ ] Favicon configured
- [ ] Images optimized
- [ ] Lighthouse score >85
- [ ] Mobile speed test passing
- [ ] No console errors

### Mobile
- [ ] Responsive on 375px
- [ ] Responsive on 768px
- [ ] Responsive on 1024px
- [ ] Touch targets > 44px
- [ ] Forms usable on mobile
- [ ] CTA buttons accessible

### Security
- [ ] No API keys exposed
- [ ] env vars not in code
- [ ] Supabase RLS enabled
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] Input validation working

### Analytics
- [ ] Google Analytics script (if used)
- [ ] Meta Pixel pixel ID set
- [ ] Conversion tracking active
- [ ] Events firing correctly
- [ ] Dashboards configured

---

## 🚀 Launch Day

### 1 Hour Before
- [ ] Visit all 3 pages
- [ ] Submit test form
- [ ] Check Supabase for data
- [ ] Verify Meta Pixel events
- [ ] Check email notifications

### Launch
- [ ] Update DNS records
- [ ] Monitor error logs
- [ ] Monitor database
- [ ] Monitor Meta Pixel events

### First 24 Hours
- [ ] Monitor analytics
- [ ] Check form submissions
- [ ] Verify lead notifications
- [ ] Monitor performance
- [ ] Respond to first inquiries

---

## 📞 Post-Launch Operations

### Daily Monitoring
```bash
# Check for errors
- Vercel error logs
- Supabase database metrics
- Meta Pixel event volume

# Check performance
- Vercel Analytics
- Lighthouse metrics
- Core Web Vitals
```

### Weekly Tasks
```
- Review lead submissions
- Update pricing if needed
- Check analytics trends
- Respond to inquiries
- Monitor conversion rates
```

### Monthly Tasks
```
- Backup database
- Review security logs
- Optimize images
- Update content
- ROI analysis
```

---

## 🔄 Continuous Deployment

### GitHub > Vercel Auto-Deployment

After initial deployment, every push to `main` will auto-deploy:

```bash
# Make changes locally
git add .
git commit -m "Update pricing"

# Push to GitHub
git push origin main

# Vercel automatically:
# 1. Builds project
# 2. Runs tests (if configured)
# 3. Deploys to preview
# 4. Creates preview URL
# 5. Deploys to production
```

### Rollback Procedure

If something breaks after deployment:

1. Go to Vercel Dashboard
2. Click project
3. Go to "Deployments"
4. Find previous working version
5. Click "..." > "Promote to Production"

---

## 🛡️ Security Checklist

- [ ] Environment variables not in .env (git ignored)
- [ ] API keys rotated regularly
- [ ] Supabase RLS policies verified
- [ ] SQL injection prevention confirmed
- [ ] XSS protection enabled
- [ ] HTTPS on all pages
- [ ] CORS properly configured
- [ ] Rate limiting configured
- [ ] DDoS protection enabled (Vercel default)
- [ ] Error pages don't leak info

---

## 📈 Monitoring & Analytics

### Vercel Analytics
```
Dashboard > Analytics tab
- Page load times
- Core Web Vitals
- Request/response times
- Edge function metrics
```

### Supabase Monitoring
```
Project > Reports
- Database size
- Active connections
- API calls
- Storage usage
```

### Meta Pixel Events
```
Business Suite > Events Manager
- Event volume
- Event quality
- Conversions
- Duplicate rates
```

### Form Submissions
```
Supabase > leads table
- Total leads
- By project
- By configuration
- By budget range
```

---

## 🆘 Troubleshooting Deployment

### Build Fails on Vercel

**Solution**:
```bash
# Check local build
pnpm build

# If it passes locally but fails on Vercel:
# 1. Check logs in Vercel dashboard
# 2. Ensure all deps installed
# 3. Verify node version compatibility
# 4. Check for hardcoded paths
```

### Environment Variables Not Working

**Solution**:
```
1. Verify exact variable names (case-sensitive)
2. Use NEXT_PUBLIC_ prefix for client-side vars
3. Rebuild after adding new vars
4. Check Vercel env var override order
```

### Database Connection Failed

**Solution**:
```
1. Verify connection strings
2. Check Supabase project status
3. Ensure database is running
4. Test connection with psql:
   psql "your_connection_string"
5. Check firewall rules
```

### Meta Pixel Events Not Firing

**Solution**:
```
1. Verify pixel ID correct
2. Check for ad blockers
3. Test in incognito window
4. Use Meta Pixel helper
5. Check browser console
```

### Slow Performance

**Solution**:
```
1. Run Lighthouse audit
2. Optimize images
3. Enable compression
4. Check database queries
5. Monitor API response times
```

---

## 📚 Deployment Scenarios

### Scenario 1: Deploy New Project

```bash
# 1. Create GitHub repo
# 2. Push code
git push origin main

# 3. Connect to Vercel
# 4. Add environment variables
# 5. Deploy

# 6. Verify Supabase migration
# 7. Test all functionality
# 8. Configure domains
# 9. Verify Meta Pixel
# 10. Launch!
```

### Scenario 2: Update Pricing

```bash
# 1. Update component
# 2. Test locally
# 3. Git commit & push
# 4. Vercel auto-deploys
# 5. Verify in production
```

### Scenario 3: Add New Property

```bash
# 1. Create new page directory: /app/newproject/
# 2. Copy similar page structure
# 3. Update content & images
# 4. Generate images with GenerateImage
# 5. Update home page links
# 6. Test thoroughly
# 7. Push to main
# 8. Deploy automatically
```

### Scenario 4: Database Migration

```bash
# 1. Design new schema
# 2. Create migration
# 3. Test on branch
# 4. Merge to main
# 5. Vercel triggers migration
# 6. Verify data integrity
```

---

## 📞 Support & Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Hosting](https://supabase.com/docs/guides/hosting)
- [Meta Pixel Docs](https://developers.facebook.com/docs/facebook-pixel)

### Getting Help
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.io
- Meta Support: business.facebook.com/support

### Community
- GitHub Discussions: discussions on your repo
- Stack Overflow: Tag your questions
- Vercel Community: community.vercel.com
- Supabase Community: discord.supabase.com

---

## ✨ Deployment Complete!

Once deployed, your landing pages are live and ready to capture leads!

### Next Steps
1. **Monitor Performance** - Check analytics daily
2. **Respond to Leads** - Contact new inquiries quickly
3. **Optimize Content** - Update based on performance data
4. **Scale Marketing** - Increase ad spend to qualified channels
5. **Expand Projects** - Add new properties as needed

---

**Happy Deploying! 🚀**

*For questions or issues, refer to the README.md and IMPLEMENTATION_GUIDE.md files.*
