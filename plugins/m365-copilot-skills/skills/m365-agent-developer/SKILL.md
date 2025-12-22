---
name: m365-agent-developer
description: Designs, implements, and deploys Microsoft 365 Copilot agents using TypeSpec and ATK CLI. Provides architectural guidance, capability configuration, security patterns, and lifecycle management. Use when developing M365 Copilot agents, working with TypeSpec, or managing agent deployments. For creating new projects, use the m365-agent-scaffolder skill.
compatibility: Designed for Microsoft 365 Copilot agents development on developer platforms supporting Agent Skills.
metadata:
  authors:
    - sebastienlevert
  version: 1.0.0
---

# M365 Agent Developer

This comprehensive skill provides expert guidance on the Microsoft 365 Copilot agent development lifecycle: from architectural design through TypeSpec implementation to deployment and publishing using the Agents Toolkit (ATK) CLI.

⚠️ **For creating new projects, use the m365-agent-scaffolder skill first** ⚠️

---

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

Do NOT use this skill for creating new empty projects - use the `m365-agent-scaffolder` skill instead.

## Prerequisites

Before using this skill, ensure the following requirements are met:

**Required:**
- Microsoft 365 tenant with Copilot license
- Node.js (v18 or higher) and npm installed
- Understanding of TypeSpec syntax

**Recommended:**
- Visual Studio Code with TypeSpec extension
- Git for version control
- Familiarity with Microsoft 365 services (SharePoint, Teams, OneDrive, etc.)
- Understanding of OAuth2 and authentication flows

**Knowledge Prerequisites:**
- Microsoft 365 Copilot architecture and capabilities
- TypeSpec language and decorators
- REST API design principles
- Security best practices (least privilege, credential management)

## Key References

- **[TypeSpec Best Practices](references/typespec-best-practices.md)** - Official TypeSpec patterns and best practices for M365 Copilot agents
- **[Architectural Patterns and Frameworks](references/patterns-and-frameworks.md)**
- **[API Plugins](references/api-plugins.md)** - Integration patterns and best practices for API plugins
- **[Conversation Design](references/conversation-design.md)** - Instruction patterns and conversation starter best practices
- **[Security Guidelines](references/security-guidelines.md)** - Security patterns, compliance frameworks, and credential management
- **[Deployment](references/deployment.md)** - Complete ATK CLI workflows, environment management, and CI/CD patterns
- **[Common Pitfalls](references/common-pitfalls.md)** - Anti-patterns and solutions in M365 Copilot agent development

## Table of Contents

