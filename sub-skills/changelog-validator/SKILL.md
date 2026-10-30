---
name: changelog-validator
description: |
  Validate CHANGELOG.md format and enforce governance rules. This skill validates that changelog files follow Keep a Changelog 1.1.0 standard, enforces LightSpeed WP governance rules (immutability, atomicity, consistency, completeness, clarity, traceability), calculates quality scores, and provides actionable error messages. Use this skill whenever you need to validate a changelog before merge, check governance compliance, audit changelog quality, or generate quality metrics for release readiness. Trigger whenever the user mentions changelog validation, governance enforcement, quality scoring, or release readiness checks.
compatibility: |
  - Requires: Node.js 18+ (for validation and scoring)
  - Optional: Git access for version history validation
---

# Changelog Validator

Validates changelog format and enforces 6 governance rules with quality scoring.

## Governance Rules

1. **Immutability** - Released versions cannot be modified
2. **Atomicity** - Each entry references exactly one PR/issue
3. **Consistency** - All entries follow format rules
4. **Completeness** - [Unreleased] empty in releases
5. **Clarity** - Entries meet quality thresholds (0-100 scoring)
6. **Traceability** - Every entry links to code change

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

## Quick Usage

```bash
node scripts/validate-changelog.cjs CHANGELOG.md --json
```

Returns validation report with score and governance status.
