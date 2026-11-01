# Prompt: Add Feature Entries to Changelog

You're releasing a new version with several features. Add these to your changelog's `[Unreleased]` section or create a version entry:

## Input

**Features to add:**
- Support for async/await in skill execution
- New `concurrency` configuration option  
- Improved error messages for better debugging

**PR Numbers:** #1089 (async/await and concurrency), #1090 (error messages)

**Your current CHANGELOG.md:**

```markdown
# Changelog

## [Unreleased]

### Added
- Configuration file support

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Expected Output

Entries added to `[Unreleased]` section under `Added`:

```markdown
# Changelog

## [Unreleased]

### Added
- Configuration file support
- Support for async/await in skill execution (#1089)
- New `concurrency` configuration option (#1089)
- Improved error messages for better debugging (#1090)

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Key Points

- Each entry gets its own bullet
- PR numbers go in parentheses at end
- Similar PRs can share one entry (like #1089 above)
- Order entries logically (related items together)
- Third-person past tense: "Added", "Improved"
