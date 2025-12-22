# Architectural Patterns and Decision Frameworks

## Architectural Patterns Library

### Pattern: FAQ Bot
```
Capabilities: OneDrive (scoped to FAQ folder)
Actions: None (knowledge-only)
Scope: Personal or Shared
Use Case: Answer common questions from documentation
```

### Pattern: Support Assistant
```
Capabilities: Email (support mailbox), OneDrive (docs), GraphConnectors (tickets)
Actions: Ticket API (search, create, update)
Scope: Shared
Use Case: Customer support automation
```

### Pattern: Research Assistant
```
Capabilities: WebSearch (scoped), OneDrive, GraphConnectors, CodeInterpreter
Actions: None or optional data APIs
Scope: Personal or Shared
Use Case: Information gathering and analysis
```

### Pattern: Project Tracker
```
Capabilities: TeamsMessages (project channels), Meetings, OneDrive (project folder)
Actions: Project API (tasks, status, timeline)
Scope: Shared (team-specific)
Use Case: Project status and coordination
```

### Pattern: Data Analyst
```
Capabilities: OneDrive, CodeInterpreter, GraphicArt
Actions: Optional data warehouse API
Scope: Personal or Shared
Use Case: Data analysis and visualization
```

## Decision Frameworks

### Capability vs. Action Decision Tree
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

### Scoping Decision Tree
```
All users need access to same resources?
  Yes → Unscoped capability
  No → Scoped capability
    ↓
Sensitive data involved?
  Yes → Scope to minimum necessary
  No → Consider broader scope for convenience
    ↓
Multiple locations needed?
  Yes → List all required URLs/IDs
  No → Single scoped location
```
