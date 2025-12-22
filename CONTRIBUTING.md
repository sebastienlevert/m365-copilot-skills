# Contributing to M365 Copilot Skills

Thank you for your interest in contributing to the Microsoft 365 Copilot Skills repository! This guide will help you create high-quality skills that benefit the entire M365 developer community.

## How to Contribute

### Ways to Contribute

1. **Create New Skills**: Add skills for M365 services, APIs, or common development patterns
2. **Improve Existing Skills**: Enhance documentation, add examples, or refine instructions
3. **Fix Issues**: Help resolve bugs or address reported problems
4. **Enhance Documentation**: Improve README files, guides, or examples
5. **Share Feedback**: Open issues to suggest improvements or report problems

### Getting Started

1. **Fork the repository** and clone it locally
2. **Create a new branch** for your contribution: `git checkout -b feature/your-skill-name`
3. **Make your changes** following the guidelines below
4. **Test your skill** with at least one AI coding agent
5. **Submit a pull request** with a clear description of your changes

## Creating a New Skill

### 1. Use the Template

Start with the template in the `template/` directory:

```bash
cp -r template/ skills/your-skill-name/
```

### 2. Skill Naming Conventions

- Use lowercase with hyphens: `graph-api-authentication`, `teams-app-manifest`
- Be specific and descriptive: `sharepoint-pnp-js` not just `sharepoint`
- Include the M365 service: `graph-batch-requests` instead of just `batch-requests`

### 3. Required Files

Every skill must include:

- **SKILL.md**: The main instruction file for AI agents (required)
- **README.md**: Human-readable documentation (recommended)

Optional but encouraged:

- **examples/**: Code samples demonstrating the skill
- **resources/**: Additional reference materials, schemas, or templates

### 4. SKILL.md Structure

Your `SKILL.md` file should follow this format:

```markdown
---
name: your-skill-name
description: A clear, comprehensive description of what this skill does and when to use it (2-3 sentences)
tags: [microsoft-365, relevant, tags]
version: 1.0.0
author: Your Name or Organization
---

# Skill Display Name

A brief introduction to the skill and its purpose.

## When to Use This Skill

List specific scenarios where this skill should be applied:
- Scenario 1: [Specific use case]
- Scenario 2: [Specific use case]
- Scenario 3: [Specific use case]

## Prerequisites

List any required knowledge, tools, or setup:
- Microsoft 365 tenant with appropriate licenses
- Registered Azure AD application (if applicable)
- Required API permissions
- Development environment setup

## Key Concepts

Explain important concepts the AI agent needs to understand:

### Concept 1
[Explanation]

### Concept 2
[Explanation]

## Instructions

Provide clear, step-by-step guidance for the AI agent:

1. **Step 1**: [Detailed instruction]
   - Substep or clarification
   - Important considerations

2. **Step 2**: [Detailed instruction]
   - Code patterns to use
   - Common pitfalls to avoid

## Code Patterns

Include reusable code snippets and patterns:

### Pattern 1: [Pattern Name]
```language
// Code example with clear comments
```

### Pattern 2: [Pattern Name]
```language
// Code example with clear comments
```

## Best Practices

List important best practices:
- Best practice 1
- Best practice 2
- Security considerations
- Performance tips

## Common Pitfalls

Warn about common mistakes:
- Pitfall 1 and how to avoid it
- Pitfall 2 and how to avoid it

## Resources

Link to relevant documentation:
- [Microsoft Learn: Relevant Topic](https://learn.microsoft.com/...)
- [API Reference](https://learn.microsoft.com/...)

## Testing

Provide guidance on testing the implementation:
- How to verify the implementation works
- Test scenarios to validate
- Debugging tips
```

### 5. Writing Effective Instructions

**DO:**
- Write clear, specific instructions that AI agents can follow
- Include concrete code examples and patterns
- Explain the "why" behind recommendations
- Cover error handling and edge cases
- Reference official Microsoft documentation
- Use proper Microsoft 365 terminology
- Test your skill with actual AI agents

**DON'T:**
- Assume prior knowledge without stating prerequisites
- Use vague or ambiguous language
- Include deprecated APIs or outdated patterns
- Ignore security best practices
- Forget to handle errors and edge cases

### 6. README.md Guidelines

The README should be user-facing documentation:

```markdown
# Skill Name

Brief description of what this skill helps you accomplish.

## What This Skill Does

- Feature 1
- Feature 2
- Feature 3

## Use Cases

1. **Use Case 1**: Description
2. **Use Case 2**: Description

## Examples

### Example 1: [Scenario]
[Description and code example]

### Example 2: [Scenario]
[Description and code example]

## Prerequisites

- Requirement 1
- Requirement 2

## Related Skills

- [Related Skill 1](../related-skill-1)
- [Related Skill 2](../related-skill-2)

## Additional Resources

- [Documentation Link](...)
- [Tutorial Link](...)
```

## Testing Your Skill

Before submitting a pull request:

1. **Test with AI Agents**: Verify your skill works with Claude Code, GitHub Copilot, or another agent
2. **Validate Examples**: Ensure all code examples compile and run correctly
3. **Check Links**: Verify all documentation links are valid
4. **Review Formatting**: Ensure markdown renders correctly
5. **Test Prerequisites**: Confirm all prerequisites are accurately documented

## Skill Quality Checklist

- [ ] Skill name follows naming conventions
- [ ] SKILL.md includes all required sections
- [ ] Instructions are clear and specific
- [ ] Code examples are correct and well-commented
- [ ] Prerequisites are clearly documented
- [ ] Security best practices are included
- [ ] Error handling is addressed
- [ ] Links to official Microsoft documentation are included
- [ ] README.md provides user-friendly documentation
- [ ] Examples demonstrate realistic use cases
- [ ] Skill has been tested with at least one AI agent
- [ ] No deprecated APIs or patterns are used

## Pull Request Guidelines

### PR Title Format

Use conventional commits format:
- `feat: Add graph-api-authentication skill`
- `fix: Correct Teams manifest example in teams-app-manifest`
- `docs: Improve SharePoint skill documentation`
- `chore: Update template structure`

### PR Description

Include:
1. **What**: What skill or change are you adding?
2. **Why**: Why is this skill useful?
3. **Testing**: How did you test the skill?
4. **AI Agents Tested**: Which agents did you test with? (Claude Code, GitHub Copilot, etc.)

Example:
```markdown
## What
Adds a new skill for Microsoft Graph batch request handling.

## Why
Batch requests are a common pattern for optimizing Graph API calls but require specific setup and error handling that this skill provides.

## Testing
- Tested with Claude Code
- Validated all code examples compile and run
- Verified against Microsoft Graph documentation

## AI Agents Tested
- Claude Code: Works correctly
- GitHub Copilot: Not tested
```

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on what's best for the community
- Welcome newcomers and help them learn
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully

## Questions?

- Open a [Discussion](../../discussions) for questions about contributing
- Open an [Issue](../../issues) to report bugs or suggest improvements
- Tag maintainers in PRs if you need feedback

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make M365 development better for everyone!
