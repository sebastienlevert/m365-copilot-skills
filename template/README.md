# Skill Template

This is a template for creating new Microsoft 365 Copilot skills. Use this as a starting point when creating your own skill.

## What This Template Provides

- Structured SKILL.md format with all recommended sections
- README.md template for user-facing documentation
- Example directory structure for code samples and resources
- Guidance on what to include in each section

## How to Use This Template

1. **Copy the template directory**:
   ```bash
   cp -r template/ skills/your-skill-name/
   ```

2. **Rename and customize files**:
   - Update `SKILL.md` with your skill's instructions
   - Update `README.md` with user-facing documentation
   - Add code examples to the `examples/` directory
   - Add any additional resources to `resources/`

3. **Update the frontmatter** in SKILL.md:
   ```yaml
   ---
   name: your-skill-name
   description: Clear description of your skill
   tags: [microsoft-365, relevant, tags]
   version: 1.0.0
   author: Your Name
   ---
   ```

4. **Test your skill** with at least one AI coding agent

5. **Submit a pull request** following the [Contributing Guidelines](../CONTRIBUTING.md)

## What Makes a Good Skill?

### Clear Purpose
- Focuses on a specific M365 scenario or capability
- Has a clear use case and target audience
- Solves a real problem developers face

### Complete Instructions
- Provides all necessary context and prerequisites
- Includes step-by-step guidance
- Explains the "why" behind recommendations
- Covers edge cases and error handling

### Practical Examples
- Includes realistic code samples
- Shows complete implementations, not just snippets
- Demonstrates best practices
- Works with current M365 APIs and SDKs

### Good Documentation
- Links to official Microsoft documentation
- References relevant API documentation
- Provides testing and validation guidance
- Lists related skills and resources

## Directory Structure

```
your-skill-name/
├── SKILL.md              # Main instruction file (REQUIRED)
├── README.md             # User documentation (recommended)
├── examples/             # Code examples (optional)
│   ├── example1.js
│   └── example2.ts
└── resources/            # Additional resources (optional)
    ├── schema.json
    └── reference.md
```

## Sections to Include

### Required Sections in SKILL.md
- Frontmatter (name, description, tags, version, author)
- Introduction
- When to Use This Skill
- Prerequisites
- Key Concepts
- Instructions
- Best Practices
- Resources

### Recommended Sections
- Code Patterns
- Common Pitfalls
- API Reference
- Example Implementation
- Testing and Validation
- Related Skills

### Optional Sections
- Version History
- Notes
- Troubleshooting
- Advanced Usage

## Tips for Writing Skills

1. **Be Specific**: Instead of "use Graph API," say "use the Graph API /me endpoint with User.Read permission"

2. **Include Context**: Explain why certain approaches are recommended, not just what to do

3. **Test Everything**: Verify all code examples actually work with current APIs

4. **Keep It Updated**: M365 APIs evolve - commit to maintaining your skill

5. **Think Like an AI**: Write instructions that can be followed programmatically

6. **Add Examples**: Real code examples are more valuable than theoretical explanations

7. **Link to Docs**: Always reference official Microsoft documentation

## Need Help?

- Check the [Contributing Guidelines](../CONTRIBUTING.md) for detailed guidance
- Look at existing skills for examples (once available)
- Open a [Discussion](../../discussions) to ask questions
- Review the [Agent Skills Specification](https://agentskills.io)

## License

Skills contributed to this repository are licensed under the MIT License.