1. [Overview](#overview)
2. [Architectural Design](#architectural-design)
3. [TypeSpec for Microsoft 365 Copilot Best Practices](#typespec-for-microsoft-365-copilot-best-practices)
4. [Lifecycle management and ATK CLI best practices](#lifecycle-management-and-atk-cli-best-practices)
5. [Interaction Guidelines](#interaction-guidelines)
6. [Architectural Principles](#architectural-principles)
7. [Remember](#remember)

---

## Instructions

Follow these step-by-step instructions when working with M365 Copilot agents:

### Step 1: Understand the Requirements

**Action:** Gather and analyze the agent requirements:
- Identify the agent's primary purpose and target users
- Determine required data sources (M365 services, external APIs)
- List necessary actions the agent must perform
- Identify security and compliance requirements

**Why it's important:** Clear requirements drive architectural decisions and ensure the agent meets user needs.

### Step 2: Design the Agent Architecture

**Action:** Create a comprehensive architectural design:
- Select deployment model (personal or shared)
- Choose appropriate M365 capabilities with scoping
- Design API plugin integrations if needed
- Plan authentication and authorization strategy
- Design conversation flow and instructions

**Reference:** Follow the [Architectural Design](#architectural-design) section and [patterns-and-frameworks.md](references/patterns-and-frameworks.md)

### Step 3: Implement TypeSpec Code

**Action:** Write type-safe agent code using TypeSpec:
- Define agent with `@agent` decorator
- Configure capabilities with appropriate scoping
- Implement API plugin actions with authentication
- Write clear instructions and conversation starters
- Document all models and operations with `@doc`

**Reference:** Follow [TypeSpec Best Practices](references/typespec-best-practices.md) and official [typespec-decorators.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-decorators.md)

### Step 4: Compile and Validate

**Action:** Compile TypeSpec to validate the implementation:
```bash
npm run compile
```

**Why it's important:** Compilation catches syntax errors and validates decorator usage before deployment.

### Step 5: Provision Azure Resources

**Action:** Provision required Azure resources and register the agent:
```bash
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env local
```

**Result:** Returns a test URL like `https://m365.cloud.microsoft/chat/?titleId=U_abc123xyz`

### Step 6: Test and Iterate

**Action:** Test the agent in Microsoft 365 Copilot:
- Use the provisioned test URL
- Test all conversation starters
- Verify capability access and scoping
- Test error handling and edge cases
- Validate security controls

### Step 7: Deploy to Environments

**Action:** Deploy to staging/production environments:
```bash
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env prod
```

**Reference:** Follow [deployment.md](references/deployment.md) for environment management and CI/CD patterns

### Step 8: Package and Share

**Action:** Package and share the agent:
```bash
# Package the agent
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env dev

# Share to tenant (for shared agents)
npx -p @microsoft/m365agentstoolkit-cli@latest atk share --scope tenant --env dev
```

**Reference:** See [deployment.md](references/deployment.md) for sharing strategies

---

## Best Practices

Follow these best practices for successful M365 Copilot agent development:

### Security

- **Principle of Least Privilege:** Always scope capabilities to the minimum necessary resources
- **Credential Management:** Use `@authReferenceId` for production environments (see [typespec-authentication.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-authentication.md))
- **Input Validation:** Validate all user inputs and API responses
- **PII Handling:** Follow data protection regulations when handling personal information
- **Audit Logging:** Implement comprehensive audit trails for all agent actions
- **Secret Storage:** Never hardcode credentials; use Azure Key Vault or environment variables

**Reference:** [security-guidelines.md](references/security-guidelines.md)

### Performance

- **Scoped Queries:** Use scoped capabilities to reduce query time and improve response quality
- **Efficient API Design:** Design API plugins with pagination and filtering
- **Caching Strategy:** Implement appropriate caching for frequently accessed data
- **Response Time:** Keep operations under 30 seconds to avoid timeouts
- **Batch Operations:** Use batch APIs when processing multiple items

### Error Handling

- **Graceful Degradation:** Handle errors without breaking the conversation flow
- **Clear Error Messages:** Provide actionable error messages to users
- **Retry Logic:** Implement retry mechanisms for transient failures
- **Fallback Behavior:** Define fallback behavior when capabilities are unavailable
- **Error Logging:** Log errors with sufficient context for troubleshooting

### Testing

- **Test All Conversation Starters:** Verify each starter works as intended
- **Test Edge Cases:** Test with missing data, invalid inputs, and error conditions
- **Security Testing:** Verify scoping and permission controls
- **Cross-Environment Testing:** Test in dev, staging, and production environments
- **User Acceptance Testing:** Conduct UAT with actual users before production release

### Compliance

- **Data Residency:** Consider data residency requirements for multi-region deployments
- **Retention Policies:** Follow organizational data retention policies
- **Access Controls:** Implement role-based access controls (RBAC)
- **Compliance Frameworks:** Follow relevant frameworks (GDPR, HIPAA, SOC 2, etc.)
- **Documentation:** Maintain compliance documentation and audit trails

### Maintainability

- **Documentation:** Add `@doc` decorators to all operations, models, and properties
- **Naming Conventions:** Use PascalCase for models/enums, camelCase for properties/actions
- **Code Organization:** Separate concerns (capabilities, API plugins, models)
- **Version Control:** Use semantic versioning for shared agents
- **Change Management:** Document changes and maintain changelog

### Conversation Design

- **Specific Instructions:** Write directive instructions with clear role definition
- **Actionable Starters:** Create 3-5 specific, actionable conversation starters
- **Clear Boundaries:** Define what the agent can and cannot do
- **Appropriate Tone:** Match tone to audience and context
- **Confirmation Patterns:** Require confirmation for destructive or sensitive actions

**Reference:** [conversation-design.md](references/conversation-design.md)

### Deployment

- **Environment Strategy:** Use separate environments for dev, staging, and production
- **CI/CD Integration:** Automate testing and deployment using ATK CLI
- **Version Management:** Bump versions before re-provisioning shared agents
- **Rollback Plan:** Have a rollback strategy for failed deployments
- **Monitoring:** Implement monitoring and alerting for production agents

**Reference:** [deployment.md](references/deployment.md)

---

## Examples

### Example 1: Compile and Validate TypeSpec

Basic workflow for developing and validating TypeSpec code without provisioning:

```bash
# Install dependencies
npm install

# Generate environment configuration
npm run generate:env

# Compile TypeSpec to validate implementation
npm run compile
```

**Use case:** Local development and validation of TypeSpec syntax and decorators before deployment.

---

### Example 2: Development and Provisioning

Complete workflow for provisioning an agent to a development environment:

```bash
# Install dependencies
npm install

# Generate environment configuration
npm run generate:env

# Compile TypeSpec
npm run compile

# Provision agent to development environment
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env local
```

**Result:** Returns a test URL like `https://m365.cloud.microsoft/chat/?titleId=U_abc123xyz` to test the agent in Microsoft 365 Copilot.

**Use case:** Testing agent functionality in a live environment during development.

---

### Example 3: Provision and Share Agent

Workflow for provisioning and sharing an agent with your organization:

```bash
# Install dependencies
npm install

# Generate environment configuration
npm run generate:env

# Compile TypeSpec
npm run compile

# Provision agent to target environment
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env dev

# Share agent with tenant users
npx -p @microsoft/m365agentstoolkit-cli@latest atk share --scope tenant --env dev
```

**Result:** Agent becomes available to all users in the Microsoft 365 tenant.

**Use case:** Deploying a shared agent for organizational use after testing and validation.

---

### Example 4: Package Agent for Distribution

Workflow for creating an agent package for distribution:

```bash
# Install dependencies
npm install

# Generate environment configuration
npm run generate:env

# Compile TypeSpec
npm run compile

# Package agent for distribution
npx -p @microsoft/m365agentstoolkit-cli@latest atk package --env prod
```

**Result:** Creates a distributable package file that can be uploaded to the Microsoft 365 admin center or shared externally.

**Use case:** Creating a final package for production deployment or external distribution.

---
