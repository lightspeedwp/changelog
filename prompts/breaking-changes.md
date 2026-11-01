# Prompt: Document Breaking Changes

Add breaking changes to a changelog with migration guidance.

## Input

**Breaking changes:**
- Removed `agent.sync()` method (use `await agent.execute()` instead)
- Changed configuration schema (old `agent.old.json` format no longer supported)

**PR/Issue numbers:**
- #2000 (sync removal)
- #2001 (schema change)

**Current [Unreleased] section:**
```markdown
## [Unreleased]

### Added
- Parallel execution support (#1999)
```

## Expected Output

Add breaking changes with clear migration paths:

```markdown
## [Unreleased]

### Added
- Parallel execution support (#1999)

### Changed
- Breaking: Removed `agent.sync()` method. Use `await agent.execute()` instead. (#2000)
- Breaking: Changed configuration schema. See MIGRATION.md for upgrade path. (#2001)
```

## Key Points

- Use "Breaking:" prefix for clarity
- Include migration guidance in the entry
- Example: "Use X instead of Y" or "See MIGRATION.md"
- Consider MAJOR version bump when releasing
- Document what changed and how to migrate
- Be specific: show old vs. new
- Keep entries readable (≤100 chars including PR)
