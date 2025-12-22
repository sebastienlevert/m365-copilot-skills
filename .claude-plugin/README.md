# Claude Code Plugin Configuration

This directory contains configuration files for distributing M365 Copilot Skills through Claude Code's plugin marketplace system.

## Files

### marketplace.json

Defines the marketplace configuration for this skill collection. This file tells Claude Code:
- Marketplace metadata (name, description, version)
- Available plugins (skills) that can be installed
- Plugin metadata (name, description, path, tags)
- Categories and keywords for discovery

## Plugin Distribution

When users run `/plugin marketplace add sebastienlevert/m365-copilot-skills` in Claude Code, it reads this marketplace.json file to understand what skills are available.

### Installing Skills

Users can install skills from this marketplace using:

```bash
# Add the marketplace
/plugin marketplace add sebastienlevert/m365-copilot-skills

# Install a specific skill
/plugin install m365-agent-scaffolder@m365-copilot-skills
/plugin install m365-agent-developer@m365-copilot-skills

# Or install all skills
/plugin install @m365-copilot-skills
```

## Adding New Skills to the Marketplace

When you add a new skill to the repository, update `marketplace.json`:

1. Add a new entry to the `plugins` array:
```json
{
  "name": "your-skill-name",
  "displayName": "Your Skill Display Name",
  "description": "Clear description of what this skill does",
  "version": "1.0.0",
  "type": "skill",
  "path": "skills/your-skill-name",
  "tags": ["microsoft-365", "relevant", "tags"],
  "author": "Your Name"
}
```

2. Ensure the `path` points to the correct skill directory

3. Add relevant tags for discoverability

4. Update the marketplace version if needed

## Schema

The marketplace.json follows the Claude Code marketplace schema. Key fields:

- **name**: Unique identifier for the marketplace
- **displayName**: Human-readable name shown to users
- **description**: What this skill collection provides
- **version**: Semantic version of the marketplace
- **plugins**: Array of available plugins
  - **name**: Unique plugin identifier (should match directory name)
  - **displayName**: Human-readable plugin name
  - **description**: What the plugin does
  - **version**: Plugin version
  - **type**: "skill" for Claude Code skills
  - **path**: Relative path from repository root
  - **tags**: Array of keywords for search/filtering
  - **author**: Plugin creator

## Validation

Before committing changes to marketplace.json:

1. Ensure all referenced paths exist
2. Verify all skills have valid SKILL.md files
3. Check that names match directory names
4. Run `npm run validate` to check skill integrity

## Distribution Notes

- This marketplace is distributed via GitHub
- Claude Code fetches marketplace.json from the repository
- Skills are installed by copying from the specified paths
- Keep marketplace.json in sync with actual skills in the repository
