# Prompt: Create a Release Version

Convert your `[Unreleased]` section to a versioned release with a date and semantic version bump.

## Input

**Current version:** 1.0.0  
**Release type:** Minor (new feature)  
**Release date:** 2026-10-30  
**Current CHANGELOG.md:**

```markdown
# Changelog

## [Unreleased]

### Added
- Support for async/await in skill execution (#1089)
- New `concurrency` configuration option (#1089)

### Fixed
- Memory leak in startup (#1092)

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Expected Output

The `[Unreleased]` section becomes `[1.1.0] - 2026-10-30`, and a new empty `[Unreleased]` is created:

```markdown
# Changelog

## [Unreleased]

## [1.1.0] - 2026-10-30

### Added
- Support for async/await in skill execution (#1089)
- New `concurrency` configuration option (#1089)

### Fixed
- Memory leak in startup (#1092)

---

## [1.0.0] - 2026-09-18

### Added
- Initial release
```

## Key Points

- Version bumps: 1.0.0 → 1.1.0 (minor), 1.0.0 → 2.0.0 (major), 1.0.0 → 1.0.1 (patch)
- Date format: YYYY-MM-DD
- Create new `[Unreleased]` for future entries
- Add horizontal rule (`---`) before previous versions for readability
- Keep versions in descending order
