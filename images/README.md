# Images Directory Structure

This directory contains all screenshots and images for the Valiyou Knowledge Center documentation.

## Directory Structure

```
images/
├── valuations/
│   ├── create-valuation/       # Screenshots for "Create Valuation" page
│   ├── dashboard/              # Screenshots for "Dashboard" page
│   ├── valuations-list/        # Screenshots for "Valuations List" page
│   ├── valuation-details/      # Screenshots for "Valuation Details" page
│   ├── reports/                # Screenshots for "Reports" page
│   └── methods/                # Screenshots for "Methods" page
│
├── sponsorships/
│   ├── sponsors/               # Screenshots for "Sponsors" page
│   ├── library/                # Screenshots for "Library" page
│   ├── packages/               # Screenshots for "Packages" page
│   ├── proposals/              # Screenshots for "Proposals" page
│   └── analytics/              # Screenshots for "Analytics" page
│
└── platform/
    ├── user-profile/           # Screenshots for "User Profile" page
    ├── billing/                # Screenshots for "Billing" page
    ├── team-management/        # Screenshots for "Team Management" page
    ├── organization-settings/  # Screenshots for "Organization Settings" page
    ├── audit-log/              # Screenshots for "Audit Log" page
    ├── plugins/                # Screenshots for "Plugins" page
    └── api/                    # Screenshots for "API" page
```

## Usage in Documentation

To use images in your `.mdx` files:

### Basic Image
```markdown
![Alt text](/images/valuations/dashboard/overview.png)
```

### Image with Frame (recommended for screenshots)
```markdown
<Frame>
  <img src="/images/valuations/dashboard/overview.png" alt="Dashboard Overview" />
</Frame>
```

### Image with Caption
```markdown
<Frame caption="This is the main dashboard view">
  <img src="/images/valuations/dashboard/overview.png" alt="Dashboard Overview" />
</Frame>
```

### Side-by-Side Images
```markdown
<CardGroup cols={2}>
  <Frame>
    <img src="/images/before.png" alt="Before" />
  </Frame>
  <Frame>
    <img src="/images/after.png" alt="After" />
  </Frame>
</CardGroup>
```

## File Naming Conventions

- Use **lowercase** and **hyphens** for file names: `create-new-valuation.png`
- Use descriptive names: `dashboard-overview.png`, `sponsor-list-empty-state.png`
- Use numbers for sequential steps: `step-1-select-method.png`, `step-2-enter-data.png`
- Avoid spaces and special characters

## Image Guidelines

- **Format**: PNG for screenshots (best quality), JPG for photos
- **Resolution**: Use 2x retina resolution (e.g., 1600x900 for a 800x450 display)
- **File size**: Optimize images to keep file size under 500KB
- **Annotations**: Use red boxes/arrows for highlighting important areas
- **Dark mode**: Include both light and dark mode screenshots where applicable

## Example File Names

```
valuations/create-valuation/
  - step-1-select-method.png
  - step-2-basic-info.png
  - step-3-financial-data.png
  - step-4-media-metrics.png
  - step-5-review-submit.png

sponsorships/sponsors/
  - sponsor-list-overview.png
  - sponsor-list-empty-state.png
  - add-sponsor-modal.png
  - sponsor-details-page.png
  - edit-sponsor-form.png

platform/billing/
  - subscription-overview.png
  - payment-method.png
  - invoice-history.png
  - upgrade-modal.png
```

## Deployment

After adding images, commit and push to trigger Mintlify rebuild:

```bash
git add images/
git commit -m "Add screenshots for [feature name]"
git push
```

Mintlify will automatically deploy the updated documentation to docs.valiyou.com.
