#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, '..', 'plugins', 'm365-copilot-skills', 'skills');

/**
 * Parse frontmatter from SKILL.md
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value;
    }
  }

  return frontmatter;
}

/**
 * Get skill information
 */
function getSkillInfo(skillName) {
  const skillDir = path.join(SKILLS_DIR, skillName);
  const skillMdPath = path.join(skillDir, 'SKILL.md');

  if (!fs.existsSync(skillMdPath)) {
    return {
      name: skillName,
      description: 'No SKILL.md found',
      tags: [],
      version: 'unknown',
    };
  }

  const content = fs.readFileSync(skillMdPath, 'utf-8');
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    return {
      name: skillName,
      description: 'Invalid SKILL.md format',
      tags: [],
      version: 'unknown',
    };
  }

  return {
    name: frontmatter.name || skillName,
    description: frontmatter.description || 'No description',
    tags: frontmatter.tags ? frontmatter.tags.replace(/[\[\]]/g, '').split(',').map(t => t.trim()) : [],
    version: frontmatter.version || '1.0.0',
    author: frontmatter.author || 'Unknown',
  };
}

/**
 * Get all skills
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
 * List all skills
 */
function listSkills() {
  console.log('📚 M365 Copilot Skills\n');

  const skills = getSkills();

  if (skills.length === 0) {
    console.log('📭 No skills found.');
    console.log('   Run "npm run new" to create your first skill.\n');
    return;
  }

  console.log(`Found ${skills.length} skill(s):\n`);

  skills.forEach(skillName => {
    const info = getSkillInfo(skillName);
    console.log(`📦 ${info.name} (v${info.version})`);
    console.log(`   ${info.description}`);
    if (info.tags.length > 0) {
      console.log(`   Tags: ${info.tags.join(', ')}`);
    }
    if (info.author && info.author !== 'Unknown') {
      console.log(`   Author: ${info.author}`);
    }
    console.log('');
  });

  console.log(`💡 Run "npm run sync" to sync these skills to Claude\n`);
}

// Run the script
listSkills();
