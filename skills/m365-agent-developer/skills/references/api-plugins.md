# API Plugin Architecture for M365 Agents

## When to Use API Plugins

Use API plugins (actions) when the agent needs to:
- **Call external APIs** not available through M365 capabilities
- **Perform CRUD operations** (Create, Read, Update, Delete)
- **Access real-time transactional data** from external systems
- **Modify state** in external systems (create tickets, update records)
- **Integrate with line-of-business systems** (CRM, ticketing, databases)

**Don't use API plugins when:**
- M365 capabilities already provide the data (use capabilities from [typespec-capabilities.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-capabilities.md))
- Read-only access to documents is sufficient
- No external API interaction needed

## API Plugin vs Capabilities Decision Tree

```
Need external API?
  Yes → Create API Plugin Action
  No → Use built-in Capability
    ↓
Need real-time transactional data?
  Yes → API Plugin
  No → Capability (SharePoint, Connectors)
    ↓
Need CRUD operations?
  Yes → API Plugin
  No → Capability
    ↓
Need to modify state?
  Yes → API Plugin
  No → Capability
```

## Authentication for API Plugins

For all authentication patterns (API key, OAuth2, Entra ID SSO), see [typespec-authentication.md](typespec-authentication.md).

## API Plugin Best Practices

### 1. Operation Naming
Use clear, verb-based names for operations:
- ✅ `op searchTickets`, `op createTicket`, `op updateTicketStatus`
- ❌ `op tickets`, `op doSomething`, `op api1`

### 2. Input Validation
Define clear models with required vs optional fields:
```typespec
model CreateTicketRequest {
  title: string;              // Required
  description: string;        // Required
  priority: Priority;         // Required enum
  assignee?: string;          // Optional
  dueDate?: string;           // Optional
}
```

### 3. Error Handling
Document expected errors and status codes:
```typespec
/**
 * Search tickets. Returns 404 if no tickets found, 401 if unauthorized.
 * @param query Search query string.
 */
@route("/api/tickets")
@get
op searchTickets(@query query: string): Ticket[] | ErrorResponse;
```

### 4. Response Models
Always define response models if defined in the API specification:
```typespec
model Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

model ErrorResponse {
  error: string;
  code: int32;
  message: string;
}
```

## Common API Plugin Patterns

### Pattern: CRM Integration
```typespec
@service
@server("https://api.salesforce.com")
@actions(#{
  nameForHuman: "Salesforce CRM",
  descriptionForHuman: "Manage accounts and opportunities in Salesforce.",
  descriptionForModel: "Search and manage Salesforce accounts and opportunities."
})
namespace SalesforceAPI {
  /**
   * Get account details by ID.
   * @param accountId The ID of the account.
   */
  @route("/api/accounts/{accountId}")
  @get
  op getAccount(@path accountId: string): Account;

  /**
   * Search opportunities.
   * @param query Search query string.
   * @param status Optional status filter.
   */
  @route("/api/opportunities")
  @get
  op searchOpportunities(@query query: string, @query status?: string): Opportunity[];

  /**
   * Create new opportunity.
   * @param opportunity The opportunity to create.
   */
  @route("/api/opportunities")
  @post
  op createOpportunity(@body opportunity: OpportunityRequest): Opportunity;

  /**
   * Update opportunity status.
   * @param id The ID of the opportunity.
   * @param status The new status.
   */
  @route("/api/opportunities/{id}")
  @patch
  op updateOpportunityStatus(@path id: string, @body status: StatusUpdate): Opportunity;
}
```

### Pattern: Ticketing System
```typespec
@service
@server("https://tickets.contoso.com")
@actions(#{
  nameForHuman: "Ticket System",
  descriptionForHuman: "Manage support tickets and track issues.",
  descriptionForModel: "Search, create, update, and manage support tickets."
})
namespace TicketAPI {
  /**
   * Search tickets.
   * @param query Search query string.
   * @param status Optional status filter.
   * @param assignee Optional assignee filter.
   */
  @route("/api/tickets")
  @get
  op searchTickets(
    @query query?: string,
    @query status?: TicketStatus,
    @query assignee?: string
  ): Ticket[];

  /**
   * Get ticket by ID.
   * @param id The ticket ID.
   */
  @route("/api/tickets/{id}")
  @get
  op getTicket(@path id: string): Ticket;

  /**
   * Create new ticket.
   * @param request The ticket to create.
   */
  @route("/api/tickets")
  @post
  op createTicket(@body request: CreateTicketRequest): Ticket;

  /**
   * Add comment to ticket.
   * @param id The ticket ID.
   * @param comment The comment to add.
   */
  @route("/api/tickets/{id}/comments")
  @post
  op addComment(@path id: string, @body comment: CommentRequest): Comment;

  /**
   * Update ticket.
   * @param id The ticket ID.
   * @param updates The updates to apply.
   */
  @route("/api/tickets/{id}")
  @patch
  op updateTicket(@path id: string, @body updates: TicketUpdate): Ticket;
}
```

