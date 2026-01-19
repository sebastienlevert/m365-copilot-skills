# M365 Agent Scaffolder Best Practices

Follow these best practices when scaffolding new M365 Copilot agent projects.

## Project Naming

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

## Directory Management

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

## Command Execution

🚨 **CRITICAL: EXACT COMMAND REQUIRED** 🚨

- **Use ONLY This Exact Command:**
  ```bash
  npx -p @microsoft/m365agentstoolkit-cli@latest atk new -n <project-name> -c declarative-agent -with-plugin type-spec -i false
  ```
- **NEVER Use These Commands (THEY DO NOT EXIST):**
  - ❌ `atk init` - DOES NOT EXIST
  - ❌ `atk create` - DOES NOT EXIST
  - ❌ `atk scaffold` - DOES NOT EXIST
  - ❌ Any command with `--template` flag - NOT VALID
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

## Communication Best Practices

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

## Scope Boundaries

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

## Error Handling

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

## Quality Checks

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

## Integration with m365-agent-developer Skill

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
