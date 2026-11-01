# Prompt: Add Changelog Entries

Add multiple feature entries to an existing changelog's [Unreleased] section.

## Input

**New features:**
- Async/await support in handlers
- Custom middleware configuration  
- Improved error messages

**PR/Issue numbers:**
- #1089 (async support)
- #1090 (middleware)
- #1091 (error messages)

**Current CHANGELOG.md:**
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

Updated CHANGELOG.md with new entries added to [Unreleased]:

```markdown
# Changelog

## [Unreleased]

### Added
- Configuration file support
- Async/await support in handlers (#1089)
- Custom middleware configuration (#1090)
- Improved error messages (#1091)

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Key Points

- Add to existing [Unreleased] section, don't create new one
- Each entry on its own bullet point
- Reference PR numbers: `(#1234)`
- Keep similar items together
- Use third-person past tense: "Added", "Improved"
