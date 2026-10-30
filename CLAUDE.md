# Claude.md — Project Instructions

This file contains instructions for Claude when working with this project.

## Project Overview

**Name:** LightSpeed WP Changelog Generator  
**Description:** Skills, agents, and tooling for managing CHANGELOG.md files across LightSpeed WP projects  
**Repository:** https://github.com/lightspeedwp/changelog  
**Status:** Active Development  

## Scope

This project contains:
- ✅ Changelog skill (`~/.claude/skills/changelog/`) for creating and maintaining CHANGELOGs
- ✅ Branch validation agent (`~/.claude/agents/branch-validation.agent.md`) for branch naming conventions
- ✅ Documentation and reference materials
- ✅ Validation scripts and tooling
- ✅ Spec management with speckit integration
- ✅ Test cases and evaluation suite

## Key Files & Directories

```
changelog/
├── CHANGELOG.md                # This project's changelog
├── AGENTS.md                   # Agent documentation
├── CLAUDE.md                   # This file (project instructions)
├── docs/                       # User documentation
├── .specify/                   # Speckit configuration
├── ~/.claude/
│   ├── skills/changelog/       # Changelog skill definition
│   └── agents/                 # Agent definitions
```

## Working with the Changelog Skill

### Core Concept

The changelog skill helps users create and maintain CHANGELOG.md files following Keep a Changelog 1.1.0 and LightSpeed WP standards.

### When to Invoke

- User says "create a changelog" or "add changelog entry"
- User mentions "release notes" or "version management"
- User discusses breaking changes or semantic versioning
- Even when not explicitly asked, if discussing project history or versioning

### Key Requirements

1. **Keep a Changelog 1.1.0** — Follow the official standard
2. **Semantic Versioning** — MAJOR.MINOR.PATCH format
3. **LightSpeed WP Format** — Organization-specific conventions
4. **Validation** — All entries must pass automated checks

### Skill References

- Main skill: `~/.claude/skills/changelog/SKILL.md`
- Format spec: `~/.claude/skills/changelog/references/CHANGELOG_FORMAT.md`
- Validation rules: `~/.claude/skills/changelog/references/VALIDATION_RULES.md`
- Prompts: `~/.claude/skills/changelog/prompts/`

## Working with the Branch Validation Agent

### Core Concept

The branch validation agent ensures branch names follow LightSpeed WP conventions.

### Branch Naming Rules

- Format: `type/description-of-work`
- Types: `feature`, `fix`, `docs`, `refactor`, `test`, `chore`, `security`
- Rules: lowercase, hyphens only, 3-50 chars, no special chars or underscores

### Agent Reference

- Main agent: `~/.claude/agents/branch-validation.agent.md`

## Development Workflow

### 1. Creating a Changelog for a New Project

**Task:** User wants to create a CHANGELOG.md for a new project

**Steps:**
1. Use the changelog skill
2. Create initial structure with version 0.1.0 or 1.0.0
3. Add Unreleased section for future work
4. Validate with the validation script

**Example:**
```bash
node ~/.claude/skills/changelog/scripts/validate-changelog.cjs CHANGELOG.md
```

### 2. Adding Entries During Development

**Task:** User has changes and wants to document them

**Steps:**
1. Use the changelog skill
2. Add entries to [Unreleased] section
3. Categorize under: Added, Changed, Fixed, Removed, Security
4. Reference PR/issue numbers
5. Validate before committing

### 3. Creating a Release

**Task:** Ready to release a version

**Steps:**
1. Use the changelog skill
2. Bump version following semver rules
3. Replace [Unreleased] with version and date
4. Create new [Unreleased] section
5. Validate and merge

## Best Practices

### For Claude

1. **Always validate** — Run validation scripts before considering a changelog complete
2. **Reference PRs** — Ensure all entries cite PR/issue numbers
3. **Use consistent formatting** — Em-dashes, tense, capitalization
4. **Explain decisions** — When changing changelog, explain semantic versioning decisions
5. **Check CI** — Remind users that CI will validate their changelog

### For Users

1. **Keep entries short** — Max 100 characters including PR reference
2. **Update on every PR** — Don't batch changelog updates for release
3. **Use consistent tense** — Past tense, third person: "Fixed", "Added", "Changed"
4. **Reference PRs** — All entries must cite their PR/issue number
5. **Test validation** — Run scripts locally before pushing

## Spec Management

This project uses speckit for specification management.

### Spec Location

`.specify/specs/001-changelog-agent-quality.md` — Quality specifications for the changelog skill and agent

### Running Spec Tests

```bash
speckit validate .specify/specs/
```

## Testing & Evaluation

Test cases are located in:
- `~/.claude/skills/changelog/evals/` — Skill evaluation cases

Run tests with:
```bash
claude plugin eval ~/.claude/skills/changelog/
```

## Troubleshooting

### "Changelog doesn't parse"
- Check Markdown syntax
- Verify heading structure
- Look for unclosed code blocks

### "Invalid version format"
- Must be semver: `1.0.0` (not `1.0` or `v1.0.0`)
- Or `[Unreleased]`
- Dates must be `YYYY-MM-DD`

### "Entry too long"
- Max 100 characters per entry
- Shorten description or move details to PR
- Remove redundant words

### "Missing PR reference"
- All entries must cite PR/issue: `(#1234)`
- Add reference if missing

## Git Workflow

### Committing to Changelog

When committing changes to this repository:

```bash
git add .
git commit -m "Add/Update changelog entries

- Brief description of change
- Reference relevant specs

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Attribution

All commits should include:
```
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

## External Resources

- [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
- [Semantic Versioning](https://semver.org/)
- [LightSpeed WP Org Standards](https://github.com/lightspeedwp/.github)

## Questions or Updates

For questions or to propose updates to this CLAUDE.md:
1. Create an issue in the repository
2. Reference relevant sections
3. Explain the change needed
4. Link to supporting documentation

---

**Last updated:** 2026-10-30  
**Maintained by:** LightSpeed WP Team  
**Status:** Active
