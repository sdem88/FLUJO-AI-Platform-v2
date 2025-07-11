#!/usr/bin/env bash
if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies…"
  npm install --legacy-peer-deps
fi
echo "✅ Flujo ready. Hit the ▶️  Run button."
