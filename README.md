# Microsoft 365 Copilot Skills

A curated collection of reusable skills for developing with Microsoft 365 Copilot. These skills are designed to work with AI coding agents like Claude Code, GitHub Copilot, and other agent-based development tools.

## What are Skills?

Skills are specialized instruction sets that enhance AI coding agents with domain-specific knowledge and capabilities. Each skill provides:

- **Domain Expertise**: Deep knowledge of Microsoft 365 services, APIs, and best practices
- **Reusable Patterns**: Common workflows and implementations for M365 development
- **Context-Aware Guidance**: Instructions tailored to specific development scenarios

Skills follow the [Agent Skills specification](https://agentskills.io) and can be used across different AI development tools.

## Repository Structure

```
m365-copilot-skills/
├── skills/              # Collection of M365 skills (coming soon)
├── scripts/            # Utility scripts for managing skills
├── template/           # Template for creating new skills
├── docs/              # Additional documentation
└── .github/           # GitHub configuration and workflows
```

## Quick Start

This repository includes npm scripts to help you manage skills:

```bash
# Install dependencies (if any are added later)
npm install

# Create a new skill interactively
npm run new

# List all available skills
npm run list

# Validate all skills
npm run validate

# Sync skills to Claude Code (~/.claude/skills)
npm run sync

# Watch for changes and auto-sync
npm run sync:watch

# Remove synced skills from Claude
npm run clean
```

### Development Workflow

1. **Create a new skill**: `npm run new` - Follow the interactive prompts
2. **Edit the skill**: Modify `skills/your-skill-name/SKILL.md` with your instructions
3. **Validate**: `npm run validate` - Ensure your skill follows the correct format
4. **Sync to Claude**: `npm run sync` - Copy skills to your Claude Code directory
5. **Test**: Use the skill in Claude Code with `/<skill-name>`

## Available Skills

| Skill Name | Description | Link |
|------------|-------------|------|
| **m365-agent-scaffolder** | Quickly scaffolds new Microsoft 365 Copilot declarative agent projects using ATK CLI. Use when creating a new empty M365 Copilot agent project from scratch. | [SKILL.md](skills/m365-agent-scaffolder/SKILL.md) |
| **m365-agent-developer** | Designs, implements, and deploys Microsoft 365 Copilot agents using TypeSpec and ATK CLI. Provides architectural guidance, capability configuration, security patterns, and lifecycle management. | [SKILL.md](skills/m365-agent-developer/SKILL.md) |

## Using Skills

### With Claude Code

1. Install the skills plugin:
   ```bash
   /plugin marketplace add sebastienlevert/m365-copilot-skills
   ```

2. Install specific skills:
   ```bash
   /plugin install <skill-name>@m365-copilot-skills
   ```

3. Use the skill by referencing it in your conversation:
   ```bash
   /<skill-name>
   ```

### With GitHub Copilot

Skills can be referenced in your workspace by adding them to your project:

1. Clone this repository or add it as a submodule
2. Configure GitHub Copilot to recognize the skills directory
3. Reference skills in your code comments or conversations

### With Other AI Agents

Most AI coding agents support custom instructions or prompt templates. You can:

1. Copy the skill content from the `skills/` directory
2. Paste it into your agent's custom instructions or system prompt
3. Reference the skill when needed

## Creating Custom Skills

Want to create your own M365 skill? Check out the [template](./template) directory for a starter template and the [CONTRIBUTING.md](./CONTRIBUTING.md) guide for detailed instructions.

## NPM Scripts Reference

### `npm run new`
Interactive script to create a new skill from the template. Prompts for:
- Skill display name
- Description
- Tags
- Author name

Creates a new skill directory with all necessary files pre-configured.

### `npm run list`
Lists all skills in the repository with their metadata:
- Name and version
- Description
- Tags
- Author

### `npm run validate`
Validates all skills to ensure they follow the correct format:
- Checks for required files (SKILL.md)
- Validates frontmatter fields
- Verifies recommended sections
- Reports errors and warnings

Returns exit code 1 if validation fails (useful for CI/CD).

### `npm run sync`
Syncs all skills from `./skills/` to `~/.claude/skills/` for use with Claude Code.
- Creates the Claude skills directory if it doesn't exist
- Copies all skill files recursively
- Reports sync status for each skill

### `npm run sync:watch`
Same as `npm run sync` but watches for changes and automatically re-syncs.
Useful during development when you're actively editing skills.

### `npm run clean`
Removes all synced skills from `~/.claude/skills/` directory.
Useful for cleanup or testing fresh installations.

### `npm run test`
Alias for `npm run validate`. Runs validation checks on all skills.

## Skill Structure

Each skill follows this structure:

```
skill-name/
├── SKILL.md           # Main skill instructions (required)
├── README.md          # Skill documentation (recommended)
├── examples/          # Example usage and code samples (optional)
└── resources/         # Additional resources (optional)
```

The `SKILL.md` file contains the core instructions that AI agents use. It should include:

```yaml
---
name: skill-name
description: Clear description of what this skill does and when to use it
metadata:
   - authors:
      - github-handle
---

# Skill Name

Description of the skill and its purpose.

## When to Use This Skill
- Scenario 1
- Scenario 2

## Key References
- Reference 1
- Reference 2

## Instructions
- Step 1
- Step 2

## Examples
- Example 1
- Example 2

## Best Practices
- Practice 1
- Practice 2
```

## Contributing

Contributions are welcome! Whether you want to:

- Add a new skill
- Improve existing skills
- Fix bugs or typos
- Enhance documentation

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute.

## Related Resources

- [Microsoft Graph Documentation](https://learn.microsoft.com/graph)
- [Microsoft 365 Developer Portal](https://developer.microsoft.com/microsoft-365)
- [Agent Skills Specification](https://agentskills.io)
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
- [OpenAI Skills Repository](https://github.com/openai/skills)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Disclaimer

These skills are provided for educational and development purposes. Always test thoroughly in your own environment before using in production. Skills are community-maintained and not officially endorsed by Microsoft unless explicitly stated.

## Support

- **Issues**: Report bugs or request features via [GitHub Issues](../../issues)
- **Discussions**: Join the conversation in [GitHub Discussions](../../discussions)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get involved

---

Built with love for the Microsoft 365 developer community
