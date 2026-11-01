# Prompt: Validate Changelog Format

Validate a CHANGELOG.md file and report any format issues.

## Input

**File:** CHANGELOG.md  

You need to check if the changelog follows Keep a Changelog 1.1.0 format and LightSpeed WP standards.

## Expected Output

**If valid:**
```
✓ Changelog validation passed
✓ All versions are properly formatted
✓ Dates are in ISO 8601 format (YYYY-MM-DD)
✓ All entries follow standard format
✓ Ready to merge
```

**If invalid:**
```
✗ Validation failed

Errors:
  ✗ Version [v1.0.0] uses 'v' prefix (expected semver format)
  ✗ Version [1.1.0] missing date (expected YYYY-MM-DD)
  ✗ [Unreleased] has a date (should not)

Warnings:
  ⚠ Entry "Fixed bug" missing PR reference (expected #1234)
  ⚠ Entry exceeds 100 characters (113 chars)
```

## Checks Performed

**Automated (Required):**
- Proper Markdown parsing
- Valid semver versions (MAJOR.MINOR.PATCH) or [Unreleased]
- ISO 8601 dates (YYYY-MM-DD) on released versions
- [Unreleased] has no date

**Manual (Best Practices):**
- All entries have PR/issue references
- No entry exceeds 100 characters
- Entries use third-person past tense
- Categories are in correct order
- Versions are in descending order
- No empty sections in released versions

## Key Points

- Validation blocks merge if required checks fail
- Warnings don't block, but should be addressed
- Run before committing or pushing
- Fix issues before releasing
- Validate format with: `node scripts/validate-changelog.cjs CHANGELOG.md`
