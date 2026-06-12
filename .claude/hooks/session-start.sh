#!/bin/bash
set -euo pipefail

echo "=== Session Start: Niche Market Discovery Tool ==="
echo "Tech: React + TypeScript + Vite + Google Gemini API"
echo ""

if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
  echo "WARNING: No .env / .env.local found."
  echo "  Create .env.local with:"
  echo "  GEMINI_API_KEY=your_key_here"
  echo ""
fi

if command -v node &>/dev/null; then
  echo "Node.js: $(node --version)"
fi

if [ -d "node_modules" ]; then
  echo "Dependencies: installed"
else
  echo "Dependencies: NOT installed — run: npm install"
fi

echo ""
echo "Commands:"
echo "  npm run dev      → dev server (http://localhost:3000)"
echo "  npm run build    → production build"
echo "  npx tsc --noEmit → type check"
echo "================================================="
