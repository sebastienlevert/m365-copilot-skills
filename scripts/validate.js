#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, '..', 'plugins', 'm365-copilot-skills', 'skills');

/**
 * Validation results tracker
 */
class ValidationResults {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.skillCount = 0;
  }

  addError(skill, message) {
    this.errors.push({ skill, message });
  }

  addWarning(skill, message) {
    this.warnings.push({ skill, message });
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  print() {
    console.log(`\n📊 Validation Results\n`);
    console.log(`Skills validated: ${this.skillCount}`);

    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):\n`);
      this.errors.forEach(({ skill, message }) => {
        console.log(`  ${skill}: ${message}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):\n`);
      this.warnings.forEach(({ skill, message }) => {
        console.log(`  ${skill}: ${message}`);
      });
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(`\n✨ All skills are valid!\n`);
    } else {
      console.log('');
    }
  }
}

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
 * Validate a single skill
 */
function validateSkill(skillName, results) {
  const skillDir = path.join(SKILLS_DIR, skillName);
  const skillMdPath = path.join(skillDir, 'SKILL.md');

  // Check if SKILL.md exists
  if (!fs.existsSync(skillMdPath)) {
    results.addError(skillName, 'Missing required SKILL.md file');
    return;
  }

  // Read SKILL.md content
  const content = fs.readFileSync(skillMdPath, 'utf-8');

  // Validate frontmatter
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    results.addError(skillName, 'SKILL.md missing frontmatter (---...---)');
    return;
  }

  // Check required frontmatter fields
  if (!frontmatter.name) {
    results.addError(skillName, 'Frontmatter missing required "name" field');
  }

  if (!frontmatter.description) {
    results.addError(skillName, 'Frontmatter missing required "description" field');
  }

  // Validate name matches directory
  if (frontmatter.name && frontmatter.name !== skillName) {
    results.addWarning(
      skillName,
      `Frontmatter name "${frontmatter.name}" doesn't match directory name "${skillName}"`
    );
  }

  // Check for key sections in SKILL.md
  const requiredSections = [
    'When to Use This Skill',
    'Instructions',
    'Examples',
    'Best Practices'
  ];

  for (const section of requiredSections) {
    if (!content.includes(`## ${section}`)) {
      results.addWarning(skillName, `Missing recommended section: ## ${section}`);
    }
  }

  // Check for examples
  if (!content.includes('```')) {
    results.addWarning(skillName, 'No code examples found (should include ``` code blocks)');
  }

  console.log(`✓ ${skillName}`);
}

/**
 * Get all skills
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
 * Main validation
 */
function validateAllSkills() {
  console.log('🔍 Validating M365 Copilot Skills...\n');

  const skills = getSkills();
  const results = new ValidationResults();

  if (skills.length === 0) {
    console.log('📭 No skills found to validate.\n');
    return;
  }

  results.skillCount = skills.length;

  for (const skill of skills) {
    validateSkill(skill, results);
  }

  results.print();

  // Exit with error code if validation failed
  if (results.hasErrors()) {
    process.exit(1);
  }
}

// Run validation
validateAllSkills();
