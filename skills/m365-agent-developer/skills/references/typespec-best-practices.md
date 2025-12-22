## TypeSpec for Microsoft 365 Copilot Best Practices

### TypeSpec References

For detailed TypeSpec syntax and examples, refer to these documents:
- **[Capabilities Reference](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-capabilities.md)** - Available agent capabilities and scoping
- **[Authentication Reference](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-authentication.md)** - Authentication patterns for API plugins
- **[Decorators Reference](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-decorators.md)** - Agent and operation decorators

### TypeSpec Fundamentals

**Language Mastery:**
- TypeSpec compiler v1.0.0+ with @microsoft/typespec-m365-copilot library
- Namespace organization and module structure
- Import statements and using declarations
- Decorators and their proper application
- Model definitions with proper typing
- Enum definitions for constrained values

**Basic Agent Structure:**
```typespec
import "@typespec/http";
import "@microsoft/typespec-m365-copilot";

using TypeSpec.M365.Copilot.Agents;

@agent("Agent Name", "Clear description")
@instructions(Prompts.INSTRUCTIONS)
@conversationStarter(#{ title: "Example", text: "Query example" })
namespace MyAgent {
  // Expose actions
  op getResource is ResourceAPI.getResource;

  // Enable capabilities
  op webSearch is AgentCapabilities.WebSearch;
}
```

### Agent Decorators

TypeSpec provides decorators from `@microsoft/typespec-m365-copilot` to configure agent behavior.

For complete decorator reference, see **[typespec-decorators.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-decorators.md)**.

### Capabilities

**CRITICAL SCOPING RULE:**
Scoping MUST be done in capability definitions, NOT in instructions!

For detailed syntax and scoping examples, see **[typespec-capabilities.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-capabilities.md)**.

### Actions (API Plugins)

**Action Structure:**
```typespec
@service
@server(Environment.API_ENDPOINT, "API Name")
@actions(#{
  nameForHuman: "Resource API",
  descriptionForHuman: "Manage resources",
  descriptionForModel: "Use when user asks about resources.",
  legalInfoUrl: "https://contoso.com/legal",
  privacyPolicyUrl: "https://contoso.com/privacy"
})
namespace ResourceAPI {
  @doc("Get resource by ID")
  @route("/resources/{id}")
  @get
  op getResource(
    @doc("Resource identifier")
    @path id: string,

    @doc("Include archived resources")
    @query includeArchived?: boolean
  ): ResourceInfo | Error;
}
```

If the data would offer value to be rendered as a card in the chat, ensure to add the @card decorator to the operation returning the model.

The TypeSpec action with @card decorator looks like this:
```typespec
@service
@server(Environment.API_ENDPOINT, "API Name")
@actions(#{
  nameForHuman: "Resource API",
  descriptionForHuman: "Manage resources",
  descriptionForModel: "Use when user asks about resources.",
  legalInfoUrl: "https://contoso.com/legal",
  privacyPolicyUrl: "https://contoso.com/privacy"
})
namespace ResourceAPI {
  @doc("Get resource by ID")
  @route("/resources/{id}")
  @card(#{
    dataPath: "$", // The JSON path to the data in the response
    file: "cards/resourceCard.json",
    properties: #{
        title: "$.name",
        subtitle: "$.status"
    }
  })
  @get
  op getResource(
    @doc("Resource identifier")
    @path id: string,

    @doc("Include archived resources")
    @query includeArchived?: boolean
  ): ResourceInfo | Error;
}
```

The Adaptive Card JSON file (e.g., `appPackage/cards/resourceCard.json`) could look like this:
```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "body": [
      {
        "type": "Container",
        "$data": "${$root}",
        "items": [
          {
            "type": "TextBlock",
            "text": "**Title: ${if(name, name, 'N/A')}**",
            "wrap": true
          },
          {
            "type": "TextBlock",
            "text": "${if(description, description, 'N/A')}",
            "wrap": true
          }
        ]
      }
    ],
    "actions": [
      {
        "type": "Action.OpenUrl",
        "title": "View Issue",
        "url": "${url}"
      }
    ]
}
```

**HTTP Methods:**
- `@get` - Read operations
- `@post` - Create operations
- `@put` - Replace operations
- `@patch` - Update operations
- `@delete` - Delete operations

**Authentication Patterns:**

See **[typespec-authentication.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-authentication.md)** for:
- Anonymous (no auth)
- API Key authentication
- OAuth2 authorization code flow
- Entra ID SSO authentication
- Using `@authReferenceId` for production

### Model Design

**Best Practices:**
```typespec
@doc("Represents a resource")
model ResourceInfo {
  @doc("Unique identifier")
  id: string;

  @doc("Resource name")
  name: string;

  @doc("Resource status")
  status: ResourceStatus;

  @doc("Creation timestamp")
  createdAt: datetime;

  @doc("Optional description")
  description?: string;
}

@doc("Resource status values")
enum ResourceStatus {
  @doc("Active resource")
  Active: "Active",

  @doc("Archived resource")
  Archived: "Archived"
}
```

- Create reusable models in dedicated `models.tsp` file
- Use descriptive names (PascalCase for models)
- Add `@doc` comments to all properties
- Use proper TypeSpec types: `string`, `int32`, `int64`, `float64`, `boolean`, `datetime`
- Use optional properties with `?` when fields may be absent
- Define enums for fixed value sets

### Instruction Crafting

**CRITICAL: Instructions have a strict 8000 character limit!**

**Structure:**
```typespec
namespace Prompts {
  const INSTRUCTIONS = """
    # Role and Purpose
    You are an agent that helps users manage resources.

    ## CORE CAPABILITIES
    - Search and retrieve resource information
    - Provide detailed resource analysis
    - Assist with resource management tasks

    ## WHEN TO USE ACTIONS
    **ALWAYS** call getResource when:
    - User provides a resource ID
    - User asks about a specific resource
    - User wants resource details

    **NEVER**:
    - Make up resource information
    - Guess resource IDs
    - Provide information without calling the API

    ## RESPONSE FORMAT
    When displaying resources:
    1. Start with the resource name
    2. Show the current status
    3. Include creation date
    4. Add relevant description

    ## ERROR HANDLING
    - If resource not found (404): "I couldn't find a resource with that ID."
    - If API error: "I'm having trouble accessing resource information."
    - If missing ID: "Please provide the resource ID."
""";
}
```

**Best Practices:**
- Use directive keywords: **ALWAYS**, **NEVER**, **MUST**
- Provide concrete examples with input/output
- Explain multi-step workflows explicitly
- Document error handling strategies
- Reference actions by operation names
- Keep focused on behavior, not scoping

See **[conversation-design.md](references/conversation-design.md)** for detailed guidance.

### Environment Configuration

**CRITICAL: Never manually edit `env.tsp` - it's auto-generated!**

**Workflow:**
1. Edit `.env` files in `env/` directory
2. Run `npm run generate:env` to regenerate `env.tsp`
3. Reference constants using `Environment.CONSTANT_NAME`

### Validation and Compilation

**ALWAYS compile before provisioning!**

**Compilation Workflow:**
1. Install dependencies: `npm install`
2. Generate environment: `npm run generate:env`
3. Compile TypeSpec: `npm run compile`
4. Package: Follow the best practices in **[deployment.md](references/deployment.md)**
5. Provision and deploy as needed: Follow the best practices in **[deployment.md](references/deployment.md)**

---
