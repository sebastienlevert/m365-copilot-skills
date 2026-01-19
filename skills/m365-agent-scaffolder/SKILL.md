---
name: m365-agent-scaffolder
description: Quickly scaffolds new Microsoft 365 Copilot declarative agent projects using ATK CLI. Collects project information and creates the initial project structure. Use only when creating a new empty M365 Copilot agent project from scratch.
compatibility: Designed for Microsoft 365 Copilot agents development on developer platforms supporting Agent Skills.
metadata:
  authors:
    - sebastienlevert
  version: 2.0.0
---

# M365 Agent Scaffolder

⚠️ **QUICK PROJECT CREATION ONLY** ⚠️

This skill does ONE thing: creates new M365 Copilot agent project structures using ATK CLI. It:
1. Collects minimal required information
2. Scaffolds the project using ATK CLI
3. Automatically continues to m365-agent-developer skill for implementation

All architecture, planning, implementation, and deployment is handled by the m365-agent-developer skill.

---

## When to Use This Skill

Use this skill ONLY when:
- Creating a brand new empty M365 Copilot agent project from scratch
- The user explicitly asks to create a new M365 Copilot project, agent, or workspace
- Starting a new M365 Copilot agent development initiative that needs initial project structure

Do NOT use this skill when:
- Working with existing projects (use m365-agent-developer)
- Implementing features or capabilities (use m365-agent-developer)
- Deploying or managing agents (use m365-agent-developer)
- Troubleshooting issues (use m365-agent-developer)
- Designing architecture or planning (use m365-agent-developer)
- Creating Helix agents (use helix-scaffolder)

## Instructions

Follow these exact steps when creating a new M365 Copilot agent project:

### Step 1: Understand the Request

**Action:** Verify the user wants to create a NEW M365 Copilot agent project.

**Check for:**
- Keywords: "new project", "create agent", "scaffold", "start from scratch", "M365 Copilot"
- Confirmation this is NOT an existing project
- Confirmation this is NOT a Helix agent (if user mentions "helix" or "sydney", use helix-scaffolder instead)

**If existing project:** Stop and recommend using m365-agent-developer skill.
**If Helix agent requested:** Stop and recommend using helix-scaffolder skill.

### Step 2: Verify Empty Directory and Collect Project Name

**Action:** First, check if the current directory is empty. Then ask for the project name.

**Directory Check (CRITICAL):**
- Use `ls -A` to check if current directory is empty
- **Ignore hidden folders** (folders starting with `.`) when evaluating if directory is empty:
  - Hidden folders like `.claude`, `.copilot`, `.github` are configuration/metadata folders
  - These folders are used to steer coding agents and should not prevent scaffolding
  - If ONLY hidden folders exist, treat the directory as empty
- If directory is NOT empty (has non-hidden files/folders), ERROR OUT with message:
  ```
  ❌ Error: Current directory is not empty!

  This skill requires an empty directory to scaffold a new M365 Copilot agent project.
  Please navigate to an empty directory or create a new one first.
  ```
- Do NOT proceed if directory has non-hidden content

**If directory is empty, collect:**

1. **Project name** (required)
   - What should the M365 Copilot agent project be named?
   - Must be valid for directory names (no spaces, special characters)
   - Example: "customer-support-agent", "sales-assistant"

**Example question:**
```
What would you like to name your M365 Copilot agent project?
```

### Step 3: Run ATK CLI Command and Move Files to Current Directory

**Action:** Execute the scaffolding command, then move files from the ATK-created subfolder to the current directory.

**Commands to execute sequentially:**

1. **Create the project with ATK CLI:**
```bash
npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n <project-name> -c declarative-agent -with-plugin type-spec -i false
```

**Parameters:**
- `-n <project-name>`: The project name provided by the user
- `-c declarative-agent`: Create a declarative agent
- `-with-plugin type-spec`: Include TypeSpec plugin scaffolding
- `-i false`: Non-interactive mode (no prompts)

**Note:** ATK will create a subfolder named `<project-name>` with all project files.

2. **Move all files from the subfolder to current directory:**
```bash
mv <project-name>/* <project-name>/.* . 2>/dev/null || true
```

