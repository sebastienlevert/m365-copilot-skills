#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

/**
 * Create readline interface for user input
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompt user for input
 */
function prompt(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

/**
 * Convert skill name to kebab-case
 */
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Copy directory recursively
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Update SKILL.md with user-provided information
 */
function updateSkillMd(skillPath, skillData) {
  const skillMdPath = path.join(skillPath, 'SKILL.md');
  let content = fs.readFileSync(skillMdPath, 'utf-8');

  // Update frontmatter
  content = content.replace('name: skill-template', `name: ${skillData.name}`);
  content = content.replace(
    'description: A template for creating new Microsoft 365 Copilot skills. Replace this with a clear description of what your skill does and when it should be used.',
    `description: ${skillData.description}`
  );
  content = content.replace('tags: [microsoft-365, template, example]', `tags: [microsoft-365, ${skillData.tags}]`);
  content = content.replace('author: Your Name', `author: ${skillData.author}`);

  // Update title
  content = content.replace('# Skill Template', `# ${skillData.displayName}`);

  fs.writeFileSync(skillMdPath, content);
}

/**
 * Update README.md with user-provided information
 */
function updateReadme(skillPath, skillData) {
  const readmePath = path.join(skillPath, 'README.md');
  let content = fs.readFileSync(readmePath, 'utf-8');

  content = content.replace('# Skill Template', `# ${skillData.displayName}`);
  content = content.replace(
    'This is a template for creating new Microsoft 365 Copilot skills. Use this as a starting point when creating your own skill.',
    skillData.description
  );

  fs.writeFileSync(readmePath, content);
}

/**
 * Main function to create a new skill
 */
async function createNewSkill() {
  console.log('🎯 Create a New M365 Copilot Skill\n');

  try {
    // Gather information
    const displayName = await prompt('Skill display name (e.g., "Graph API Authentication"): ');
    if (!displayName.trim()) {
      console.log('❌ Skill name is required');
      rl.close();
      return;
    }

    const skillName = toKebabCase(displayName);
    console.log(`   → Skill directory name: ${skillName}\n`);

    const description = await prompt('Brief description: ');
    if (!description.trim()) {
      console.log('❌ Description is required');
      rl.close();
      return;
    }

    const tagsInput = await prompt('Tags (comma-separated, e.g., "graph-api, authentication"): ');
    const tags = tagsInput.trim() || 'graph-api';

    const author = await prompt('Author name: ');
    const authorName = author.trim() || 'Anonymous';

    // Check if skill already exists
    const skillPath = path.join(SKILLS_DIR, skillName);
    if (fs.existsSync(skillPath)) {
      console.log(`\n❌ Skill "${skillName}" already exists!`);
      rl.close();
      return;
    }

    // Create skill from template
    console.log(`\n🔨 Creating skill "${skillName}"...`);

    copyDirectory(TEMPLATE_DIR, skillPath);

    const skillData = {
      name: skillName,
      displayName,
      description,
      tags,
      author: authorName,
    };

    updateSkillMd(skillPath, skillData);
    updateReadme(skillPath, skillData);

    console.log(`\n✨ Skill created successfully!`);
    console.log(`\n📁 Location: ${skillPath}`);
    console.log(`\nNext steps:`);
    console.log(`  1. Edit ${skillName}/SKILL.md with your skill instructions`);
    console.log(`  2. Add code examples to ${skillName}/examples/`);
    console.log(`  3. Run "npm run validate" to check your skill`);
    console.log(`  4. Run "npm run sync" to sync to Claude\n`);

    rl.close();
  } catch (error) {
    console.error('\n❌ Error creating skill:', error.message);
    rl.close();
    process.exit(1);
  }
}

// Run the script
createNewSkill();
