# M365 Agent Developer Examples

This document provides workflow examples for common M365 Copilot agent development scenarios.

## Example 1: Compile and Validate TypeSpec

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

## Example 2: Development and Provisioning

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

## Example 3: Provision and Share Agent

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

## Example 4: Package Agent for Distribution

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
