# Valiyou Knowledge Center

Official documentation for Valiyou - The All-In-One Sponsorship & Marketing Value Platform.

**Live at:** [docs.valiyou.com](https://docs.valiyou.com)

## 🚀 Getting Started

This documentation is built with [Mintlify](https://mintlify.com) - a modern documentation framework.

### Prerequisites

```bash
npm install -g mintlify
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/JeppeCarlsen/valiyou-knowledge-center.git
cd valiyou-knowledge-center

# Start local dev server
mintlify dev
```

Open [http://localhost:3000](http://localhost:3000) to see your docs.

## 📁 Folder Structure

```
valiyou-knowledge-center/
├── mint.json                  # Configuration (navigation, branding, etc.)
├── introduction.mdx           # Homepage
├── getting-started/
│   ├── quick-start.mdx
│   ├── authentication.mdx
│   └── first-valuation.mdx
├── guides/
│   ├── valuations/            # Valuation guides
│   ├── sponsorships/          # Sponsorship guides
│   ├── billing/               # Billing & plans
│   └── platform/              # Platform features
├── api-reference/
│   ├── introduction.mdx
│   ├── authentication.mdx
│   └── endpoints/             # API endpoint docs
└── images/                    # Screenshots and assets
```

## 🌐 Domain Structure

**Understanding Valiyou's domain architecture:**

| Domain | Purpose | Use For |
|--------|---------|---------|
| **valiyou.com** | Marketing website | Marketing content, landing pages, company info |
| **valiyou.io** | Application (SaaS platform) | App URLs, authentication, user features |
| **docs.valiyou.com** | Documentation (this site) | Help articles, guides, API reference |
| **valiyou.io/trust-center** | Trust & Security page | Compliance, security, certifications |

### Domain Usage Guidelines

**Authentication & User Actions:**
- Sign In: `https://valiyou.io/auth/login`
- Sign Up: `https://valiyou.io/auth/signup`
- App features: `https://valiyou.io/*`

**Marketing & Info:**
- Homepage: `https://valiyou.com`
- About, Pricing, Features: `https://valiyou.com/*`

**Documentation:**
- All help articles: `https://docs.valiyou.com/*`
- Link to app from docs: Use `valiyou.io`

**Trust & Compliance:**
- Trust Center: `https://valiyou.io/trust-center`
- Privacy Policy: `https://valiyou.io/trust-center#privacy`

### When Linking in Documentation

```markdown
✅ Correct:
- [Sign in to your account](https://valiyou.io/auth/login)
- [View our Trust Center](https://valiyou.io/trust-center)
- [Visit our website](https://valiyou.com)

❌ Incorrect:
- [Sign in](https://valiyou.com/auth/login) ← Wrong domain
- [Trust Center](https://valiyou.com/trust-center) ← Should be .io
```

**Email addresses:**
- Support: `support@valiyou.com`
- Security: `security@valiyou.com`
- No-reply: `no-reply@valiyou.com`

## ✍️ Writing Documentation

### Create a New Article

1. Create a new `.mdx` file in the appropriate folder:
```bash
touch guides/valuations/new-article.mdx
```

2. Add frontmatter and content:
```markdown
---
title: 'Your Article Title'
description: 'Brief description for SEO'
---

# Your Article Title

Your content here...
```

3. Add to navigation in `mint.json`:
```json
{
  "group": "Valuations",
  "pages": [
    "guides/valuations/overview",
    "guides/valuations/new-article"
  ]
}
```

### MDX Components

Mintlify provides beautiful components:

```mdx
<Card title="Title" icon="rocket" href="/link">
  Description
</Card>

<Tip>
  Helpful tip for users
</Tip>

<Warning>
  Important warning
</Warning>

<Steps>
  <Step title="Step 1">Content</Step>
  <Step title="Step 2">Content</Step>
</Steps>

<CodeGroup>
  ```bash Example Code
  # Example code block
  echo "Hello World"
  ```

  ```javascript JavaScript Example
  // Example JavaScript code
  console.log("Hello World");
  ```
</CodeGroup>

See [Mintlify Components](https://mintlify.com/docs/content/components/accordions) for full reference.

## 🚢 Deployment

### Deploy to Mintlify Cloud

```bash
# First time setup
mintlify login
mintlify deploy

# Subsequent deployments
mintlify deploy
```

### Custom Domain Setup (docs.valiyou.com)

1. Go to your Mintlify dashboard
2. Navigate to Settings → Custom Domain
3. Add `docs.valiyou.com`
4. Configure DNS:

**CloudFlare (or your DNS provider):**
```
Type: CNAME
Name: docs
Target: cname.mintlify.com
```

5. Wait for DNS propagation (5-10 minutes)

### GitHub Integration

Mintlify can auto-deploy when you push to GitHub:

1. In Mintlify dashboard: Settings → GitHub
2. Connect this repository
3. Enable auto-deploy on push to `main` branch

Now every git push will auto-deploy! 🎉

## 🎨 Branding

Brand colors and logos are configured in `mint.json`:

```json
{
  "colors": {
    "primary": "#2997ff",
    "light": "#4da6ff",
    "dark": "#1976d2"
  },
  "logo": {
    "dark": "/logo/dark.svg",
    "light": "/logo/light.svg"
  }
}
```

## 📊 Analytics

Posthog analytics is configured in `mint.json`:

```json
{
  "analytics": {
    "posthog": {
      "apiKey": "phc_your_key_here",
      "apiHost": "https://eu.i.posthog.com"
    }
  }
}
```

## 🔍 Search

Mintlify includes built-in search powered by Algolia DocSearch.

For AI-powered search, upgrade to Mintlify Pro ($120/month).

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/new-guide`
2. Make your changes
3. Test locally: `mintlify dev`
4. Commit: `git commit -m "Add new guide"`
5. Push: `git push origin feature/new-guide`
6. Create Pull Request on GitHub

## 📝 Content Guidelines

- **Clear titles**: Use descriptive titles (e.g., "How to Create a Valuation" not "Valuations")
- **SEO-friendly**: Include relevant keywords in titles and descriptions
- **Screenshots**: Add screenshots to `/images/` folder
- **Code examples**: Use `<CodeGroup>` for multiple languages
- **Cross-linking**: Link to related articles
- **Consistent tone**: Professional but friendly

## 🆘 Need Help?

- **Mintlify Docs**: https://mintlify.com/docs
- **Valiyou Support**: support@valiyou.com
- **Issues**: Create an issue on GitHub

## 📄 License

© 2025 Valiyou. All rights reserved.
