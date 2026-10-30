---
name: changelog-validator
description: |
  Validate CHANGELOG.md format, enforce governance rules, and score quality for WordPress block themes and plugins. This skill validates Keep a Changelog 1.1.0 compliance, enforces 6 LightSpeed WP governance rules (immutability, atomicity, consistency, completeness, clarity, traceability), calculates quality scores (0-100), detects governance violations, and confirms release readiness. Use this skill whenever: a developer opens a PR with changelog updates and needs quality validation, a release manager wants to confirm the changelog is ready to ship, a team needs to audit changelog quality and compliance across versions, governance rule violations need to be identified and fixed, a changelog quality score is needed for release gates, or a changelog entry's traceability and completeness must be verified. Trigger on: "changelog validation", "governance enforcement", "quality scoring", "release readiness", "changelog compliance", "changelog audit", "changelog review", "merge check", "quality score", "governance rules", "changelog entry", "traceability check", or when discussing whether a changelog is ready for release.
compatibility: |
  - Requires: Node.js 18+ (for validation and scoring)
  - Optional: Git access for version history and immutability checks
  - Works with: Keep a Changelog 1.1.0, Semantic Versioning 2.0.0, LightSpeed WP governance rules
---

# Changelog Validator

Validate changelog format, enforce 6 governance rules, calculate quality scores, and determine release readiness for WordPress projects.

## Input Schema

```json
{
  "changelogPath": "string (required) - path to CHANGELOG.md file",
  "format": "string (optional) - 'json' for machine-readable output, 'text' for human-readable (default: 'text')",
  "validateOnly": "boolean (optional) - if true, check format only (skip governance)",
  "ignoreRules": "array (optional) - rules to skip, e.g., ['immutability', 'traceability']",
  "releaseVersion": "string (optional) - version being released, for completeness check"
}
```

## Output Schema

```json
{
  "valid": "boolean - whether changelog passes validation",
  "score": "number (0-100) - overall quality score",
  "readyForRelease": "boolean - can this be released as-is",
  "governance": {
    "immutability": { "passed": "boolean", "violations": ["array of failures"] },
    "atomicity": { "passed": "boolean", "violations": ["array of failures"] },
    "consistency": { "passed": "boolean", "violations": ["array of failures"] },
    "completeness": { "passed": "boolean", "violations": ["array of failures"] },
    "clarity": { "passed": "boolean", "violations": ["array of failures"] },
    "traceability": { "passed": "boolean", "violations": ["array of failures"] }
  },
  "scoringFactors": {
    "length": "number - 0-10, based on description length",
    "clarity": "number - 0-15, based on action verbs and context",
    "completeness": "number - 0-10, based on PR/issue links",
    "format": "number - 0-10, based on markdown compliance",
    "specificity": "number - 0-5, based on technical details"
  },
  "issues": [
    { "rule": "string", "message": "string", "remediation": "string", "severity": "error|warning" }
  ],
  "nextVersion": "string (if readyForRelease) - recommended next semantic version"
}
```

## Governance Rules Explained

1. **Immutability** - Released versions cannot be modified
   - ✅ Do: Add new entries to [Unreleased]
   - ❌ Don't: Edit past release entries (e.g., v1.0.0)
   - Remediation: Only modify unreleased entries; create new version when releasing

2. **Atomicity** - Each entry references exactly one PR/issue
   - ✅ Do: `- Added OAuth support ([#42](...))`
   - ❌ Don't: `- Added OAuth and fixed bugs ([#42](...))`
   - Remediation: Split multi-topic entries into separate line items

3. **Consistency** - All entries follow format rules
   - ✅ Do: Follow Keep a Changelog 1.1.0 structure
   - ❌ Don't: Mix formats, use non-standard categories
   - Remediation: Use standard categories (Added, Changed, Deprecated, Removed, Fixed, Security)

4. **Completeness** - [Unreleased] section must be empty before release
   - ✅ Do: Move all entries to version section before tagging
   - ❌ Don't: Release with entries still in [Unreleased]
   - Remediation: Create version section and move unreleased entries before release commit

5. **Clarity** - Entries meet quality thresholds (score 90+)
   - ✅ Do: Describe what changed and why, use action verbs
   - ❌ Don't: Vague entries like "Fixed stuff" or "Updates"
   - Remediation: Expand description, add context, explain impact

6. **Traceability** - Every entry links to code change
   - ✅ Do: Include PR/issue link in every entry: `([#123](...))` or `([#123, #124](...))`
   - ❌ Don't: Leave entries without references
   - Remediation: Add GitHub PR or issue reference in parentheses

