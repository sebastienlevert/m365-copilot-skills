# M365 Agent Scaffolder

A skill for quickly scaffolding new Microsoft 365 Copilot declarative agent projects using ATK CLI.

## What It Does

This skill creates the initial project structure for M365 Copilot agents. It:

1. Verifies the current directory is empty
2. Collects the project name
3. Scaffolds the project using ATK CLI
4. Automatically hands off to `m365-agent-developer` for implementation

## When to Use

Use this skill **only** when creating a brand new M365 Copilot agent project from scratch.

For existing projects, implementation, deployment, or troubleshooting, use the `m365-agent-developer` skill instead.

## References

- [Examples](references/examples.md) - Usage examples
- [Best Practices](references/best-practices.md) - Guidelines for scaffolding projects
