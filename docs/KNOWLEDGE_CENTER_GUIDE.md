# Knowledge Center Developer Guide

This guide documents best practices, naming conventions, and technical requirements for maintaining the Valiyou Knowledge Center (docs.valiyou.com).

## Table of Contents

1. [Menu Naming Conventions](#menu-naming-conventions)
2. [Avoiding Duplicate Titles](#avoiding-duplicate-titles)
3. [MDX Technical Requirements](#mdx-technical-requirements)
4. [Navigation Structure](#navigation-structure)
5. [Common Pitfalls](#common-pitfalls)
6. [Deployment Process](#deployment-process)

---

## Menu Naming Conventions

### Settings Pages

All Settings pages follow this strict naming convention:

**Format:** `Settings - [Category]`

**Examples:**

- ✅ `Settings - General`
- ✅ `Settings - Valuations`
- ✅ `Settings - Sponsorships`
- ✅ `Settings - CPM Benchmarks`
- ✅ `Settings - Currency Conversion`

**Why?**

- Consistency across documentation and application
- Easy to scan in navigation menu
- Matches the Settings tabs in the main app

### DO NOT Use These Formats:

- ❌ `Platform Settings` (category first)
- ❌ `General Settings` (vague)
- ❌ `Settings Page - General` (too verbose)
- ❌ `Organization Settings` (inconsistent)

---

## Avoiding Duplicate Titles

### The Problem

When the menu title and page heading are identical, users see the title twice:

```
Platform
Settings - General ← Menu
Settings - General ← Page heading (duplicate!)
```

### The Solution

**Menu title (frontmatter)** should include full context:

```yaml
---
title: 'Settings - General'
---
```

**Page heading** should be concise without the category prefix:

```markdown
# General
```

### Real-World Examples

#### ✅ CORRECT - No Duplication

**File:** `platform/settings/general.mdx`

```yaml
---
title: 'Settings - General'
---
# General

Configure your organization settings...
```

**Result:**

- Menu shows: "Settings - General"
- Page shows: "General" (heading)
- No duplication! ✓

#### ❌ INCORRECT - Duplication

```yaml
---
title: 'Settings - General'
---
# Settings - General  ← DON'T DO THIS!

Configure your organization settings...
```

**Result:**

- Menu shows: "Settings - General"
- Page shows: "Settings - General" (duplicate!)
- Redundant and ugly ✗

### Naming Pattern Summary

| File Purpose  | Menu Title (frontmatter) | Page Heading          |
| ------------- | ------------------------ | --------------------- |
| Settings page | `Settings - [Category]`  | `[Category]` only     |
| Feature guide | `[Feature Name]`         | Same as menu title OK |
| How-to guide  | `[Action/Task]`          | Same as menu title OK |

**Exception:** Non-Settings pages can have matching titles if context is clear.

---

## MDX Technical Requirements

### Script Tags - NEVER USE

**❌ FORBIDDEN:**

```markdown
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo"
}
</script>
```

**Why?** Mintlify cannot parse `<script>` tags with Acorn parser. Deployment will fail with:

```
Failed to parse page content: Could not parse expression with acorn
```

**Alternative:** Use Mintlify's built-in metadata in frontmatter instead.

### Component Props - Use String Literals

**✅ CORRECT:**

```markdown
<CardGroup cols="2">
  <Card title="Guide 1" />
  <Card title="Guide 2" />
</CardGroup>
```

**❌ INCORRECT:**

```
<CardGroup cols={NUMBER}>  ← Number literal causes MDX validation error
  <Card title="Guide 1" />
</CardGroup>
```

_Note: Using backtick code blocks (not markdown) to avoid validation errors in this guide._

### Math Symbols - Use ASCII

**✅ CORRECT:**

```markdown
- Calculation: $75.00 \* 0.934 = €70.09
- Division: 100 / 5 = 20
```

**❌ INCORRECT:**

```markdown
- Calculation: $75.00 MULTIPLY-SYMBOL 0.934 = €70.09 ← MULTIPLY-SYMBOL character breaks MDX
- Division: 100 DIVIDE-SYMBOL 5 = 20 ← DIVIDE-SYMBOL character breaks MDX
```

### Special Characters - Escape Properly

**✅ CORRECT:**

```markdown
- It&apos;s important to note...
- The &quot;Settings&quot; page shows...
```

**❌ INCORRECT:**

```markdown
- It's important to note... ← Unescaped apostrophe
- The "Settings" page shows... ← Unescaped quotes
```

### MDX Component Restrictions

**❌ FORBIDDEN - Complex markdown inside MDX components:**

```markdown
<Info>
**Confidence Levels:**
- High: Recent data
- Medium: Single source
- Low: Limited data
</Info>
```

**Error:** `Expected closing tag </Info> either after end of listItem or another opening tag`

**✅ CORRECT - Use inline text with pipes:**

```markdown
<Info>
**Confidence Levels:** High = Recent data | Medium = Single source | Low = Limited data
</Info>
```

---

## Navigation Structure

### File Organization in mint.json

**Order matters!** Navigation items appear in the exact order listed:

```json
{
  "group": "Platform",
  "pages": [
    "platform/team-management",
    "platform/company",
    "platform/settings/general", // 1st Settings page
    "platform/settings/brand-values", // 2nd Settings page
    "platform/settings/negotiator", // 3rd Settings page
    "guides/valuations/cpm-benchmarks", // 4th Settings page
    "guides/valuations/currency-conversion", // 5th Settings page
    "platform/settings/sso",
    "platform/settings/documents"
  ]
}
```

### Grouping Related Pages

**Settings pages should be grouped together** for easy navigation:

✅ **CORRECT:**

```
Platform
├── Team Management
├── Company
├── Settings - General
├── Settings - Valuations
├── Settings - Sponsorships
├── Settings - CPM Benchmarks
├── Settings - Currency Conversion
├── SSO
└── Documents
```

❌ **INCORRECT - Scattered:**

```
Platform
├── Settings - General
├── Team Management
├── Settings - Valuations
├── Company
├── Settings - Sponsorships  ← Hard to find!
```

### Avoid Duplicates

**Check for duplicates** before adding pages to navigation:

```json
{
  "pages": [
    "platform/settings/general",
    "sponsorships/inventory/settings", // ← Different file
    "sponsorships/inventory/settings" // ❌ DUPLICATE!
  ]
}
```

**Symptom:** Page appears twice in menu, clicking either goes to the same page.

---

## Common Pitfalls

### 1. Script Tags Crash Deployment

**Problem:**

```markdown
<script type="application/ld+json">
{ "@context": "https://schema.org" }
</script>
```

**Error:**

```
Failed to parse page content at path platform/settings/general.mdx
```

**Solution:** Remove all `<script>` tags from MDX files.

### 2. Number Props Break MDX

**Problem:**

```markdown
<CardGroup cols={NUMBER}>
```

**Error:**

```
MULTIPLY-SYMBOL Expected identifier but got eof
```

**Solution:** Use string literal:

```markdown
<CardGroup cols="2">
```

### 3. Special Math Characters

**Problem:**

```markdown
$50 MULTIPLY-SYMBOL 1.2 = $60
```

**Error:** MDX parsing error or rendering issues

**Solution:**

```markdown
$50 \* 1.2 = $60
```

### 4. Duplicate Menu Items

**Problem:** Same file path appears twice in `mint.json`:

```json
"pages": [
  "platform/settings/general",
  "platform/settings/general"  // ← Duplicate
]
```

**Symptom:** Page appears twice in navigation menu

**Solution:** Search for duplicates before committing:

```bash
grep -n "platform/settings/general" mint.json
```

### 5. Bullet Lists Inside MDX Components

**Problem:**

```markdown
<Info>
- Item 1
- Item 2
</Info>
```

**Error:** Mintlify cannot parse complex markdown inside MDX components

**Solution:** Use inline format with pipes:

```markdown
<Info>
Item 1 | Item 2 | Item 3
</Info>
```

---

## Deployment Process

### Pre-Deployment Checklist

Before pushing changes, verify:

1. **MDX validation passes:**

   ```bash
   node scripts/validate-mdx.js
   ```

2. **No script tags in files:**

   ```bash
   grep -r "<script" *.mdx
   # Should return no results
   ```

3. **Component props use strings:**

   ```bash
   grep "cols={" *.mdx
   # Should return no results
   ```

4. **No duplicate navigation entries:**

   ```bash
   # Check mint.json for duplicates
   ```

5. **Titles follow naming convention:**
   - Settings pages: `Settings - [Category]`
   - Headings shorter than menu titles

### Deployment Steps

1. **Validate locally:**

   ```bash
   npm run validate  # Or equivalent command
   ```

2. **Commit changes:**

   ```bash
   git add .
   git commit -m "Add new Settings - [Category] page"
   ```

3. **Push to GitHub:**

   ```bash
   git push
   ```

4. **Wait for Mintlify auto-deployment:**
   - Deployment takes 1-2 minutes
   - Check https://docs.valiyou.com for updates

5. **Verify deployment:**
   - Check activity log in Mintlify dashboard
   - Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
   - Verify page appears in navigation

### Deployment Failure Recovery

If deployment fails:

1. **Check Mintlify activity log** for error details

2. **Common errors:**
   - Script tags → Remove them
   - MDX syntax → Check component props
   - Duplicate paths → Remove duplicates from mint.json

3. **Fix and redeploy:**
   ```bash
   git add .
   git commit -m "Fix: Remove problematic content"
   git push
   ```

---

## Quick Reference

### DO's ✅

- Use `Settings - [Category]` for Settings page menu titles
- Use shorter headings (no "Settings -" prefix)
- Use string literals for component props: `cols="2"`
- Use ASCII math symbols: `*` and `/`
- Escape special characters: `&apos;`, `&quot;`
- Group related pages together in navigation
- Validate MDX before committing
- Wait 1-2 minutes for deployment to propagate

### DON'Ts ❌

- Don't use `<script>` tags in MDX files
- Don't use number props: `cols={NUMBER}`
- Don't use special math symbols: `MULTIPLY-SYMBOL`, `DIVIDE-SYMBOL`
- Don't duplicate page titles in heading and menu
- Don't add same file twice to navigation
- Don't use complex markdown inside MDX components
- Don't skip MDX validation before deployment
- Don't panic if deployment takes a few minutes

---

## Examples

### Perfect Settings Page Structure

**File:** `platform/settings/general.mdx`

```markdown
---
title: 'Settings - General'
description: 'Configure organization logo, company details, base currency, and brand value indicators.'
'og:title': 'Settings - General | Valiyou'
---

# General

**Configure your organization's essential settings.** Upload logo, set contact information, base currency, and default brand value indicators.

## Upload Organization Logo

Your logo appears throughout the platform...

<Info>
**Supported Formats:** JPG, PNG, GIF, WebP | **Max File Size:** 2MB | **Output:** Square format
</Info>

## Organization Details

Master data for your organization...

<CardGroup cols="2">
  <Card title="Base Currency" icon="dollar-sign" href="/platform/settings/base-currency">
    Configure default currency
  </Card>
  <Card title="Brand Values" icon="chart-line" href="/platform/settings/brand-values">
    Set default indicators
  </Card>
</CardGroup>
```

**Navigation entry in mint.json:**

```json
{
  "group": "Platform",
  "pages": ["platform/settings/general"]
}
```

**Result:**

- Menu: "Settings - General" ✓
- Heading: "General" ✓
- No duplication ✓
- Validates successfully ✓
- Deploys successfully ✓

---

## Version History

- **2025-02-03:** Initial guide created documenting naming conventions, MDX requirements, and deployment process
