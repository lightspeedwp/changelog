# Prompt: Create a New CHANGELOG.md

Create a new CHANGELOG.md file for a project following Keep a Changelog 1.1.0 standard.

## Input

**Project name:** My Project  
**Initial version:** 0.1.0  
**Current date:** 2026-10-30  

You need to create the initial CHANGELOG.md file structure.

## Expected Output

A valid CHANGELOG.md file with:
- Proper heading structure
- [Unreleased] section for future entries
- Initial version section [0.1.0] with date
- All necessary metadata

## Example Output

```markdown
# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added
- (placeholder for new features)

### Changed
- (placeholder for behavior changes)

### Fixed
- (placeholder for bug fixes)

### Removed
- (placeholder for removed features)

### Security
- (placeholder for security fixes)

---

## [0.1.0] - 2026-10-30

### Added
- Initial project setup
- Core functionality
```

## Key Points

- Include all standard categories even if initially empty
- Use consistent heading format: `## [VERSION] - DATE`
- Start with [Unreleased] for development
- Include horizontal rule before older versions
- Provide placeholders for future entries
