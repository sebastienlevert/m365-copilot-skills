#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, '..', 'plugins', 'm365-copilot-skills', 'skills');
const CLAUDE_SKILLS_DIR = path.join(homedir(), '.claude', 'skills');
const WATCH_MODE = process.argv.includes('--watch');

/**
 * Ensure the target directory exists
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
}

/**
 * Copy a file from source to destination
 */
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

/**
 * Recursively copy directory
 */
function copyDirectory(src, dest) {
  ensureDirectoryExists(dest);

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

/**
 * Get all skill directories (excluding .gitkeep and hidden files)
 */
function getSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log('⚠ No skills directory found');
    return [];
  }

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}

/**
 * Sync a single skill to Claude skills directory
 */
function syncSkill(skillName) {
  const srcDir = path.join(SKILLS_DIR, skillName);
  const destDir = path.join(CLAUDE_SKILLS_DIR, skillName);

  try {
    copyDirectory(srcDir, destDir);
    console.log(`✓ Synced: ${skillName}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to sync ${skillName}:`, error.message);
    return false;
  }
}

/**
 * Sync all skills
 */
function syncAllSkills() {
  console.log('🔄 Syncing M365 Copilot Skills to Claude...\n');

  // Ensure Claude skills directory exists
  ensureDirectoryExists(CLAUDE_SKILLS_DIR);

  const skills = getSkills();

  if (skills.length === 0) {
    console.log('📭 No skills found to sync.');
    console.log('   Add skills to the ./skills directory to get started.\n');
    return;
  }

  console.log(`Found ${skills.length} skill(s) to sync:\n`);

  let successCount = 0;
  for (const skill of skills) {
    if (syncSkill(skill)) {
      successCount++;
    }
  }

  console.log(`\n✨ Sync complete: ${successCount}/${skills.length} skills synced`);
  console.log(`📁 Skills location: ${CLAUDE_SKILLS_DIR}\n`);
}

/**
 * Watch for changes and sync
 */
function watchAndSync() {
  console.log('👀 Watching for changes in skills directory...\n');
  syncAllSkills();

  fs.watch(SKILLS_DIR, { recursive: true }, (eventType, filename) => {
    if (filename) {
      console.log(`\n🔄 Detected change: ${filename}`);
      syncAllSkills();
    }
  });

  console.log('Press Ctrl+C to stop watching.\n');
}

// Main execution
if (WATCH_MODE) {
  watchAndSync();
} else {
  syncAllSkills();
}