## Quality Scoring

Each changelog receives scores:

| Level | Score | Status | Action |
|-------|-------|--------|--------|
| Excellent | 90-100 | Ready for release | Merge immediately |
| Good | 85-89 | Ready with notes | Review suggestions |
| Fair | 80-84 | Address issues | Fix before merge |
| Poor | 70-79 | Significant issues | Major work needed |
| Unacceptable | <70 | Cannot merge | Rewrite required |

## Running Tests

```bash
npm test              # All tests
npm run test:jest     # Jest only
npm run test:jest -- --coverage  # With coverage
npm run test:bats     # BATS only
npm run test:watch    # Watch mode
```

## Test Coverage

- 40+ existing Jest unit tests (format compliance)
- 15+ new Jest tests (governance rules)
- 5+ new Jest tests (quality scoring)
- 10+ new Jest tests (integration)
- 30+ existing BATS tests
- 8+ new BATS tests (governance)
- 5+ new BATS tests (integration)
- Total: 113+ tests, 90%+ coverage target

## Files

- `scripts/validate-changelog.cjs` - Core validation + governance
- `__tests__/` - Jest unit tests (multiple files)
- `tests/` - BATS shell tests (multiple files)
- `prompts/` - Task-specific skill prompts
- `references/` - Governance rules, quality scoring

See README.md in each folder for details.

## Real-World Examples

### WordPress Block Theme Release (✅ Pass - Ready)

**Input:** `CHANGELOG.md` for hero-block-theme v1.2.0

```bash
node scripts/validate-changelog.cjs CHANGELOG.md --json
```

**Output:**
```json
{
  "valid": true,
  "score": 94,
  "readyForRelease": true,
  "governance": {
    "immutability": { "passed": true },
    "atomicity": { "passed": true },
    "consistency": { "passed": true },
    "completeness": { "passed": true },
    "clarity": { "passed": true },
    "traceability": { "passed": true }
  },
  "nextVersion": "1.2.0",
  "issues": []
}
```

### WooCommerce Plugin PR (⚠️ Warning - Fix Issues)

**Input:** `CHANGELOG.md` in a pull request

```bash
node scripts/validate-changelog.cjs CHANGELOG.md --json
```

**Output:**
```json
{
  "valid": false,
  "score": 72,
  "readyForRelease": false,
  "governance": {
    "clarity": {
      "passed": false,
      "violations": [
        {
          "entry": "Fixed bug in checkout form validation",
          "issue": "Description too vague, no context provided",
          "remediation": "Describe what was broken and how it's now fixed. Example: 'Fixed XSS vulnerability in checkout form email validation that allowed script injection'"
        }
      ]
    },
    "traceability": {
      "passed": false,
      "violations": [
        {
          "entry": "Improved performance on product pages",
          "issue": "No PR or issue link found",
          "remediation": "Add reference: ([#123](https://github.com/repo/pull/123))"
        }
      ]
    }
  },
  "issues": [
    {
      "rule": "clarity",
      "message": "3 entries have clarity scores below 80",
      "severity": "error"
    },
    {
      "rule": "traceability",
      "message": "2 entries missing PR/issue links",
      "severity": "error"
    }
  ]
}
```

### Block Plugin Pre-Release Audit (✅ Pass with Recommendations)

**Input:** `CHANGELOG.md` before releasing v2.0.0

```bash
node scripts/validate-changelog.cjs CHANGELOG.md --release-version 2.0.0 --json
```

**Output:**
```json
{
  "valid": true,
  "score": 91,
  "readyForRelease": true,
  "governance": {
    "all": { "passed": true }
  },
  "issues": [
    {
      "rule": "clarity",
      "message": "1 entry has clarity score of 85 (below ideal 90)",
      "severity": "warning",
      "remediation": "Consider: 'Added block registration API v2 with improved TypeScript support, replacing registerBlockType() with registerBlock() for better developer experience'"
    }
  ],
  "nextVersion": "2.0.0"
}
```

## CLI Usage

```bash
# Validate and show human-readable output
node scripts/validate-changelog.cjs CHANGELOG.md

# Validate in JSON format for automation
node scripts/validate-changelog.cjs CHANGELOG.md --json

# Validate specific rule only
node scripts/validate-changelog.cjs CHANGELOG.md --rule clarity

# Validate for release (check [Unreleased] is empty)
node scripts/validate-changelog.cjs CHANGELOG.md --release-version 1.5.0

# Get score only
node scripts/validate-changelog.cjs CHANGELOG.md --score-only
```
