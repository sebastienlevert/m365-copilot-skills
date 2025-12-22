# Conversation and Instruction Design for M365 Agents

## Agent Instructions

The `@instructions` decorator defines the agent's behavior, personality, and constraints. This is the most critical aspect of agent design.

⚠️ **Important:** ALWAYS add indentation to the content inside `@instructions(""" ... """)`. Failing to indent will cause syntax errors.

### Instruction Structure

```typespec
@instructions("""
  You are [role/persona]. Your purpose is to [core function].

  ## Behavior Guidelines
  - [Specific behavior 1]
  - [Specific behavior 2]
  - [Specific behavior 3]

  ## Capabilities
  - Use OneDrive to [specific use case]
  - Use Email to [specific use case]
  - Call the API to [specific use case]

  ## Constraints
  - Do not [constraint 1]
  - Always [constraint 2]
  - Never [constraint 3]

  ## Tone and Style
  - [Communication style]
  - [Formality level]
  - [Special formatting]
""")
```

### Best Practices for Instructions

Use the following official Microsoft [best practices](https://raw.githubusercontent.com/MicrosoftDocs/m365copilot-docs/refs/heads/main/docs/declarative-agent-instructions.md) to create effective instructions.

#### 1. Be Specific and Directive
❌ **Vague**: "Help users with their questions"
✅ **Specific**: "Answer questions about company policies using documents from the HR SharePoint site. If the answer isn't in the documents, direct users to hr@company.com"

#### 2. Define Clear Role and Scope
```typespec
@instructions("""
  You are a Customer Support Assistant for Contoso Electronics. Your role is to:
  1. Answer product questions using the knowledge base
  2. Check order status using the Order API
  3. Create support tickets for issues requiring escalation

  You specialize in home electronics (TVs, audio systems, smart home devices).
""")
```

#### 3. Specify Capability Usage
```typespec
@instructions("""
  ## How to Use Your Capabilities

  **OneDrive (KB Documents):**
  - Search for product manuals, FAQs, troubleshooting guides
  - Reference specific documents when answering questions
  - Always cite the document name and section

  **Email (support@contoso.com):**
  - Check for existing customer communications
  - Review previous support interactions
  - Find order confirmation emails

  **Support API:**
  - Use searchTickets to find existing tickets
  - Use createTicket only after confirming issue needs escalation
  - Use updateTicket to add notes or change status
""")
```

#### 4. Include Decision Logic
```typespec
@instructions("""
  ## Decision Framework

  **When to search the knowledge base:**
  - User asks "how to", "what is", "can I", "where is"
  - Questions about features, specs, compatibility

  **When to check orders:**
  - User mentions order number, tracking, delivery, return
  - Questions about "my order", "where is my", "status of"

  **When to create a ticket:**
  - Issue requires technical support (hardware failure, defects)
  - User explicitly requests to speak with support
  - Issue not resolved after KB search and troubleshooting
""")
```

#### 5. Set Tone and Style
```typespec
@instructions("""
  ## Communication Style
  - Professional but friendly
  - Use clear, jargon-free language
  - Break complex answers into numbered steps
  - Use bullet points for lists
  - Offer to help further after each response
  - Never say "I don't know" - instead say "Let me search for that information"
""")
```

#### 6. Define Constraints and Limitations
```typespec
@instructions("""
  ## What You Cannot Do
  - Do not make promises about shipping dates or refunds
  - Do not provide pricing information (direct to sales team)
  - Do not access customer payment information
  - Do not modify orders (create ticket for order changes)
  - Do not provide medical advice for health products

  ## What You Should Always Do
  - Cite sources from knowledge base documents
  - Confirm order numbers before looking up orders
  - Ask for clarification if user request is ambiguous
  - Summarize ticket details before creating
  - Provide ticket number after creation
""")
```

## Conversation Starters

Conversation starters are pre-written prompts that users can click to begin conversations. They showcase the agent's capabilities and guide users toward productive interactions.

### Best Practices

#### 1. Showcase Different Capabilities
```typespec
// Shows OneDrive search
@conversationStarter(#{
  title: "Employee Handbook",
  text: "What are the latest updates to the employee handbook?"
})

// Shows Email integration
@conversationStarter(#{
  title: "Leadership Emails",
  text: "Summarize emails from the leadership team this week"
})

// Shows API plugin
@conversationStarter(#{
  title: "My Tickets",
  text: "Show me open support tickets assigned to me"
})

// Shows analytical capability
@conversationStarter(#{
  title: "Satisfaction Trends",
  text: "Analyze customer satisfaction trends from last month"
})
```

#### 2. Make Them Specific and Actionable
❌ **Too vague**: "Help me with something"
❌ **Too broad**: "Tell me about the project"
✅ **Specific**: "What are the Q4 deliverables for the Phoenix project?"
✅ **Actionable**: "Create a support ticket for a printer issue"

#### 3. Cover Common Use Cases
Identify the top 3-5 tasks users will perform:
```typespec
// For HR Assistant
@conversationStarter(#{
  title: "Vacation Days",
  text: "How many vacation days do I have left?"
})
@conversationStarter(#{
  title: "Remote Work",
  text: "What is the remote work policy?"
})
@conversationStarter(#{
  title: "Expense Reports",
  text: "How do I submit an expense report?"
})
@conversationStarter(#{
  title: "Benefits Contact",
  text: "Who do I contact about benefits questions?"
})

// For Sales Assistant
@conversationStarter(#{
  title: "Q4 Opportunities",
  text: "Show opportunities closing this quarter"
})
@conversationStarter(#{
  title: "Contoso Deal",
  text: "What's the status of the Contoso deal?"
})
@conversationStarter(#{
  title: "Healthcare Vertical",
  text: "Find all opportunities in the healthcare vertical"
})
@conversationStarter(#{
  title: "New Opportunity",
  text: "Create a new opportunity for Fabrikam"
})
```

#### 4. Use Natural Language
Write starters as users would naturally speak:
✅ Good:
```typespec
@conversationStarter(#{
  title: "Project Phoenix",
  text: "What's the latest on Project Phoenix?"
})
@conversationStarter(#{
  title: "Budget Emails",
  text: "Find emails about the budget review"
})
@conversationStarter(#{
  title: "Password Reset",
  text: "How do I reset my password?"
})
```

❌ Bad:
- "Query project status for Phoenix"
- "Execute email search with filter: budget"
- "Access password reset documentation"

#### 5. Provide 3-6 Starters (Not Too Many)
- **Too few** (<3): Users don't see the full capability range
- **Just right** (3-6): Good variety without overwhelming
- **Too many** (>6): Clutters UI, users won't read them all

## Multi-Turn Conversations

Design instructions to support natural multi-turn conversations:

### Context Retention
```typespec
@instructions("""
  ## Conversation Flow
  - Remember context from previous messages in the conversation
  - Reference earlier topics: "As we discussed earlier..."
  - Build on previous responses rather than repeating information
  - If user asks follow-up questions, assume they reference the current topic
""")
```

### Progressive Disclosure
```typespec
@instructions("""
  ## Information Presentation
  - Start with high-level summary
  - Offer to provide more detail: "Would you like more details on any of these?"
  - When user asks for detail, expand on that specific point
  - Use follow-up questions to narrow scope: "Which area interests you most?"
""")
```

### Confirmation Patterns
```typespec
@instructions("""
  ## Before Taking Action
  - Always summarize what you're about to do
  - Ask for confirmation before:
    * Creating tickets or records
    * Modifying existing data
    * Sending emails or notifications
  - Example: "I'll create a support ticket with these details: [summary]. Should I proceed?"
""")
```

## Agent Personality Patterns

### Professional Assistant
```typespec
@instructions("""
  You are a professional assistant. Maintain a courteous, efficient, and knowledgeable demeanor. Use formal language, complete sentences, and structured responses. Focus on accuracy and thoroughness.
""")
```

### Friendly Helper
```typespec
@instructions("""
  You are a friendly and approachable helper. Use conversational language, contractions, and a warm tone. Add encouraging phrases like "Great question!" or "I'm happy to help with that!" Balance friendliness with professionalism.
""")
```

### Domain Expert
```typespec
@instructions("""
  You are a subject matter expert in [domain]. Provide authoritative, detailed answers with technical accuracy. Use domain-specific terminology when appropriate, but explain complex concepts clearly. Reference standards, best practices, and documentation.
""")
```

### Concise Specialist
```typespec
@instructions("""
  You provide concise, direct answers. Keep responses brief and actionable. Use bullet points and numbered lists. Avoid unnecessary elaboration unless asked. Get straight to the point.
""")
```

## Error Handling and Edge Cases

### When Information Isn't Found
```typespec
@instructions("""
  ## When You Can't Find Information
  - "I searched the knowledge base but didn't find information about [topic]."
  - Suggest alternative searches: "Try rephrasing, or I can search for related topics."
  - Offer escalation: "Would you like me to create a support ticket?"
  - Provide fallback contact: "You can also reach the team at [email/phone]."

  Never say: "I don't know" or "That's not possible"
""")
```

### When Actions Fail
```typespec
@instructions("""
  ## When API Calls Fail
  - Explain what happened: "I attempted to create the ticket, but encountered an error."
  - Provide context if available: "The error indicates [reason]."
  - Offer alternatives: "You can manually create a ticket at [URL]."
  - Suggest retry: "This may be temporary. Would you like me to try again?"
""")
```

### When Requests Are Ambiguous
```typespec
@instructions("""
  ## When Requests Need Clarification
  - "I want to make sure I help with the right thing. Are you asking about [option A] or [option B]?"
  - Offer options: "Did you mean: 1) [interpretation 1], or 2) [interpretation 2]?"
  - Ask focused questions: "To find the right document, which department does this relate to?"
""")
```

### When Outside Scope
```typespec
@instructions("""
  ## When Requests Are Outside Your Scope
  - Be direct: "I'm specialized in [your domain] and can't help with [other topic]."
  - Redirect appropriately: "For [topic], please contact [team/resource]."
  - Offer what you can do: "What I can help with is [your capabilities]."
""")
```

## Testing Conversations

### Test Coverage Checklist
- ✅ Happy path: Core use cases work smoothly
- ✅ Edge cases: Unusual but valid requests
- ✅ Error scenarios: Missing data, API failures, timeouts
- ✅ Ambiguous requests: Under-specified or unclear
- ✅ Out-of-scope: Requests you can't handle
- ✅ Multi-turn: Context retention across messages
- ✅ Confirmations: Action requests require approval

### Sample Test Prompts
```
// Basic functionality
"Find documents about [topic]"
"What is [specific question]?"
"Show me [data from API]"

// Edge cases
"Find documents about [topic that doesn't exist]"
"Create a ticket" (missing required details)
"Update ticket 12345" (ticket doesn't exist)

// Multi-turn
"Find project status" → "Show more detail" → "Who's the PM?"

// Confirmations
"Create a ticket for printer issue" → Confirm → "Yes, create it"
```

## Common Instruction Issues

1. **Too vague**: Instructions lack specific guidance on when/how to use capabilities
2. **Too restrictive**: Over-constrained agents that refuse reasonable requests
3. **Missing error handling**: No guidance for when things go wrong
4. **Inconsistent tone**: Instructions conflict with desired personality
5. **No examples**: Abstract rules without concrete examples
6. **Scope creep**: Instructions try to cover too many unrelated domains
