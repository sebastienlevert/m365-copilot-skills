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
├── template/           # Template for creating new skills
├── docs/              # Additional documentation
└── .github/           # GitHub configuration and workflows
```

## Available Skills

Skills will be organized by Microsoft 365 service area:

- **Microsoft Graph**: Skills for working with Microsoft Graph API
- **SharePoint**: SharePoint development and customization skills
- **Teams**: Microsoft Teams app development skills
- **Power Platform**: Power Apps, Power Automate, and Power BI skills
- **Security & Compliance**: M365 security and compliance automation
- **Azure**: Azure services integration with M365

*Skills are being added incrementally. Check back soon for the first releases.*

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
tags: [microsoft-365, graph-api, relevant-tags]
---

# Skill Name

[Detailed instructions for the AI agent]

## When to Use This Skill
- Scenario 1
- Scenario 2

## Key Concepts
- Concept 1
- Concept 2

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
