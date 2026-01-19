# M365 Agent Scaffolder Examples

This document provides examples of how to use the m365-agent-scaffolder skill.

## Example 1: Basic M365 Project Scaffolding

**User:** "Create a new M365 Copilot agent project"

**Interaction:**
```
Assistant: [Checks if directory is empty with ls -A]
Assistant: What would you like to name your M365 Copilot agent project?

User: sales-assistant
```

**Scripts executed:**
```bash
# Check directory is empty
ls -A

# Create project
npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n sales-assistant -c declarative-agent -with-plugin type-spec -i false

# Move files to current directory
mv sales-assistant/* sales-assistant/.* . 2>/dev/null || true

# Delete empty subfolder
rmdir sales-assistant
```

**Confirmation and continuation:**
```
✅ Project created in current directory: /home/user/projects

Your empty M365 Copilot agent project structure is ready.

🎯 Continuing with the m365-agent-developer skill to help you design and implement your agent...

[Automatically invokes m365-agent-developer skill using the Skill tool]
```

## Example 2: Project with Name Provided

**User:** "Scaffold a new M365 Copilot project called customer-support-agent"

**Interaction:**
```
Assistant: [Checks if directory is empty with ls -A]
Assistant: [Name "customer-support-agent" already provided]
```

**Scripts executed:**
```bash
# Check directory is empty
ls -A

# Create project
npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n customer-support-agent -c declarative-agent -with-plugin type-spec -i false

# Move files to current directory
mv customer-support-agent/* customer-support-agent/.* . 2>/dev/null || true

# Delete empty subfolder
rmdir customer-support-agent
```

**Confirmation and continuation:**
```
✅ Project created in current directory: /home/user/projects

Your empty M365 Copilot agent project structure is ready.

🎯 Continuing with the m365-agent-developer skill to help you design and implement your agent...

[Automatically invokes m365-agent-developer skill using the Skill tool]
```

## Example 3: Creating in Current Directory

**User:** "Create a document-finder agent in this directory"

**Interaction:**
```
Assistant: [Checks if directory is empty with ls -A]
Assistant: [Name "document-finder" already provided]
```

**Scripts executed:**
```bash
# Check directory is empty
ls -A

# Create project
npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n document-finder -c declarative-agent -with-plugin type-spec -i false

# Move files to current directory
mv document-finder/* document-finder/.* . 2>/dev/null || true

# Delete empty subfolder
rmdir document-finder
```

**Confirmation and continuation:**
```
✅ Project created in current directory: /home/user/projects

Your empty M365 Copilot agent project structure is ready.

🎯 Continuing with the m365-agent-developer skill to help you design and implement your agent...

[Automatically invokes m365-agent-developer skill using the Skill tool]
```

## Example 4: Error - Non-Empty Directory

**User:** "Create a new project called expense-tracker"

**Directory check result:**
```bash
# Check directory is empty
ls -A
# Output shows: package.json  src/  README.md
```

**Error response:**
```
❌ Error: Current directory is not empty!

This skill requires an empty directory to scaffold a new M365 Copilot agent project.
Please navigate to an empty directory or create a new one first.
```

**Note:** The assistant STOPS here and does NOT proceed with scaffolding.

## Example 5: What NOT to Do

**User:** "Create a customer support agent with SharePoint and Teams capabilities"

**WRONG - Do NOT do this:**
```
❌ Creating TODO.md with architecture plans
❌ Discussing which capabilities to use
❌ Writing TypeSpec code
❌ Implementing agent instructions
❌ Opening workspace in VS Code
❌ Skipping the empty directory check
```

**CORRECT - Do this:**
```
✅ Check if directory is empty with ls -A
✅ Ask for project name if not provided
✅ Run: npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n customer-support-agent -c declarative-agent -with-plugin type-spec -i false
✅ Move files from subfolder to current directory
✅ Delete the empty subfolder
✅ Confirm creation in current directory
✅ Automatically invoke m365-agent-developer skill
```
