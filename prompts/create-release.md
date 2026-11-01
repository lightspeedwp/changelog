# Prompt: Create a Release Version

Convert the [Unreleased] section to a versioned release with date and semantic version bump.

## Input

**Previous version:** 1.0.0  
**Release type:** Minor (new features)  
**New version:** 1.1.0  
**Release date:** 2026-10-30  

**Current CHANGELOG.md:**
```markdown
# Changelog

## [Unreleased]

### Added
- Async/await support (#1089)
- Custom middleware (#1090)

### Fixed
- Memory leak issue (#1091)

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Expected Output

Convert [Unreleased] to versioned release:

```markdown
# Changelog

## [Unreleased]

---

## [1.1.0] - 2026-10-30

### Added
- Async/await support (#1089)
- Custom middleware (#1090)

### Fixed
- Memory leak issue (#1091)

---

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Key Points

- Replace [Unreleased] with [VERSION] - DATE
- Create new [Unreleased] section at top
- Add horizontal rules for readability
- Keep versions in descending order (newest first)
- Bump version correctly per semver:
  - MAJOR (1.0.0 → 2.0.0) for breaking changes
  - MINOR (1.0.0 → 1.1.0) for new features
  - PATCH (1.0.0 → 1.0.1) for bug fixes only
