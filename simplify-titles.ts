import fs from 'fs';
import path from 'path';

// Mapping of file paths to simple titles
const titleMap: Record<string, string> = {
  // Getting Started
  'getting-started/your-profile.mdx': 'Your Profile',
  'getting-started/organization-settings.mdx': 'Organization',
  'getting-started/invite-team-members.mdx': 'Invite Team',

  // Valuations
  'valuations/create-valuation.mdx': 'Create',
  'valuations/dashboard.mdx': 'Dashboard',
  'valuations/valuations-list.mdx': 'List',
  'valuations/valuation-details.mdx': 'Details',
  'valuations/reports.mdx': 'Reports',
  'valuations/methods.mdx': 'Methods',

  // Sponsorships
  'sponsorships/sponsors.mdx': 'Sponsors',
  'sponsorships/packages.mdx': 'Packages',
  'sponsorships/inventory/inventory.mdx': 'Inventory',
  'sponsorships/inventory/settings.mdx': 'Settings',
  'sponsorships/proposals.mdx': 'Proposals',
  'sponsorships/analytics.mdx': 'Analytics',

  // Platform
  'platform/team-management.mdx': 'Team',
  'platform/organisation.mdx': 'Organization',
  'platform/settings/sso.mdx': 'SSO',
  'platform/settings/advanced.mdx': 'Advanced',
  'platform/settings/documents.mdx': 'Documents',
  'platform/settings-page/platform.mdx': 'Platform Settings',
  'platform/settings-page/valuations.mdx': 'Valuation Settings',
  'platform/settings-page/sponsorships.mdx': 'Sponsorship Settings',
  'platform/billing/billing.mdx': 'Billing',
  'platform/billing/usage.mdx': 'Usage',
  'platform/billing/payment-methods.mdx': 'Payment Methods',
  'platform/billing/invoices.mdx': 'Invoices',
  'platform/billing/billing-details.mdx': 'Billing Details',
  'platform/plugins.mdx': 'Plugins',
  'platform/plugins/universal-importer.mdx': 'Universal Importer',
  'platform/plugins/ai-insights.mdx': 'AI Insights',
  'platform/plugins/cash-flow-visualization.mdx': 'Cash Flow',
  'platform/plugins/social-deep-dive.mdx': 'Social Analytics',
  'platform/api.mdx': 'API',
  'platform/user-profile.mdx': 'Profile',

  // Authentication
  'authentication/login.mdx': 'Login',
  'authentication/signup.mdx': 'Sign Up',
  'authentication/verify-email.mdx': 'Verify Email',
  'authentication/forgot-password.mdx': 'Forgot Password',
  'authentication/reset-password.mdx': 'Reset Password',

  // Trust & Security
  'trust-security/trust-center.mdx': 'Trust Center',

  // Resources
  'resources/glossary.mdx': 'Glossary',
};

function updateTitle(filePath: string, newTitle: string) {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');

  // Match frontmatter title and replace it
  const titleRegex = /^(title:\s*['"]?)([^'"]+)(['"]?)$/m;
  const match = content.match(titleRegex);

  if (match) {
    const oldTitle = match[2];
    content = content.replace(titleRegex, `$1${newTitle}$3`);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ ${filePath}: "${oldTitle}" → "${newTitle}"`);
  } else {
    console.log(`⚠️  No title found in: ${filePath}`);
  }
}

// Update all files
console.log('Updating all page titles to be simple 1-2 words...\n');
Object.entries(titleMap).forEach(([filePath, newTitle]) => {
  updateTitle(filePath, newTitle);
});
console.log('\n✅ Done!');
