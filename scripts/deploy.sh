#!/bin/bash

# Valiyou Knowledge Center Deployment Script
# Triggers Mintlify deployment (auto-deploys via GitHub push)

set -e  # Exit on error

echo "📚 Deploying Valiyou Knowledge Center..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: You have uncommitted changes"
  echo ""
  read -p "Do you want to commit and push? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
  fi

  # Stage all changes
  git add .

  # Ask for commit message
  read -p "Enter commit message: " COMMIT_MSG

  # Commit
  git commit -m "$COMMIT_MSG"
fi

# Push to origin
echo "📤 Pushing to origin/$CURRENT_BRANCH..."
git push origin "$CURRENT_BRANCH"

echo ""
echo "✅ Pushed successfully!"
echo ""
echo "🔄 Mintlify will automatically deploy within 2-5 minutes"
echo ""

# Submit to IndexNow for instant search engine indexing
if [ -f "scripts/indexnow.js" ]; then
  echo "🔍 Notifying search engines via IndexNow..."
  echo ""
  node scripts/indexnow.js
  echo ""
fi

echo "🔗 Check deployment status:"
echo "   https://dashboard.mintlify.com"
echo "   https://docs.valiyou.com"
