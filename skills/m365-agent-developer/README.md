# M365 Agent Developer Skill

Expert guidance for designing, implementing, and deploying Microsoft 365 Copilot agents using TypeSpec and ATK CLI.

## Overview

This comprehensive skill provides expert guidance on the Microsoft 365 Copilot agent development lifecycle: from architectural design through TypeSpec implementation to deployment and publishing using the Agents Toolkit (ATK) CLI.

⚠️ **For creating new projects, use the m365-agent-scaffolder skill first** ⚠️

## What This Skill Provides

- **Architectural Design**: Guidance on deployment models, capability selection, and scoping strategies
- **TypeSpec Implementation**: Best practices for writing type-safe agent code with proper decorators
- **Security Patterns**: Principle of least privilege, credential management, and compliance frameworks
- **Lifecycle Management**: Complete workflows for provisioning, testing, deploying, and sharing agents
- **API Plugin Integration**: Patterns for integrating external APIs with proper authentication
- **Conversation Design**: Instruction patterns and conversation starter best practices
- **Troubleshooting**: Common pitfalls and solutions in M365 Copilot agent development

## When to Use This Skill

Use this skill when:
- Designing the architecture for a new M365 Copilot agent
- Implementing TypeSpec code for agent capabilities and API plugins
- Configuring agent instructions and conversation starters
- Provisioning and deploying agents using ATK CLI
- Managing agent lifecycle across environments (dev, staging, production)
- Reviewing existing agent architectures for best practices
- Troubleshooting TypeSpec compilation or deployment issues
- Adding new capabilities or API plugins to existing agents
- Implementing security patterns and compliance requirements
- Packaging and publishing agents for sharing

## Prerequisites

**Required:**
- Microsoft 365 tenant with Copilot license
- Node.js (v18 or higher) and npm installed
- Understanding of TypeSpec syntax

**Recommended:**
- Visual Studio Code with TypeSpec extension
- Git for version control
- Familiarity with Microsoft 365 services (SharePoint, Teams, OneDrive, etc.)
- Understanding of OAuth2 and authentication flows

## Key References

The skill includes comprehensive reference documentation:

- **[TypeSpec Best Practices](skills/references/typespec-best-practices.md)** - Official TypeSpec patterns for M365 Copilot agents
- **[Architectural Patterns and Frameworks](skills/references/patterns-and-frameworks.md)** - Design patterns and frameworks
- **[API Plugins](skills/references/api-plugins.md)** - Integration patterns for API plugins
- **[Conversation Design](skills/references/conversation-design.md)** - Instruction and conversation starter patterns
- **[Security Guidelines](skills/references/security-guidelines.md)** - Security patterns and compliance frameworks
- **[Deployment](skills/references/deployment.md)** - ATK CLI workflows and CI/CD patterns
- **[Common Pitfalls](skills/references/common-pitfalls.md)** - Anti-patterns and solutions

## Quick Start Examples

### Example 1: Compile and Validate

```bash
npm install
npm run generate:env
npm run compile
```

### Example 2: Development and Provisioning

```bash
npm install
npm run generate:env
npm run compile
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env local
```

### Example 3: Provision and Share

```bash
npm install
npm run generate:env
npm run compile
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env dev
npx -p @microsoft/m365agentstoolkit-cli@latest atk share --scope tenant --env dev
```

## Related Skills

- **[m365-agent-scaffolder](../m365-agent-scaffolder/README.md)** - Use this skill first to create new M365 Copilot agent projects

## Version

1.0.0

## Author

sebastienlevert
