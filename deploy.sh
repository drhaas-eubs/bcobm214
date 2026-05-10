#!/usr/bin/env bash
#
# BCOBM214 — one-shot deploy to GitHub
# © 2026 Dr. Hildegard Haas · EU Business School
#
# Usage:
#   1. Open https://github.com/new and create an empty repo named "bcobm214"
#      (Public, no README/.gitignore/license — leave them all unchecked).
#   2. Run this script from the project folder:
#        bash deploy.sh drhaas-eubs        # replace with your GitHub username
#   3. After the push, on GitHub: Settings -> Pages -> Source: main branch / root
#      Site goes live at https://<username>.github.io/bcobm214/
#
# Re-running this script after edits commits and pushes the latest changes.

set -e

# --- Configuration ---
USER="${1:-drhaas-eubs}"
REPO="bcobm214"
REMOTE_URL="https://github.com/${USER}/${REPO}.git"

echo ""
echo "================================================================"
echo "  BCOBM214 deploy"
echo "  GitHub user : ${USER}"
echo "  Repository  : ${REPO}"
echo "  Remote URL  : ${REMOTE_URL}"
echo "================================================================"
echo ""

# --- Ensure we're in the project folder ---
if [ ! -f "index.html" ]; then
  echo "ERROR: index.html not found. Run this script from inside the project folder."
  exit 1
fi

# --- First-time git setup, idempotent ---
if [ ! -d ".git" ]; then
  echo "→ Initialising new git repository..."
  git init -b main
  git add .
  git commit -m "Initial commit: BCOBM214 course site"
else
  echo "→ Existing git repository found, staging changes..."
  git add .
  if git diff --cached --quiet; then
    echo "→ No changes to commit."
  else
    read -r -p "Commit message: " MSG
    MSG="${MSG:-Update course site}"
    git commit -m "${MSG}"
  fi
fi

# --- Set remote (idempotent) ---
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "→ Adding remote origin -> ${REMOTE_URL}"
  git remote add origin "${REMOTE_URL}"
else
  CURRENT_URL=$(git remote get-url origin)
  if [ "${CURRENT_URL}" != "${REMOTE_URL}" ]; then
    echo "→ Updating remote origin -> ${REMOTE_URL}"
    git remote set-url origin "${REMOTE_URL}"
  fi
fi

# --- Push ---
echo "→ Pushing to ${REMOTE_URL} (main)..."
git push -u origin main

echo ""
echo "================================================================"
echo "  Done. Now enable GitHub Pages:"
echo ""
echo "  1. Open  https://github.com/${USER}/${REPO}/settings/pages"
echo "  2. Source: Deploy from a branch"
echo "  3. Branch: main · Folder: / (root)"
echo "  4. Save"
echo ""
echo "  Wait ~30-60 seconds, then your site is live at:"
echo "      https://${USER}.github.io/${REPO}/"
echo "================================================================"
echo ""
