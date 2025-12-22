# M365 Agent Scaffolder Skill

Quickly scaffolds new Microsoft 365 Copilot declarative agent projects using ATK CLI.

## Overview

⚠️ **QUICK PROJECT CREATION ONLY** ⚠️

This skill does ONE thing: creates new M365 Copilot agent project structures using ATK CLI. It collects minimal required information and scaffolds the project. All architecture, planning, implementation, and deployment is handled by other skills.

## What This Skill Provides

- **Interactive Project Creation**: Collects project name and location preferences
- **Automated Scaffolding**: Runs ATK CLI commands to create project structure
- **TypeSpec Integration**: Includes TypeSpec plugin scaffolding by default
- **Declarative Agent Setup**: Creates declarative agent configuration files

## When to Use This Skill

Use this skill ONLY when:
- Creating a brand new empty M365 Copilot agent project from scratch
- The user explicitly asks to create a new project, agent, or workspace
- Starting a new agent development initiative that needs initial project structure

**Do NOT use this skill when:**
- Working with existing projects (use m365-agent-developer)
- Implementing features or capabilities (use m365-agent-developer)
- Deploying or managing agents (use m365-agent-developer)
- Troubleshooting issues (use m365-agent-developer)
- Designing architecture or planning (use m365-agent-developer)

## What Gets Created

The skill scaffolds a complete project structure with:
- `package.json` with required dependencies
- TypeSpec configuration and starter files
- `.env` template for environment variables
- Agent manifest and configuration files
- ATK CLI configuration
- Git ignore file

## Usage

Simply ask to create a new M365 Copilot agent project:

```
Create a new M365 Copilot agent project called "customer-support-agent"
```

The skill will:
1. Verify this is a new project request
2. Collect project name (and optionally location)
3. Run the ATK CLI scaffolding command
4. Confirm creation and recommend next steps

## Command Used

```bash
npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n <project-name> -c declarative-agent -with-plugin type-spec -i false
```

## Next Steps After Scaffolding

After creating the project structure, use the **m365-agent-developer** skill to:
- Design the agent architecture
- Implement TypeSpec code for capabilities
- Configure agent instructions and conversation starters
- Provision and deploy the agent
- Test and iterate on the implementation

## Related Skills

- **[m365-agent-developer](../m365-agent-developer/README.md)** - Use this skill after scaffolding to implement and deploy your agent

## Version

1.0.0

## Author

sebastienlevert