3. **Delete the now-empty subfolder:**
```bash
rmdir <project-name>
```

**Why this is important:**
- ATK always creates a subfolder, but we want files in the current directory
- Moving files ensures the developer's intended directory structure
- Deleting the empty subfolder keeps the workspace clean

### Step 4: Confirm Creation and Continue to m365-agent-developer Skill

**Action:** Provide a simple confirmation message and automatically continue to m365-agent-developer skill.

**Message template:**
```
✅ Project created in current directory: <absolute-current-directory-path>

Your empty M365 Copilot agent project structure is ready.

🎯 Continuing with the m365-agent-developer skill to help you design and implement your agent...
```

**Then immediately invoke m365-agent-developer skill:**
- Use the Skill tool to invoke "m365-agent-developer"
- Do NOT stop or wait for user confirmation
- The flow should be seamless and automatic

---

## Examples

### Example 1: Basic M365 Project Scaffolding

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

### Example 2: Project with Name Provided

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

### Example 3: Creating in Current Directory

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

### Example 4: Error - Non-Empty Directory

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

### Example 5: What NOT to Do

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

## Best Practices

Follow these best practices when scaffolding new M365 Copilot agent projects:

### Project Naming

- **Use Descriptive Names:** Choose names that clearly indicate the agent's purpose
  - ✅ Good: `customer-support-agent`, `sales-assistant`, `document-finder`
  - ❌ Bad: `agent1`, `test`, `myproject`
- **Use Kebab-Case:** Use lowercase with hyphens for maximum compatibility
  - ✅ Good: `expense-tracker-agent`
  - ❌ Bad: `ExpenseTrackerAgent`, `expense_tracker_agent`, `Expense Tracker`
- **Avoid Special Characters:** Stick to alphanumeric characters and hyphens only
  - No spaces, underscores, or special symbols
- **Keep It Concise:** 2-4 words maximum for readability
  - ✅ Good: `sales-dashboard`
  - ❌ Bad: `comprehensive-sales-and-marketing-analytics-dashboard-agent`

### Directory Management

- **ALWAYS Require Empty Directory:** The current directory MUST be empty before scaffolding
  - Use `ls -A` to check if directory is empty
  - **Ignore hidden folders** (starting with `.`) when checking - hidden folders like `.claude`, `.copilot`, `.github` are meta-configuration folders that shouldn't block scaffolding
  - If ONLY hidden folders exist, treat directory as empty and proceed
  - ERROR OUT immediately if directory contains non-hidden files or folders
  - Do NOT proceed with scaffolding if directory has non-hidden content
  - Provide clear error message directing user to use an empty directory
- **Create in Current Directory:** Always scaffold projects in the current directory
  - ATK CLI creates a subfolder - you must move files back up
  - Move all files from `<project-name>/` to current directory
  - Delete the empty subfolder after moving files
  - This ensures developer's intended directory structure
- **Verify Current Location:** Always check and confirm the working directory
  - Use absolute paths in all confirmations
  - Show the current directory path in success message
- **Use Absolute Paths:** Always provide full absolute paths in confirmation messages
  - Helps users locate the project easily
  - Prevents confusion about project location

### Command Execution

- **Always Use Full ATK CLI Command:** Never abbreviate or use shortcuts
  - Full command: `npx -p @microsoft/m365agentstoolkit-cli@latest atk new`
  - Ensures latest version is used
  - Prevents version compatibility issues
- **Non-Interactive Mode:** Always use `-i false` parameter
  - Prevents unexpected prompts
  - Ensures consistent, predictable behavior
- **Move Files After ATK Creation:** After ATK creates the subfolder:
  - Use `mv <project-name>/* <project-name>/.* . 2>/dev/null || true` to move all files
  - This moves both regular and hidden files (like .gitignore)
  - The `2>/dev/null || true` prevents errors if no hidden files exist
- **Delete Empty Subfolder:** After moving files:
  - Use `rmdir <project-name>` to remove the now-empty subfolder
  - This keeps the directory structure clean
- **Verify Exit Code:** Check command success before confirming to user
  - Handle errors gracefully
  - Provide clear error messages if scaffolding fails
- **Capture Output:** Monitor command output for errors or warnings
  - Log any issues encountered
  - Provide diagnostic information if needed

