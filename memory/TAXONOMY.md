# Memory Taxonomy

This file defines the current memory categories and filing rules.
Execution summaries belong in dreaming history.

## Invariants
- Unified memory lives under `memory/`.
- Semantic and episodic memory are the source of truth. L1 (`MEMORY.md`, `USER.md`) is derived from them.
- L1 files must stay small enough for prompt loading.
- Semantic pages use frontmatter + Current + History.
- Episodic memory lives under `episodic/` and uses append-only raw markdown entries grouped by date.
- Read-time retrieval must not depend on this file.
- Each semantic write must have one primary home.
- Episodic references should prefer deterministic read-only getters over search expressions or side-effectful code.
- Semantic and L1 references should prefer backing markdown file paths.

## L1 Root Files

### `MEMORY.md`
What goes here:
- globally reusable operating rules
- durable default behavior
- tool and workflow conventions that matter on many tasks

What does not go here:
- detailed world knowledge
- site-specific quirks
- one-off task context

### `USER.md`
What goes here:
- stable user profile
- stable user preferences
- high-level site/service mappings
- long-running user context worth loading every session

What does not go here:
- detailed workflows for specific sites
- ephemeral session notes
- dossier-style detail that belongs in semantic or episodic memory

## Directory Rules

These categories are starting points, not a fixed list. Reuse a suitable category
or create one when durable knowledge needs a distinct home.

### `users/`
What goes here:
- the canonical profile page for the current user
- durable user facts, preferences, and long-running context

What does not go here:
- other people in the user's world
- transient session chatter

### `agent/`
What goes here:
- durable operating memory for the agent
- long-lived workflow rules
- stable constraints and conventions

What does not go here:
- facts about external people or companies
- site-specific browsing procedures

### `people/`
What goes here:
- durable facts and history about other specific humans

What does not go here:
- the current user's own profile page
- company-level knowledge
- agent operating rules

### `companies/`
What goes here:
- organization knowledge
- durable company context and history

What does not go here:
- person-specific profiles
- browser interaction procedures

### `sites/`
What goes here:
- browser knowledge for a site as one durable page
- UI behavior, workflow procedures, and durable site quirks
- durable mappings between a site and the user's real-world purpose for using it

What does not go here:
- general user preference that is not site-related
- broad company knowledge unless it materially affects browser use

### `projects/`
What goes here:
- active work with durable context
- project-level decisions and long-running threads

What does not go here:
- one-off session chatter
- broad concepts that should generalize beyond one project

### `concepts/`
What goes here:
- reusable frameworks and mental models
- generalized lessons that apply across projects or sites

What does not go here:
- project-specific implementation detail
- entity-specific facts that belong to people or companies

### `routines/<routine-slug>/MEMORY.md`
What goes here:
- recurring cron routine execution memory
- durable notes and results useful for future runs of the same routine

### `episodic/`
What goes here:
- date-grouped observations and events that may matter later
- session-specific or externally received signals worth remembering
- sparse evidence that is not yet worth forcing into a semantic page

What does not go here:
- startup summaries for L1
- synthetic subject briefings
- typed source records or heavyweight raw-data mirrors

## Write Routing Decision Tree
1. Is the information durable enough to remember beyond the current session?
   - If no: keep it out of durable memory.
2. Is the item sparse, event-like, uncertain, or better preserved as an observation first?
   - If yes: append it to `episodic/YYYY-MM-DD.md`.
3. Did the item also change stable understanding about a subject?
   - If yes: update the primary semantic page as well.
4. Is there already a semantic page whose subject is the correct primary home?
   - If yes: update that page instead of creating a new one.
5. Before creating a new semantic page, have slug, title, and aliases been checked?
   - If no: check for duplicates first.
6. What is the correct semantic write shape?
   - Append `History` first, ideally with source paths to the relevant episodic markdown files.
   - Rewrite `Current` only if the stable understanding changed.
7. Is the semantic change globally important at session start?
   - If yes: refresh `MEMORY.md` or `USER.md`.
8. Does the item fit no existing directory cleanly?
   - Create a category with a clear purpose and boundary, then update the directory rules and route the page there.

## Promotion Rules
- Promote to `USER.md` only when the change is stable, high-value, and broadly useful at session start.
- Promote to `MEMORY.md` only when the change affects default agent behavior across many tasks.
- Promote from episodic into semantic when repeated observations or strong evidence establish durable understanding.
- Do not promote one-off incidents, narrow site quirks, or uncertain facts into L1.
- Do not force every episodic entry to produce a semantic page. Sparse evidence is allowed to remain episodic.

## Organization Evolution
- Use a new page for a new subject within an existing category, or create a category for a distinct kind of knowledge.
- Clarify, split, or merge category boundaries as needed, preserving the invariants and backing evidence.
- Update this file only when the structure or filing rules change.
