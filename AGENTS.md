# Agents Reference

This document catalogs the agents available for this project.

## Agents by Purpose

### changelog-generator (Skill)

**Location:** `~/.claude/skills/changelog/SKILL.md`  
**Type:** Skill  
**Status:** Active

**Purpose:** Create, validate, and maintain CHANGELOG.md files following Keep a Changelog 1.1.0 standard and LightSpeedWP organizational format.

**Trigger words:** 
- "changelog", "release notes", "version management"
- "breaking changes", "semantic versioning"
- "CHANGELOG.md", "Keep a Changelog"

**Key capabilities:**
- Creating new CHANGELOG.md files
- Adding entries (Added, Changed, Fixed, Removed, Security)
- Managing versions and releases
- Validating changelog structure and format
- Converting [Unreleased] to versioned releases
- Generating release notes from commits/PRs
- Enforcing entry formatting standards

**Reference:** [Changelog Skill](~/.claude/skills/changelog/SKILL.md)

---

### branch-validation (Agent)

**Location:** `~/.claude/agents/branch-validation.agent.md`  
**Type:** Agent  
**Status:** Active

**Purpose:** Validates branch names against LightSpeed WP's naming conventions and provides guidance on proper naming, type selection, and CI integration.

**Trigger words:**
- "branch name", "branch validation"
- "naming convention", "branch strategy"
- "git branch", "branch format"

**Key capabilities:**
- Validating branch name format and conventions
- Suggesting corrections for invalid names
- Identifying appropriate branch types
- Checking CI/CD integration requirements
- Providing migration guidance for legacy names

**Reference:** [Branch Validation Agent](./.claude/agents/branch-validation.agent.md)

---

## Agent Interaction

Agents can call each other:

- **branch-validation** → **changelog-generator**: After validating a branch name, generate appropriate changelog entries
- **changelog-generator** → **branch-validation**: Reference branch naming when discussing PR/issue references in entries

---

## Adding New Agents

To add a new agent to this project:

1. Create agent file in `~/.claude/agents/`
2. Update this AGENTS.md with agent details
3. Add agent documentation to docs/
4. Update CLAUDE.md if agent affects user workflow

---

## References

- [CLAUDE.md](./CLAUDE.md) — Project-specific instructions
- [docs/](./docs/) — Agent documentation
- [~/.claude/agents/](~/.claude/agents/) — Agent definitions
- [~/.claude/skills/](~/.claude/skills/) — Skill definitions
