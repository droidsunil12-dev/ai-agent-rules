#!/usr/bin/env bash
# AI Agent Rules & Skills Installer (Linux/macOS)
set -e

echo "=== Installing AI Agent Rules, Skills & Memories ==="

ASIDE_DIR="$HOME/.aside/u/0"
mkdir -p "$ASIDE_DIR"

TEMP_ZIP="/tmp/ai-agent-rules.zip"
EXTRACT_DIR="/tmp/ai-agent-rules-extract"

echo "Downloading latest rules package from GitHub..."
curl -sSL "https://github.com/droidsunil12-dev/ai-agent-rules/archive/refs/heads/main.zip" -o "$TEMP_ZIP"

echo "Extracting..."
rm -rf "$EXTRACT_DIR"
mkdir -p "$EXTRACT_DIR"
unzip -q "$TEMP_ZIP" -d "$EXTRACT_DIR"

SOURCE_ROOT="$EXTRACT_DIR/ai-agent-rules-main"
if [ ! -d "$SOURCE_ROOT" ]; then
    SOURCE_ROOT="$EXTRACT_DIR"
fi

# Copy rules
for f in AGENTS.md SOUL.md SYSTEM-PROMPT-FOR-ANY-AI.md HOW-TO-USE-WITH-ANY-AI.md; do
    if [ -f "$SOURCE_ROOT/$f" ]; then
        cp -f "$SOURCE_ROOT/$f" "$ASIDE_DIR/"
        echo "Installed: $f"
    fi
done

# Copy skills
if [ -d "$SOURCE_ROOT/skills" ]; then
    mkdir -p "$ASIDE_DIR/skills/user"
    cp -rf "$SOURCE_ROOT/skills/"* "$ASIDE_DIR/skills/user/"
    echo "Installed skills to $ASIDE_DIR/skills/user/"
fi

# Copy memory
if [ -d "$SOURCE_ROOT/memory" ]; then
    mkdir -p "$ASIDE_DIR/memory"
    cp -rf "$SOURCE_ROOT/memory/"* "$ASIDE_DIR/memory/"
    echo "Installed memories to $ASIDE_DIR/memory/"
fi

# Clean up
rm -rf "$TEMP_ZIP" "$EXTRACT_DIR"

echo "=== AI Agent Rules Successfully Installed! ==="
