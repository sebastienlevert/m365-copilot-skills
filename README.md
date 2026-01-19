# Microsoft 365 Copilot Skills

A curated collection of AI coding agent skills for developing Microsoft 365 Copilot agents. These skills are designed to work with AI coding agents like Claude Code, GitHub Copilot, and other agent-based development tools, providing domain-specific expertise for M365 Copilot agent development.

## What are Skills?

Skills are specialized instruction sets that enhance AI coding agents with domain-specific knowledge and capabilities. They follow the [Agent Skills specification](https://agentskills.io) and provide:

- **Domain Expertise**: Deep knowledge of Microsoft 365 Copilot architecture, TypeSpec, and ATK CLI
- **Reusable Patterns**: Battle-tested workflows for agent development, deployment, and lifecycle management
- **Context-Aware Guidance**: Instructions tailored to specific M365 Copilot development scenarios

## Available Skills

| Skill | Description |
|-------|-------------|
| **[m365-agent-scaffolder](skills/m365-agent-scaffolder/)** | Quickly scaffolds new Microsoft 365 Copilot declarative agent projects using ATK CLI. Use this skill when creating a new empty M365 Copilot agent project from scratch. |
| **[m365-agent-developer](skills/m365-agent-developer/)** | Comprehensive skill for designing, implementing, and deploying M365 Copilot agents using TypeSpec and ATK CLI. Provides architectural guidance, capability configuration, security patterns, and lifecycle management. |

### Workflow

1. **Start with `m365-agent-scaffolder`** - Creates the initial project structure
2. **Continue with `m365-agent-developer`** - Handles all architecture, implementation, and deployment

## Installation

The easiest way to install these skills is using the [skills CLI](https://www.npmjs.com/package/skills):

```bash
# Install all skills from this repository
npx skills add sebastienlevert/m365-copilot-skills
```

### Install Individual Skills

You can also install specific skills:

```bash
# Install the scaffolder skill
npx skills add sebastienlevert/m365-copilot-skills/m365-agent-scaffolder

# Install the developer skill
npx skills add sebastienlevert/m365-copilot-skills/m365-agent-developer
```

### Manual Installation

Alternatively, you can manually install the skills:

1. Clone this repository
2. Copy the desired skill folders to your agent's skills directory (e.g., `~/.claude/skills/` for Claude Code, `~/.copilot/skills/` for GitHub Copilot, `~/.opencode/skills/` for OpenCode)
3. The skills will automatically be available when working on M365 Copilot agent projects

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, the skill structure, and guidelines.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
