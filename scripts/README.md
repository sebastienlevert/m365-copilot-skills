# Management Scripts

This directory contains utility scripts for managing M365 Copilot Skills. All scripts are written in JavaScript (ES Modules) and can be run via npm scripts or directly with Node.js.

## Available Scripts

### sync.js

Syncs all skills from `./skills/` to `~/.claude/skills/` for use with Claude Code.

**Usage:**
```bash
npm run sync
# or
node scripts/sync.js
```

**With watch mode:**
```bash
npm run sync:watch
# or
node scripts/sync.js --watch
```

**What it does:**
- Creates `~/.claude/skills/` directory if it doesn't exist
- Recursively copies all skill directories from `./skills/`
- Skips hidden files and `.gitkeep`
- Reports sync status for each skill
- In watch mode, automatically re-syncs on file changes

### validate.js

Validates all skills to ensure they follow the correct format and conventions.

**Usage:**
```bash
npm run validate
# or
node scripts/validate.js
```

**What it validates:**
- Presence of required `SKILL.md` file
- Frontmatter format and required fields (name, description)
- Name consistency between frontmatter and directory
- Presence of recommended sections
- Code examples (checks for code blocks)
- Presence of recommended `README.md`

**Exit codes:**
- `0`: All validations passed
- `1`: One or more validation errors found

### new-skill.js

Interactive script to create a new skill from the template.

**Usage:**
```bash
npm run new
# or
node scripts/new-skill.js
```

**Prompts for:**
- Skill display name (e.g., "Graph API Authentication")
- Brief description
- Tags (comma-separated)
- Author name

**What it does:**
- Converts display name to kebab-case for directory name
- Copies template directory structure
- Updates `SKILL.md` with provided information
- Updates `README.md` with skill details
- Creates skill in `./skills/` directory

### list-skills.js

Lists all available skills with their metadata.

**Usage:**
```bash
npm run list
# or
node scripts/list-skills.js
```

**Displays:**
- Skill name and version
- Description
- Tags
- Author

### clean.js

Removes all synced skills from `~/.claude/skills/` directory.

**Usage:**
```bash
npm run clean
# or
node scripts/clean.js
```

**What it does:**
- Identifies all skills in the local repository
- Removes matching skill directories from `~/.claude/skills/`
- Reports cleanup status

## Script Requirements

- **Node.js**: >= 18.0.0
- **Type**: ES Modules (uses `import` statements)
- **Dependencies**: None (uses only Node.js built-ins)

## Development

### Adding New Scripts

1. Create a new `.js` file in this directory
2. Add shebang: `#!/usr/bin/env node`
3. Use ES Module syntax (`import`/`export`)
4. Make it executable: `chmod +x scripts/your-script.js`
5. Add npm script in `package.json`
6. Document it in this README

### Common Patterns

**Get skills directory:**
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_DIR = path.join(__dirname, '..', 'skills');
```

**Parse SKILL.md frontmatter:**
```javascript
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  }

  return frontmatter;
}
```

**Get all skill directories:**
```javascript
function getSkills() {
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}
```

## Troubleshooting

### Permission Errors

If you get permission errors, ensure scripts are executable:
```bash
chmod +x scripts/*.js
```

### Module Not Found

If you get "Cannot find module" errors, ensure `package.json` has:
```json
{
  "type": "module"
}
```

### Watch Mode Not Working

Watch mode requires Node.js 18+ with native `fs.watch` support. Ensure you're using a compatible Node version:
```bash
node --version
```

## Future Enhancements

Potential scripts to add:
- `publish.js`: Publish skills to a registry or marketplace
- `test.js`: Run automated tests on skill examples
- `format.js`: Format all SKILL.md files consistently
- `stats.js`: Generate statistics about skills
- `search.js`: Search skills by tags or keywords
