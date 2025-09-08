#!/bin/bash

# 🧹 ESLint Auto-Fix Script for ShriArya LMS
# This script automatically fixes most ESLint warnings

echo "🧹 Starting ESLint auto-fix..."

# Fix unused imports and variables
echo "📦 Fixing unused imports and variables..."
npx eslint --fix src/app/api/ --ext .ts,.tsx
npx eslint --fix src/contexts/ --ext .ts,.tsx
npx eslint --fix src/app/courses/ --ext .ts,.tsx
npx eslint --fix src/app/auth/ --ext .ts,.tsx

# Fix formatting issues
echo "🎨 Fixing formatting issues..."
npx eslint --fix src/app/components-demo/ --ext .ts,.tsx

echo "✅ ESLint auto-fix completed!"
echo "📊 Run 'npm run lint' to see remaining warnings"