### Communication Best Practices

- **Be Brief and Direct:** Keep all messages short and actionable
  - No lengthy explanations or architectural discussions
  - Focus only on scaffolding confirmation
- **Seamless Handoff:** Automatically continue to m365-agent-developer skill
  - Use the Skill tool to invoke m365-agent-developer immediately after scaffolding
  - Provide a brief message confirming project creation
  - No user intervention required - the flow should be automatic
- **No Extra Work:** Do NOT:
  - Create TODO.md files
  - Open workspaces in VS Code
  - Provide implementation guidance (that's for m365-agent-developer)
  - Discuss architecture or design (that's for m365-agent-developer)
  - Run additional commands beyond scaffolding
- **Set Clear Expectations:** Make it obvious this skill only scaffolds
  - "Your empty project structure is ready"
  - Immediately mention continuing to m365-agent-developer

### Scope Boundaries

- **Stay in Scope:** Only handle project creation, nothing more
  - Check if directory is empty
  - Ask for name if not provided
  - Run scaffolding command
  - Move files to current directory
  - Delete empty subfolder
  - Confirm creation
  - Automatically invoke m365-agent-developer
- **Seamless Transition:** Complete scaffolding and immediately continue
  - Don't stop or wait for user input after scaffolding
  - Automatically invoke m365-agent-developer skill
  - Let m365-agent-developer handle all implementation questions
- **No Planning:** Don't discuss:
  - Architecture decisions
  - Capability selection
  - API plugin design
  - Security considerations
  - Deployment strategies
- **No Implementation:** Don't write or suggest:
  - TypeSpec code
  - Agent decorators
  - Capability configurations
  - API endpoints
  - Instruction text

### Error Handling

- **Check Empty Directory First:** ALWAYS verify directory is empty before proceeding
  - Use `ls -A` to check for any files or subdirectories
  - **Ignore hidden folders** (starting with `.`) - they are meta-configuration folders
  - If only hidden folders exist, treat as empty and proceed
  - If non-hidden content exists, show error message and STOP
  - Do NOT ask for project name if directory has non-hidden content
  - This is the FIRST check before any other actions
- **Validate Input:** Check project name before running command
  - Ensure valid characters
  - Warn about potential issues
  - Suggest corrections if needed
- **Handle Command Failures:** If scaffolding fails:
  - Capture and report error message
  - Suggest common fixes (permissions, disk space, network)
  - Don't proceed with file moving or confirmation
- **Handle File Move Failures:** If moving files fails:
  - Report the error
  - Files may still be in the subfolder
  - User may need to move files manually
- **Provide Context:** When errors occur, give users actionable information
  - What failed
  - Why it might have failed
  - What they can try next
- **Don't Retry Automatically:** Let users diagnose and fix issues
  - Don't run the command multiple times
  - Let users verify prerequisites

### Quality Checks

- **Verify Prerequisites:** Before running command, ensure:
  - Current directory is empty (CRITICAL - use `ls -A`, ignore hidden folders starting with `.`)
  - Node.js and npm are available
  - User has write permissions
  - Network connectivity for npm packages
- **Confirm Success:** After moving files and deleting subfolder:
  - Verify files exist in current directory (not in a subdirectory)
  - Check for key files (package.json, src/ directory) in current directory
  - Confirm structure was created properly
  - Ensure the ATK-created subfolder was deleted
- **Provide Accurate Paths:** Double-check all paths in messages
  - Use `pwd` or similar to get absolute paths
  - Always show current directory path, not a subdirectory path
  - Verify path format for user's OS

### Integration with m365-agent-developer Skill

- **Automatic Invocation:** Seamlessly continue to m365-agent-developer skill
  - Use the Skill tool to invoke "m365-agent-developer" immediately after scaffolding
  - No user intervention required
  - Provide a brief message that you're continuing to the next skill
- **Set Context:** In transition message, briefly mention what's happening
  - "Continuing with the m365-agent-developer skill to help you design and implement your agent..."
  - Shows the workflow is automatic and connected
- **Don't Duplicate:** Trust the follow-up skill for all post-scaffolding work
  - No architectural guidance
  - No implementation hints
  - Just scaffold and hand off automatically
