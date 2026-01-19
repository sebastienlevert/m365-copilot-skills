# Contributing to Microsoft 365 Copilot Skills

Thank you for your interest in contributing to this project! Contributions are welcome and appreciated.

## Creating a New Skill

The easiest way to create a new skill is to use the [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) skill. This skill guides you through creating effective skills with proper structure, frontmatter, and best practices.

Simply ask your AI coding agent:

> "Use the skill-creator skill to create a new M365 Copilot skill"

## How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-skill`)
3. **Commit** your changes (`git commit -m 'Add amazing skill'`)
4. **Push** to the branch (`git push origin feature/amazing-skill`)
5. **Open** a Pull Request

## Skill Structure

Each skill should follow this structure:

```
skill-name/
├── SKILL.md           # Main skill instructions (required)
├── README.md          # Skill documentation (recommended)
├── references/        # Additional reference documentation (optional)
└── examples/          # Example usage and code samples (optional)
```

## Guidelines

### Required Files

- **SKILL.md** - The main skill file with frontmatter metadata and instructions

### SKILL.md Format

Your `SKILL.md` file should include:

```yaml
---
name: skill-name
description: Clear description of what this skill does and when to use it
compatibility: Designed for Microsoft 365 Copilot agents development on developer platforms supporting Agent Skills.
metadata:
  authors:
    - your-github-handle
  version: 1.0.0
---

# Skill Name

Description of the skill and its purpose.

## When to Use This Skill

- Scenario 1
- Scenario 2

## Instructions

Step-by-step instructions for the AI agent to follow.

## Best Practices

- Practice 1
- Practice 2
```

### Best Practices

- Each skill should have a `SKILL.md` file with frontmatter metadata
- Include a `README.md` with usage documentation
- Follow the existing skill structure and naming conventions
- Test your skills with actual AI coding agents before submitting
- Keep instructions clear and actionable
- Include examples where appropriate

## Testing Your Skill

Before submitting a pull request:

1. Install the skill locally in your AI coding agent
2. Test common scenarios and edge cases
3. Verify the skill provides accurate and helpful guidance
4. Ensure all file references and paths are correct

## Questions?

If you have questions or need help, feel free to open an issue in the repository.
