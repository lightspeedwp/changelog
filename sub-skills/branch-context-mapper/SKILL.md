---
name: branch-context-mapper
description: |
  Extract branch metadata and map to changelog entries. This skill extracts the branch type (feature/fix/docs/etc) from a git branch name, determines the corresponding changelog category (Added/Fixed/Changed/Removed/Security), calculates the semantic version bump (MAJOR/MINOR/PATCH), and detects breaking changes. Use this skill whenever you need to analyze a git branch and determine how it should appear in a changelog, what version bump it represents, or validate branch naming against LightSpeed WP conventions. Trigger whenever the user mentions branch analysis, changelog mapping, version bumping strategy, or needs to correlate git branches with release notes.
compatibility: |
  - Requires: Node.js 18+ (for running validation)
  - Optional: Git access for branch metadata extraction
---

# Branch Context Mapper

Maps git branch types to changelog categories, semantic version bumps, and governance rules.

## Quick Reference

| Branch Type | Category | Version Bump | Changelog |
|------------|----------|--------------|-----------|
| `feature/` | Added | MINOR | Yes |
| `fix/` | Fixed | PATCH | Yes |
| `security/` | Security | PATCH/MAJOR | Yes |
| `docs/` | (none) | (none) | No |
| `refactor/` | Changed | (none) | No |
| `test/` | (none) | (none) | No |
| `chore/` | (none) | PATCH | Optional |

## Core Functions

**Analyze Branch Name**
- Extract branch type and description
- Validate naming conventions
- Return structured metadata

**Detect Breaking Changes**
- Scan for explicit markers: `breaking:`, `BREAKING CHANGE:`
- Detect implicit patterns: API removal, deprecation removal
- Override version to MAJOR when breaking

**Map to Changelog**
- Determine category from branch type
- Calculate version bump impact
- Generate entry template

## Usage

```bash
node scripts/branch-context-mapper.cjs feature/oauth-auth
```

Returns:
```json
{
  "branchType": "feature",
  "category": "Added",
  "versionBump": "MINOR",
  "isBreaking": false
}
```

## Running Tests

```bash
npm test              # All tests
npm run test:jest     # Jest only
npm run test:jest -- --coverage  # With coverage
npm run test:bats     # BATS only
npm run test:watch    # Watch mode
```

## Test Coverage

- 20+ Jest unit tests (90%+ coverage target)
- 12+ BATS shell tests (100% pass rate)
- Total: 32 tests covering all branch types and edge cases

## Files

- `scripts/branch-context-mapper.cjs` - Core implementation
- `__tests__/branch-context-mapper.test.js` - Jest unit tests
- `tests/branch-context-mapper.bats` - BATS shell tests
- `prompts/` - Task-specific skill prompts
- `references/` - Branching strategy and semver rules

See README.md in each folder for details.
