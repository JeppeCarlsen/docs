# Deployment Guide - Valiyou Knowledge Center

Complete guide for deploying docs.valiyou.com

## 🚀 Quick Deployment

### First Time Setup

```bash
# 1. Install Mintlify CLI globally
npm install -g mintlify

# 2. Login to Mintlify
mintlify login

# 3. Deploy
mintlify deploy
```

### Subsequent Deployments

```bash
# Just run deploy command
mintlify deploy
```

---

## 🌐 Custom Domain Setup (docs.valiyou.com)

### Step 1: Configure Mintlify

1. Go to [Mintlify Dashboard](https://dashboard.mintlify.com)
2. Select your project
3. Navigate to **Settings** → **Custom Domain**
4. Enter: `docs.valiyou.com`
5. Click **Save**

### Step 2: Configure DNS

**Option A: CloudFlare** (Recommended)

1. Log in to CloudFlare
2. Select `valiyou.com` domain
3. Go to **DNS** → **Records**
4. Click **Add record**

```
Type: CNAME
Name: docs
Target: cname.mintlify.com
Proxy status: DNS only (gray cloud)
TTL: Auto
```

5. Click **Save**

**Option B: Other DNS Provider**

Add CNAME record:
```
docs.valiyou.com → cname.mintlify.com
```

### Step 3: Verify

1. Wait 5-10 minutes for DNS propagation
2. Check status in Mintlify dashboard
3. Visit https://docs.valiyou.com

**Troubleshooting:**
```bash
# Check DNS propagation
nslookup docs.valiyou.com

# Should return:
# docs.valiyou.com canonical name = cname.mintlify.com
```

---

## 🔄 Auto-Deploy on Git Push

### GitHub Integration

1. In Mintlify Dashboard: **Settings** → **Integrations**
2. Click **Connect GitHub**
3. Authorize Mintlify
4. Select repository: `valiyou-knowledge-center`
5. Enable **Auto-deploy on push to main**

Now every time you push to `main` branch, docs auto-deploy! 🎉

### Manual Deployment Workflow

If you prefer manual deployments:

```bash
# 1. Make changes
vim guides/valuations/new-article.mdx

# 2. Test locally
mintlify dev

# 3. Commit changes
git add .
git commit -m "Add new article"
git push origin main

# 4. Deploy manually
mintlify deploy
```

---

## 🏗️ Deployment Environments

| Environment | URL | Branch | Deploy Method |
|-------------|-----|--------|---------------|
| **Production** | docs.valiyou.com | `main` | Auto-deploy or `mintlify deploy` |
| **Preview** | (Mintlify preview) | feature branches | `mintlify dev` locally |

---

## 📊 Post-Deployment Checklist

After deploying:

- [ ] Visit docs.valiyou.com and verify site loads
- [ ] Test search functionality
- [ ] Check navigation (all links work)
- [ ] Verify dark/light mode toggle
- [ ] Test mobile responsiveness
- [ ] Check analytics (Posthog tracking)
- [ ] Verify "Back to App" link works (→ valiyou.com)

---

## 🔧 Rollback

If deployment has issues:

### Option 1: Revert Git Commit

```bash
# Find commit hash
git log

# Revert to previous commit
git revert <commit-hash>
git push origin main

# Deploy again
mintlify deploy
```

### Option 2: Mintlify Dashboard

1. Go to Mintlify Dashboard
2. Navigate to **Deployments** tab
3. Find previous successful deployment
4. Click **Rollback**

---

## 🎯 Deployment Best Practices

### Before Deploying

1. **Test locally**: Always run `mintlify dev` first
2. **Check for errors**: Fix any warnings in terminal
3. **Review changes**: Use `git diff` to see what changed
4. **Update navigation**: Ensure `mint.json` is correct
5. **Check images**: Verify all images load in `/images/` folder

### During Deployment

1. **Watch build logs**: Monitor for errors
2. **Verify completion**: Wait for "Deployment successful" message
3. **Note deployment ID**: Save for troubleshooting

### After Deployment

1. **Test immediately**: Visit docs.valiyou.com
2. **Clear cache**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
3. **Test on mobile**: Check responsive design
4. **Monitor analytics**: Check if tracking works

---

## 🚨 Troubleshooting

### Deployment Fails

**Error: "Build failed"**
```bash
# Check syntax errors in MDX files
mintlify dev

# Look for error messages in terminal
```

**Error: "Custom domain not verified"**
- Wait longer (DNS can take up to 24 hours)
- Check CNAME record is correct
- Ensure CloudFlare proxy is OFF (gray cloud)

### Site Not Loading

**Check 1: DNS**
```bash
nslookup docs.valiyou.com
# Should point to cname.mintlify.com
```

**Check 2: SSL Certificate**
- Mintlify auto-provisions SSL
- Can take 5-10 minutes
- Check in Mintlify dashboard: Settings → Custom Domain

**Check 3: Deployment Status**
- Go to Mintlify dashboard
- Check latest deployment succeeded
- Look for error logs

### Images Not Loading

```bash
# Images must be in /images/ folder
# Reference as: /images/screenshot.png

# NOT: ./images/screenshot.png
# NOT: ../images/screenshot.png
```

### Search Not Working

- Search is powered by Algolia
- Takes 5-10 minutes after deployment to index
- If still broken after 1 hour, contact Mintlify support

---

## 📞 Support

**Mintlify Support:**
- Docs: https://mintlify.com/docs
- Discord: https://discord.gg/mintlify
- Email: hi@mintlify.com

**Valiyou Internal:**
- Jeppe (Developer): jeppe@valiyou.com
- GitHub Issues: Create issue in `valiyou-knowledge-center` repo

---

## 📈 Monitoring

### Check Deployment Status

```bash
# View deployment history
# Go to: https://dashboard.mintlify.com

# Or check via CLI
mintlify status
```

### Analytics Dashboard

View docs analytics in:
1. Mintlify Dashboard → Analytics
2. Posthog (if configured)

Track:
- Page views
- Search queries
- Popular articles
- User journey

---

## 🎉 Success!

Your knowledge center is now live at:
**https://docs.valiyou.com**

Completely separate from main app deployment! ✅
