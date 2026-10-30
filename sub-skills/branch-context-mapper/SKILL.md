---
name: branch-context-mapper
description: |
  Analyze git branch names and determine changelog categories, semantic version bumps, and breaking changes. This skill validates branch naming against LightSpeed WP conventions (feature/, fix/, security/, docs/, refactor/, test/, chore/) and maps each to changelog categories (Added, Fixed, Security, Changed) and semantic version impacts (MAJOR/MINOR/PATCH). Use this skill whenever: a user creates or reviews a git branch and needs to know what changelog category it maps to, they're planning a release and need to calculate version bumps from branch types, they want to validate branch names follow team conventions, they need to detect breaking changes that should trigger a MAJOR version bump, they're building automation to map branches to release notes, or they're auditing a project's branching strategy for consistency. Trigger on: "branch naming", "changelog mapping", "version bump", "branch analysis", "breaking change detection", "semantic versioning", "release strategy", "git branch", "branch type", "changelog category", or when a user discusses how to correlate branch names with changelog entries and release notes.
compatibility: |
  - Requires: Node.js 18+ (for running validation and parsing)
  - Optional: Git repository access for real branch metadata
  - Works with: LightSpeed WP branch naming conventions, semantic versioning 2.0.0, Keep a Changelog 1.1.0
---

# Branch Context Mapper

Extract branch metadata from git branch names and map to changelog categories, version bumps, and breaking changes for LightSpeed WP and WordPress block themes/plugins.

## Input Schema

```json
{
  "branchName": "string (required) - git branch name, e.g., 'feature/oauth-auth' or 'security/xss-fix'",
  "commitMessage": "string (optional) - commit body to detect breaking changes via BREAKING CHANGE: marker",
  "validateOnly": "boolean (optional) - if true, only validate naming without mapping (default: false)"
}
```

## Output Schema

```json
{
  "valid": "boolean - whether branch name follows conventions",
  "branchType": "string - one of: feature, fix, security, docs, refactor, test, chore, breaking",
  "category": "string - changelog category or null if no changelog entry",
  "versionBump": "string - MAJOR, MINOR, or PATCH, or null if no version impact",
  "isBreaking": "boolean - whether this is a breaking change (triggers MAJOR bump)",
  "breakingDescription": "string (if isBreaking=true) - what's breaking",
  "error": "string (if valid=false) - why validation failed and how to fix it",
  "examples": "object - example changelog entry for this branch type"
}
```

## Branch Type Reference

| Branch Type | Category | Version Bump | Changelog | Use Case |
|------------|----------|--------------|-----------|----------|
| `feature/` | Added | MINOR | ✅ Yes | New features or functionality |
| `fix/` | Fixed | PATCH | ✅ Yes | Bug fixes and corrections |
| `security/` | Security | PATCH* | ✅ Yes | Security vulnerabilities |
| `docs/` | (none) | (none) | ❌ No | Documentation updates |
| `refactor/` | (none) | (none) | ❌ No | Code refactoring (no functionality change) |
| `test/` | (none) | (none) | ❌ No | Test additions/updates |
| `chore/` | (none) | PATCH | ⚠️ Optional | Dependency updates, tooling |
| `breaking:` | Changed | **MAJOR** | ✅ Yes | Breaking API/behavior changes |

*Security issues can trigger MAJOR if breaking changes are involved

## Error Handling

The skill provides clear, actionable error messages when validation fails:

**Invalid branch name:**
```
Error: Branch name does not match LightSpeed WP conventions
Expected format: <type>/<description> or <type>(<scope>)/<description>
Valid types: feature, fix, security, docs, refactor, test, chore, or prefix with breaking:

Example: feature/oauth-authentication
Example: security(block-gallery)/xss-fix
Example: breaking:api-v2-migration
```

**Ambiguous breaking changes:**
```
Warning: Branch contains 'breaking' but no explicit marker detected
Include in commit message: BREAKING CHANGE: <description>
Or rename branch to: breaking:feature-name
```

**Version bump conflicts:**
```
Warning: Security branch with breaking changes detected
Recommending MAJOR version bump instead of PATCH
Reason: Breaking changes require MAJOR version regardless of branch type
```

## Core Functions

**Analyze Branch Name**
- Extract branch type (feature, fix, security, docs, refactor, test, chore, breaking)
- Parse scope (optional, e.g., `feature(blocks)/gallery-lightbox`)
- Validate naming conventions against LightSpeed WP standards
- Return structured metadata with category and version impact

**Detect Breaking Changes**
- Scan for explicit markers: `breaking:` prefix, `BREAKING CHANGE:` in commits
- Validate breaking change description is present and clear
- Override version to MAJOR when breaking detected
- Provide detailed breaking change description

**Map to Changelog**
- Determine changelog category from branch type (Added, Fixed, Security, Changed)
- Calculate semantic version bump impact (MAJOR, MINOR, PATCH, none)
- Generate entry template with proper formatting
- Suggest PR/issue linking format

## Real-World Examples

### WordPress Block Theme: Feature Branch

**Branch:** `feature/hero-block-parallax`
```json
{
  "valid": true,
  "branchType": "feature",
  "category": "Added",
  "versionBump": "MINOR",
  "isBreaking": false,
  "examples": {
    "changelogEntry": "- Hero block now supports parallax scrolling effect with configurable intensity ([#42](https://github.com/lightspeedwp/my-theme/pull/42))"
  }
}
```

### WooCommerce Plugin: Security Fix

**Branch:** `security/checkout-form-xss`
```json
{
  "valid": true,
  "branchType": "security",
  "category": "Security",
  "versionBump": "PATCH",
  "isBreaking": false,
  "examples": {
    "changelogEntry": "- Fixed XSS vulnerability in checkout form input sanitization ([#89](https://github.com/lightspeedwp/my-plugin/pull/89))"
  }
}
```

### Block Plugin: Breaking Change

**Branch:** `breaking:block-registration-api-v2`
```json
{
  "valid": true,
  "branchType": "breaking",
  "category": "Changed",
  "versionBump": "MAJOR",
  "isBreaking": true,
  "breakingDescription": "Block registration API changed from registerBlockType() to registerBlock()",
  "examples": {
    "changelogEntry": "### BREAKING\n- Block registration API has been refactored from `registerBlockType()` to `registerBlock()` with improved TypeScript support. Update all blocks accordingly. ([#156](https://github.com/lightspeedwp/my-blocks/pull/156))"
  }
}
```

## Usage

```bash
# Analyze a single branch
node scripts/branch-context-mapper.cjs feature/oauth-auth

# Validate without mapping
node scripts/branch-context-mapper.cjs breaking:api-changes --validate-only

# With breaking change detection from commit
node scripts/branch-context-mapper.cjs security/token-fix --commit-message "BREAKING CHANGE: JWT tokens no longer accepted"
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
