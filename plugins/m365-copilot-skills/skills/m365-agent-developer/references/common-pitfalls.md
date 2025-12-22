# Common Pitfalls and Anti-Patterns for M365 Agents

## Architecture Anti-Patterns

### 1. The "Do Everything" Agent
**Problem:** Single agent tries to handle too many unrelated domains.

**Example:**
```typespec
// ❌ Anti-pattern: HR + IT + Sales agent
@agent("Super Agent", "Handles HR, IT support, and sales inquiries")
namespace SuperAgent {
  // Too many unrelated capabilities
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint;
  op email is AgentCapabilities.Email;
  op teams is AgentCapabilities.TeamsMessages;
  
  // Too many unrelated plugins
  op hrOperations is ApiPlugin<HRPlugin>;
  op itOperations is ApiPlugin<ITPlugin>;
  op salesOperations is ApiPlugin<SalesPlugin>;
}
```

**Why it's bad:**
- Instructions become complex and conflicting
- Difficult to scope capabilities appropriately
- Security nightmare (too many permissions)
- Poor user experience (confusion about agent's purpose)
- Hard to maintain and debug

**Solution:** Create focused, single-purpose agents:
```typespec
// ✅ Pattern: Focused HR agent
@agent("HR Assistant", "HR policy assistant")
namespace HRAgent {
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint<
    ItemsByUrl = [
      { url: "https://contoso.sharepoint.com/sites/hr" }
    ]
  >;
  op getHrPolicies is HRPlugin.getPolicies;
}

// ✅ Pattern: Focused IT agent
@agent("IT Support", "IT support assistant")
namespace ITSupportAgent {
  op teams is AgentCapabilities.TeamsMessages<
    Urls = [
      { url: "https://teams.microsoft.com/l/channel/..." }
    ]
  >;
  op getItTickets is ITTicketPlugin.getTickets;
}
```

### 2. Over-Scoped Capabilities
**Problem:** Granting broader access than needed.

**Example:**
```typespec
// ❌ Anti-pattern: Unscoped access for focused task
@agent("Phoenix Tracker", "Project Phoenix status tracker")
namespace PhoenixTracker {
  // Too broad - all files in tenant
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint;
  // Too broad - all emails
  op email is AgentCapabilities.Email;
  // Too broad - all Teams channels
  op teams is AgentCapabilities.TeamsMessages;
}
```

**Why it's bad:**
- Violates principle of least privilege
- Security and privacy risk
- User trust concerns
- Difficult to audit

**Solution:** Scope to minimum necessary:
```typespec
// ✅ Pattern: Properly scoped
@agent("Phoenix Tracker", "Project Phoenix status tracker")
namespace PhoenixTracker {
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint<
    ItemsByUrl = [
      { url: "https://contoso.sharepoint.com/sites/phoenix" }
    ]
  >;
  op teams is AgentCapabilities.TeamsMessages<
    Urls = [
      { url: "https://teams.microsoft.com/l/channel/19%3a...phoenix..." }
    ]
  >;
}
```

### 3. API Plugin Overuse
**Problem:** Using API plugins when capabilities would suffice.

**Example:**
```typespec
// ❌ Anti-pattern: API plugin to search SharePoint
namespace MyAgent {
  op getDocuments is SharePointSearchPlugin.GetDocuments;  // Unnecessary!
  // M365 already provides this via OneDriveAndSharePoint capability
}
```

**Why it's bad:**
- Unnecessary complexity
- Additional maintenance burden
- Slower performance (extra API hop)
- More security considerations

**Solution:** Use built-in capabilities:
```typespec
// ✅ Pattern: Use OneDriveAndSharePoint capability
namespace MyAgent {
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint<
    ItemsByUrl = [
      { url: "https://contoso.sharepoint.com/sites/docs" }
    ]
  >;
}
```

**When APIs ARE appropriate:**
- External systems (CRM, ticketing, databases)
- CRUD operations
- Real-time transactional data
- Custom business logic

### 4. Under-Scoped Capabilities
**Problem:** Scoping too narrowly, limiting agent effectiveness.

**Example:**
```typespec
// ❌ Anti-pattern: Too restrictive
@agent("Research Assistant", "Research assistant for company documents")
namespace ResearchAssistant {
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint<
    ItemsByUrl = [
      // Too narrow - only one subfolder
      { url: "https://contoso.sharepoint.com/sites/site1/Shared Documents/folder1/subfolder1" }
    ]
  >;
  // Users can't find documents in other relevant locations
}
```

**Why it's bad:**
- Agent can't fulfill its purpose
- Poor user experience
- Users get frustrated with "not found" responses

**Solution:** Balance security with usability:
```typespec
// ✅ Pattern: Appropriately scoped
@agent("Research Assistant", "Research assistant for company documents")
namespace ResearchAssistant {
  op oneDrive is AgentCapabilities.OneDriveAndSharePoint<
    ItemsByUrl = [
      { url: "https://contoso.sharepoint.com/sites/research" },
      { url: "https://contoso.sharepoint.com/sites/knowledgebase" },
      { url: "https://contoso.sharepoint.com/sites/documentation" }
    ]
  >;
}
```

## Instruction Anti-Patterns

### 5. Vague Instructions
**Problem:** Instructions lack specific guidance.

**Example:**
```typespec
// ❌ Anti-pattern: Too vague
@instructions("""
  You are a helpful assistant. Help users with their questions.
  Be friendly and professional.
""")
```

**Why it's bad:**
- Agent doesn't know when to use which capability
- Inconsistent behavior
- Doesn't leverage available tools effectively

**Solution:** Provide specific, actionable guidance:
```typespec
// ✅ Pattern: Specific instructions
@instructions("""
  You are an HR Policy Assistant. Your role is to answer questions about
  company policies using documents from the HR SharePoint site.

  ## When to use OneDrive:
  - User asks about policies, benefits, procedures
  - Search for: employee handbook, policy documents, FAQ sheets

  ## When to use HR API:
  - User asks about their personal data (PTO balance, pay stubs)
  - Use getEmployeeInfo for personal queries

  ## How to respond:
  - Always cite the source document and section
  - If answer isn't in documents, direct to hr@contoso.com
  - Use professional but friendly tone
  - Format policies as bullet points for readability
""")
```

### 6. Missing Error Handling Guidance
**Problem:** Instructions don't cover what to do when things go wrong.

**Example:**
```typespec
// ❌ Anti-pattern: No error guidance
@instructions("""
  Search the knowledge base and answer questions using the API.
""")
// What if search returns no results? What if API fails?
```

**Why it's bad:**
- Inconsistent error messages
- Poor user experience
- Agent may make up information

**Solution:** Include explicit error handling:
```typespec
// ✅ Pattern: Error handling included
@instructions("""
  ## When information isn't found:
  - "I searched the knowledge base but didn't find information about [topic]."
  - Suggest rephrasing: "Try asking about [related topic]"
  - Offer escalation: "I can create a support ticket for you"

  ## When API fails:
  - "I encountered an error accessing the ticket system"
  - Provide workaround: "You can manually create a ticket at [URL]"
  - Never say "something went wrong" without context
""")
```

### 7. No Scope Boundaries
**Problem:** Instructions don't define what agent can't do.

**Example:**
```typespec
// ❌ Anti-pattern: No boundaries
@instructions("""
  Answer user questions and help with tasks.
""")
// User: "Book me a flight to Paris"
// Agent: Tries to help, fails, creates confusion
```

**Why it's bad:**
- Users have wrong expectations
- Wasted time on impossible requests
- Frustration and loss of trust

**Solution:** Clearly define boundaries:
```typespec
// ✅ Pattern: Clear boundaries
@instructions("""
  ## What I can help with:
  - Company policies and procedures
  - HR forms and processes
  - Benefits information
  - PTO balance and requests

  ## What I cannot help with:
  - Payroll or salary changes (contact payroll@contoso.com)
  - Legal advice (contact legal@contoso.com)
  - Medical advice (contact your healthcare provider)
  - Personal matters outside HR scope
""")
```

## Conversation Design Anti-Patterns

### 8. Generic Conversation Starters
**Problem:** Starters don't showcase agent capabilities.

**Example:**
```typespec
// ❌ Anti-pattern: Too generic
@conversationStarter(#{
  title: "Greeting",
  text: "Hello"
})
@conversationStarter(#{
  title: "Help Request",
  text: "Help me"
})
@conversationStarter(#{
  title: "Capabilities",
  text: "What can you do?"
})
```

**Why it's bad:**
- Doesn't demonstrate what agent can do
- Doesn't guide users to successful interactions
- Missed opportunity to educate users

**Solution:** Showcase specific capabilities:
```typespec
// ✅ Pattern: Specific, actionable starters
@conversationStarter(#{
  title: "Remote Work",
  text: "What is the remote work policy?"
})
@conversationStarter(#{
  title: "PTO Balance",
  text: "How many PTO days do I have left?"
})
@conversationStarter(#{
  title: "Expense Reports",
  text: "How do I submit an expense report?"
})
@conversationStarter(#{
  title: "Benefits Contact",
  text: "Who do I contact about benefits?"
})
```

### 9. Too Many Conversation Starters
**Problem:** Overwhelming users with too many options.

**Example:**
```typespec
// ❌ Anti-pattern: Too many starters (6+ starters)
@conversationStarter("...")
@conversationStarter("...")
// ... 6 more starters
```

**Why it's bad:**
- Clutters UI
- Paradox of choice (users don't know where to start)
- Users won't read them all

**Solution:** Provide 3-6 focused starters:
```typespec
// ✅ Pattern: Right number of starters
@conversationStarter(#{
  title: "Project Updates",
  text: "What are the latest project updates?"
})
@conversationStarter(#{
  title: "Action Items",
  text: "Show me open action items"
})
@conversationStarter(#{
  title: "Meeting Summary",
  text: "Summarize this week's team meetings"
})
@conversationStarter(#{
  title: "Database Migration",
  text: "Who is working on the database migration?"
})
```

### 10. No Confirmation for Actions
**Problem:** Agent takes actions without user confirmation.

**Example:**
```typespec
// ❌ Anti-pattern: No confirmation decorator
@service
namespace TicketAPI {
  @doc("Create a new support ticket")
  @route("/tickets")
  @post
  op createTicket(
    @doc("Ticket details")
    ticket: CreateTicketRequest
  ): Ticket | Error;
  // No @capabilities decorator - creates ticket immediately!
}
```

**Why it's bad:**
- Unexpected actions confuse users
- Mistakes are harder to undo
- Loss of user trust
- No opportunity to review before execution

**Solution:** Use @capabilities decorator with confirmation:
```typespec
// ✅ Pattern: Confirmation with @capabilities decorator
@service
namespace TicketAPI {
  @doc("Create a new support ticket")
  @route("/tickets")
  @post
  @capabilities(#{
    confirmation: #{
      type: "modal",
      title: "Create Support Ticket",
      body: """
      Creating a new support ticket with the following details:
        * **Title**: {{ function.parameters.title }}
        * **Description**: {{ function.parameters.description }}
        * **Priority**: {{ function.parameters.priority }}
      """
    }
  })
  op createTicket(
    @doc("Ticket details")
    ticket: CreateTicketRequest
  ): Ticket | Error;
}

// ✅ Pattern: Adaptive confirmation with additional context
@service
namespace ProjectAPI {
  @doc("Create a new project")
  @route("/projects")
  @post
  @capabilities(#{
    confirmation: #{
      type: "modal",
      title: "Create Project",
      body: """
      Creating a new project with the following details:
        * **Title**: {{ function.parameters.name }}
        * **Description**: {{ function.parameters.description }}
        * **Team Lead**: {{ function.parameters.teamLead }}
        * **Budget**: ${{ function.parameters.budget }}
      """
    }
  })
  op createProject(
    @doc("Project details")
    project: CreateProjectRequest
  ): Project | Error;
}
```

## TypeSpec Anti-Patterns

### 15. Missing Documentation
**Problem:** Models and actions without @doc decorators.

**Example:**
```typespec
// ❌ Anti-pattern: No documentation
model Ticket {
  id: string;
  status: string;
  priority: string;
}
```

**Why it's bad:**
- Hard to understand intent
- Poor discoverability
- Maintenance challenges

**Solution:** Document everything:
```typespec
// ✅ Pattern: Comprehensive documentation
@doc("Represents a support ticket")
model Ticket {
  @doc("Unique ticket identifier")
  id: string;

  @doc("Current ticket status (open, in-progress, resolved, closed)")
  status: TicketStatus;

  @doc("Ticket priority level")
  priority: Priority;
}
```

### 16. Inconsistent Naming
**Problem:** Mixing naming conventions.

**Example:**
```typespec
// ❌ Anti-pattern: Inconsistent naming
model ticket {                    // lowercase
  TicketID: string;              // PascalCase
  ticket_status: string;         // snake_case
  PRIORITY: string;              // UPPERCASE
}
```

**Why it's bad:**
- Confusing and unprofessional
- Hard to maintain
- May cause bugs

**Solution:** Consistent naming:
```typespec
// ✅ Pattern: Consistent PascalCase for models, camelCase for properties
model Ticket {
  ticketId: string;
  status: string;
  priority: string;
}

model CreateTicketRequest {
  title: string;
  description: string;
  priority: Priority;
}
```

### 17. Incorrect String Indentation
**Problem:** Triple-quoted strings with inconsistent indentation.

**Example:**
```typespec
// ❌ Anti-pattern: Incorrect indentation in triple-quoted strings
namespace Prompts {
  const INSTRUCTIONS = """
You are a helpful assistant.

## Core Capabilities
- Search documents
- Answer questions
  """;  // Lines don't align with closing quotes
}

@capabilities(#{
  confirmation: #{
    body: """
Creating a ticket:
  * Title: {{ function.parameters.title }}
  * Description: {{ function.parameters.description }}
    """  // Inconsistent indentation
  }
})
```

**Why it's bad:**
- TypeSpec compilation errors
- **CRITICAL RULE**: TypeSpec requires all lines in a triple-quoted string to have the same indentation as the closing triple quotes
- Unpredictable string formatting
- Hard to read and maintain

**Solution:** Align all lines with closing quotes:
```typespec
// ✅ Pattern: Correct indentation in triple-quoted strings
namespace Prompts {
  const INSTRUCTIONS = """
  You are a helpful assistant.

  ## Core Capabilities
  - Search documents
  - Answer questions
  """;  // All lines aligned with closing quotes
}

@capabilities(#{
  confirmation: #{
    body: """
    Creating a ticket:
      * Title: {{ function.parameters.title }}
      * Description: {{ function.parameters.description }}
    """  // All content aligned with closing quotes
  }
})

// ✅ Pattern: Multi-line instructions with proper indentation
@instructions("""
# Role and Purpose
You are an IT Support Assistant.

## When to Use Actions
**ALWAYS** call createTicket when:
- User reports an issue
- User requests technical support

**NEVER**:
- Make up ticket information
- Skip confirmation step
""")
// Note: All lines have same indentation as closing quotes
```

**Key Rule:**
> TypeSpec requires all lines in a triple-quoted string to have the same indentation as the closing triple quotes. This applies to:
> - `@instructions()` decorator strings
> - `@doc()` decorator strings
> - Confirmation body text in `@capabilities()`
> - Any other triple-quoted string in TypeSpec

## Testing Anti-Patterns

### 18. No Testing Strategy
**Problem:** Deploying agents without testing.

**Example:**
```bash
# ❌ Anti-pattern: Deploy without testing
npm run compile
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env prod
```

**Why it's bad:**
- Bugs in production
- Poor user experience
- Difficult to debug

**Solution:** Comprehensive testing:
```bash
# ✅ Pattern: Test before deploy
npm run compile
# Manual testing in Microsoft 365 Copilot
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env dev
# Manual testing in Microsoft 365 Copilot
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env staging
# Manual testing in Microsoft 365 Copilot
npx -p @microsoft/m365agentstoolkit-cli@latest atk provision --env prod
```

### 19. Testing Only Happy Path
**Problem:** Only testing successful scenarios.

**Example:**
```
// ❌ Anti-pattern: Only testing successful cases
Test: "Search for documents" ✅
Test: "Create ticket" ✅
// Missing: error cases, edge cases, boundary conditions
```

**Why it's bad:**
- Errors surprise users in production
- No confidence in error handling
- Poor reliability

**Solution:** Test error scenarios:
```
// ✅ Pattern: Comprehensive test coverage
Test: "Search finds documents" ✅
Test: "Search with no results" ✅
Test: "Search with invalid query" ✅
Test: "Create ticket successfully" ✅
Test: "Create ticket with missing fields" ✅
Test: "Create ticket when API is down" ✅
Test: "Create ticket with authentication failure" ✅
```