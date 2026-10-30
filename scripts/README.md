# Scripts

Shared utility scripts and implementation code.

## Purpose

Utility functions and helpers used across both sub-skills:
- Common validation functions
- Shared formatting utilities
- Reusable error handling
- Standard output formatting

## Organization

Each script should:
- Have a clear, single responsibility
- Include error handling
- Document expected inputs/outputs
- Support both CLI and module usage

## Testing Scripts

All scripts are tested via:
- Jest unit tests (__tests__/)
- BATS shell integration tests (tests/)
- 90%+ coverage requirement

## Adding New Scripts

1. Create in scripts/ folder
2. Document inputs and outputs
3. Add unit tests
4. Add BATS integration tests
5. Verify 90%+ coverage

---

See sub-skill directories for implementation details.
