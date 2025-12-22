# Claude Code Plugin Configuration

This directory contains configuration files for distributing M365 Copilot Skills through Claude Code's plugin marketplace system.

## Plugin Distribution

When users run `/plugin marketplace add sebastienlevert/m365-copilot-skills` in Claude Code, it reads this marketplace.json file to understand what skills are available.

### Installing Skills

Users can install skills from this marketplace using:

```bash
# Add the marketplace
/plugin marketplace add sebastienlevert/m365-copilot-skills

# Install all skills
/plugin install @m365-copilot-skills
```