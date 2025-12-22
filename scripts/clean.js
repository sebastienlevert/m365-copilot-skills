#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, '..', 'plugins', 'm365-copilot-skills', 'skills');
const CLAUDE_SKILLS_DIR = path.join(homedir(), '.claude', 'skills');

/**
 * Recursively remove directory
 */
function removeDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeDirectory(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }

  fs.rmdirSync(dir);
}

/**
 * Get all skill directories
 */
function getSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    return [];
  }

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}

/**
 * Clean synced skills from Claude directory
 */
function cleanSkills() {
  console.log('🧹 Cleaning M365 Copilot Skills from Claude...\n');

  if (!fs.existsSync(CLAUDE_SKILLS_DIR)) {
    console.log('✓ No Claude skills directory found. Nothing to clean.\n');
    return;
  }

  const skills = getSkills();

  if (skills.length === 0) {
    console.log('📭 No skills found in repository.\n');
    return;
  }

  let removedCount = 0;

  for (const skill of skills) {
    const skillDir = path.join(CLAUDE_SKILLS_DIR, skill);

    if (fs.existsSync(skillDir)) {
      try {
        removeDirectory(skillDir);
        console.log(`✓ Removed: ${skill}`);
        removedCount++;
      } catch (error) {
        console.error(`✗ Failed to remove ${skill}:`, error.message);
      }
    }
  }

  if (removedCount === 0) {
    console.log('✓ No skills were synced to Claude. Nothing to clean.\n');
  } else {
    console.log(`\n✨ Cleanup complete: ${removedCount} skill(s) removed\n`);
  }
}

// Run the script
cleanSkills();
