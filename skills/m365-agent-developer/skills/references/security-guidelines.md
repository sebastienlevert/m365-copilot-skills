# Security and Privacy Guidelines for M365 Agents

## Core Security Principles

### 1. Principle of Least Privilege
Grant only the minimum permissions necessary for the agent to function.

**For M365 Capabilities:**
- Use scoped capabilities when possible
- Limit to specific sites, folders, mailboxes, or teams
- Prefer narrower scopes over broad access

**For API Plugins:**
- Request minimum OAuth scopes needed
- Use read-only permissions when write isn't needed
- Scope API access to specific resources

### 2. Data Classification and Sensitivity
Understand what data the agent will access:
- **Public**: Can be widely shared
- **Internal**: Company employees only
- **Confidential**: Limited to specific teams/roles
- **Restricted**: Highly sensitive (PII, financial, health)

**Agent scoping based on sensitivity:**
```typespec
// Public knowledge base - unscoped OK
op oneDriveAndSharePoint is AgentCapabilities.OneDriveAndSharePoint;

// HR documents - must be scoped
op oneDriveAndSharePoint is AgentCapabilities.OneDriveAndSharePoint<
  ItemsByUrl = [
    { url: "https://contoso.sharepoint.com/sites/hr-policies" }
  ]
>;

// Executive emails - must be scoped to specific mailbox
op email is AgentCapabilities.Email<
  SharedMailbox = "executive-team@contoso.com"
>;
```

### 3. User Consent and Transparency
Users must understand what the agent accesses:
- Agent description clearly states what data is accessed
- Consent screens during deployment show permissions
- Privacy policy or documentation available
- Users can revoke access at any time

## Capability Scoping Security

### SharePoint/OneDrive Scoping

**Scope by site URL:**
```typespec
op oneDriveAndSharePoint is AgentCapabilities.OneDriveAndSharePoint<
  ItemsByUrl = [
    { url: "https://contoso.sharepoint.com/sites/project-phoenix" }
  ]
>;
```

**Scope by multiple sites and document libraries:**
```typespec
op oneDriveAndSharePoint is AgentCapabilities.OneDriveAndSharePoint<
  ItemsByUrl = [
    { url: "https://contoso.sharepoint.com/sites/hr/Shared%20Documents" },
    { url: "https://contoso.sharepoint.com/sites/hr/Policies" }
  ]
>;
```

**Scope by SharePoint IDs (site, web, list, item):**
```typespec
op oneDriveAndSharePoint is AgentCapabilities.OneDriveAndSharePoint<
  ItemsBySharePointIds = [
    {
      siteId: "12345678-1234-1234-1234-123456789012";
      listId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    }
  ]
>;
```

**When to scope SharePoint/OneDrive:**
- ✅ Agent serves specific team/project
- ✅ Accessing sensitive documents (HR, legal, finance)
- ✅ Need predictable, focused results
- ✅ Compliance requirements limit data access

**When unscoped may be acceptable:**
- Personal productivity agent for individual users
- User's existing permissions are sufficient control
- Agent needs to search across user's entire OneDrive

### Email Scoping

**Scope by well-known folders:**
```typespec
op email is AgentCapabilities.Email<
  Folders = [
    { folderId: "Inbox" },
    { folderId: "SentItems" },
    { folderId: "Archive" }
  ]
>;
```

**Scope by shared mailbox:**
```typespec
op email is AgentCapabilities.Email<
  SharedMailbox = "support@contoso.com"
>;
```

**Scope by folders and shared mailbox:**
```typespec
op email is AgentCapabilities.Email<
  Folders = [
    { folderId: "Inbox" }
  ],
  SharedMailbox = "legal@contoso.com"
>;
```

**When to scope Email:**
- ✅ Always scope for shared mailboxes
- ✅ Limit to specific folders containing relevant emails
- ✅ Accessing support/customer service emails
- ✅ Any scenario with sensitive communications

### Teams Scoping

**Scope by Teams channel URLs:**
```typespec
op teamsMessages is AgentCapabilities.TeamsMessages<Urls = [
  { url: "https://teams.microsoft.com/l/channel/19%3a123abc...%40thread.skype/General?groupId=12345&tenantId=67890" }
]>;
```

**Scope by multiple channels and chats:**
```typespec
op teamsMessages is AgentCapabilities.TeamsMessages<Urls = [
  { url: "https://teams.microsoft.com/l/channel/19%3aprojectA...%40thread.tacv2/Development?groupId=11111&tenantId=22222" },
  { url: "https://teams.microsoft.com/l/channel/19%3aprojectA...%40thread.tacv2/Testing?groupId=11111&tenantId=22222" },
  { url: "https://teams.microsoft.com/l/chat/19%3astandup_daily...%40thread.v2/0?context=%7b%22Tid%22%3a%22...%22%7d" }
]>;
```

**When to scope Teams:**
- ✅ Agent serves specific team or project
- ✅ Accessing channels with sensitive discussions
- ✅ Limit to relevant channels only

### WebSearch Scoping

**Scope by specific sites:**
```typespec
op webSearch is AgentCapabilities.WebSearch<Sites = [
  { url: "https://learn.microsoft.com" },
  { url: "https://docs.microsoft.com" }
]>;
```

**Scope to company knowledge base:**
```typespec
op webSearch is AgentCapabilities.WebSearch<Sites = [
  { url: "https://company.com/knowledge-base" },
  { url: "https://support.company.com" }
]>;
```

**When to scope WebSearch:**
- ✅ Limit to trusted domains only
- ✅ Prevent access to potentially harmful sites
- ✅ Company policy restricts internet access
- ⚠️ Note: Broad web access carries information leak risks

## API Plugin Security

### Authentication Security

#### OAuth 2.0 Best Practices
```
✅ Use authorization code flow with PKCE
✅ Store tokens securely (Azure Key Vault)
✅ Implement token refresh logic
✅ Set minimum scope required
✅ Use state parameter to prevent CSRF
❌ Never store tokens in code or config files
❌ Don't use implicit flow
❌ Don't request more scopes than needed
```

#### API Key Security
```
✅ Store in environment variables or Key Vault
✅ Rotate keys regularly
✅ Use separate keys for dev/test/prod
✅ Monitor key usage for anomalies
❌ Never commit keys to source control
❌ Don't share keys between environments
❌ Don't embed in client-side code
```
## Credential Management

### Environment Variables
Store secrets in `.env.{environment}.user` file, never in code:
```bash
# .env
API_KEY=your-api-key-here
OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
DATABASE_CONNECTION_STRING=your-connection-string
```

**Important:**
- Add `.env.{environment}.user` to `.gitignore`
- Use separate `.env.{environment}.user` files for dev/staging/prod
- Never commit `.env.{environment}.user` to source control

## Security Testing

### Checklist
- ✅ Verify capability scoping is appropriate for data sensitivity
- ✅ Test with different user permissions
- ✅ Attempt to access out-of-scope resources
- ✅ Test API authentication failure scenarios
- ✅ Try SQL injection, XSS, and other injection attacks
- ✅ Test rate limiting under load
- ✅ Review audit logs for completeness
- ✅ Verify PII is not logged
- ✅ Test token expiration and refresh
- ✅ Verify HTTPS is enforced
- ✅ Check for exposed secrets in code/config