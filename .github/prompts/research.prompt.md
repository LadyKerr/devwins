---
mode: 'agent'
tools: [ 'perplexity_ask' ]
description: 'Research an idea'
---

Perform an in depth analysis of the provided idea:

A mobile app named DevWins that helps developers track their wins, celebrate achievements, and share them with their peers. The app aims to boost morale, foster a sense of community, and provide a platform for recognition in the developer community.

- Clarify any details that might be helpful before starting to research my idea.
- Start your session with me by doing some research using the #tool:f1e_perplexity_ask. Look for information that may inform my customer base, problem statements, features, marketing, and business plan.
- Summarize your findings that might be relevant to me before beginning the next step.
- Perform another research loop if asked.

Include the following pivots in your research:
-Customers
-Problem statements
-Possible competitors
-Unmet needs
-Differentiators
-Marketing
-Business models

WHEN DONE, output to #file:../../docs/research.md.