### Pattern: Data Warehouse/Analytics
```typespec
@service
@server("https://analytics.contoso.com")
@actions(#{
  nameForHuman: "Analytics API",
  descriptionForHuman: "Query business metrics and generate reports.",
  descriptionForModel: "Execute analytics queries and retrieve business reports."
})
namespace AnalyticsAPI {
  /**
   * Execute analytics query.
   * @param queryRequest The query parameters.
   */
  @route("/api/query")
  @post
  op query(@body queryRequest: QueryRequest): QueryResult;

  /**
   * Get pre-built report.
   * @param reportId The report ID.
   * @param parameters Optional parameters for the report.
   */
  @route("/api/reports/{reportId}")
  @get
  op getReport(@path reportId: string, @query parameters?: string): Report;

  model QueryRequest {
    metric: string;
    dimensions?: string[];
    filters?: Filter[];
    dateRange?: DateRange;
  }
}
```

### Pattern: Document Management
```typespec
@service
@server("https://docs.contoso.com")
@actions(#{
  nameForHuman: "Document Management",
  descriptionForHuman: "Manage documents in external system.",
  descriptionForModel: "Search, upload, and manage documents in external document management system."
})
namespace DocumentAPI {
  /**
   * Search documents.
   * @param query Search query string.
   * @param category Optional category filter.
   * @param modifiedAfter Optional date filter.
   */
  @route("/api/documents")
  @get
  op searchDocuments(
    @query query: string,
    @query category?: string,
    @query modifiedAfter?: string
  ): Document[];

  /**
   * Get document metadata.
   * @param id The document ID.
   */
  @route("/api/documents/{id}")
  @get
  op getDocument(@path id: string): Document;

  /**
   * Upload new document.
   * @param document The document to upload.
   */
  @route("/api/documents")
  @post
  op uploadDocument(@body document: DocumentUpload): Document;

  /**
   * Update document metadata.
   * @param id The document ID.
   * @param metadata The metadata to update.
   */
  @route("/api/documents/{id}")
  @put
  op updateDocument(@path id: string, @body metadata: DocumentMetadata): Document;
}
```

## Testing API Plugins

### Local Testing
1. Use tools like Bruno or REST Client extension to test API endpoints
2. Verify authentication works correctly (see [typespec-authentication.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-authentication.md))
3. Test error scenarios (404, 401, 500)
4. Validate response formats match TypeSpec models

### Integration Testing
1. Test from agent with various prompts
2. Verify agent correctly interprets API responses
3. Test error handling in conversation
4. Validate authentication flow end-to-end

## Security Considerations

### 1. Credential Management
- **Never hardcode credentials** in TypeSpec or code
- Use `@authReferenceId` for production (see [typespec-authentication.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-authentication.md))
- Use environment variables (`.env` file) for development
- Rotate credentials regularly

### 2. Input Sanitization
- Validate all inputs in API backend
- Prevent injection attacks
- Limit string lengths and ranges
- Use strong typing in TypeSpec models

### 3. Rate Limiting
- Implement rate limiting in API backend
- Handle 429 (Too Many Requests) responses
- Provide clear feedback to users

### 4. Data Privacy
- Only request necessary data
- Follow data residency requirements
- Log API calls for audit purposes (see [security-guidelines.md](security-guidelines.md))
- Handle PII appropriately

## Common API Plugin Issues

1. **Authentication failures**: See [typespec-authentication.md](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/typespec-authentication.md) for troubleshooting
2. **CORS errors**: Configure API to allow agent's origin
3. **Timeout issues**: Implement retries, increase timeouts, optimize API
4. **Schema mismatches**: Ensure TypeSpec models match actual API responses
5. **Rate limiting**: Implement exponential backoff, cache responses
