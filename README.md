# LightSpeed WP Changelog Automation

**Phase 1: Sub-Skills Implementation**

Production-ready changelog automation system for WordPress block themes and plugins.

## 🎯 Quick Start

```bash
# Install dependencies for both sub-skills
cd sub-skills/branch-context-mapper && npm install
cd ../changelog-validator && npm install

# Run tests
npm test

# Install git hooks
lefthook install
```

## 📦 Phase 1 Deliverables

### Sub-Skills

1. **branch-context-mapper** ([docs](sub-skills/branch-context-mapper/))
   - Maps branch types to changelog categories
   - Calculates semantic version bumps
   - Detects breaking changes
   - 32 tests (90%+ coverage)

2. **changelog-validator** ([docs](sub-skills/changelog-validator/))
   - Validates Keep a Changelog 1.1.0 format
   - Enforces 6 governance rules
   - Calculates quality scores (0-100)
   - 113+ tests (90%+ coverage)

### Integrated Git Hooks (Lefthook)

- ✅ Pre-commit: Branch naming validation
- ✅ Pre-commit: Changelog format check
- ✅ Pre-commit: Jest tests (90%+ coverage)
- ✅ Pre-commit: BATS tests (100% pass)
- ✅ Commit-msg: Branch-based commit format validation
- ✅ Pre-push: Final validation before push

## 📂 Directory Structure

```
changelog/
├── sub-skills/
│   ├── branch-context-mapper/        # Branch analysis sub-skill
│   │   ├── SKILL.md
│   │   ├── scripts/                  # Implementation
│   │   ├── __tests__/                # Jest tests
│   │   ├── tests/                    # BATS tests
│   │   ├── prompts/                  # Task prompts
│   │   └── references/               # Strategy docs
│   └── changelog-validator/          # Validation sub-skill
│       ├── SKILL.md
│       ├── scripts/                  # Implementation
│       ├── __tests__/                # Jest tests
│       ├── tests/                    # BATS tests
│       ├── prompts/                  # Task prompts
│       └── references/               # Governance docs
├── docs/                             # Architecture & workflow docs
├── prompts/                          # Shared prompt library
├── references/                       # Standards & rules
├── scripts/                          # Shared utilities
├── assets/                           # Design tokens, templates
├── lefthook.yaml                     # Git hooks configuration
└── README.md                         # This file
```

## 🚀 Usage

### Branch Context Mapper

Analyze a branch to determine changelog mapping:

```bash
cd sub-skills/branch-context-mapper
node scripts/branch-context-mapper.cjs feature/oauth-authentication
```

Returns:
```json
{
  "branchType": "feature",
  "category": "Added",
  "versionBump": "MINOR",
  "isBreaking": false
}
```

### Changelog Validator

Validate a changelog file:

```bash
cd sub-skills/changelog-validator
node scripts/validate-changelog.cjs ../../CHANGELOG.md --json
```

Returns:
```json
{
  "score": 91,
  "governance": {...},
  "readyForRelease": true
}
```

## 🧪 Testing

### Run All Tests

```bash
# Branch Context Mapper
cd sub-skills/branch-context-mapper
npm test

# Changelog Validator
cd sub-skills/changelog-validator
npm test
```

### Coverage Requirements

- **Jest:** 90%+ (lines, functions, branches, statements)
- **BATS:** 100% pass rate
- **Total:** 145+ test cases across both sub-skills

## 📋 Governance Rules

The changelog-validator enforces 6 core governance principles:

1. **Immutability** - Released versions cannot change
2. **Atomicity** - Each entry references single PR/issue
3. **Consistency** - All entries follow format rules
4. **Completeness** - [Unreleased] empty in releases
5. **Clarity** - Entries meet quality thresholds
6. **Traceability** - Every entry links to code

## 🔗 Git Hooks (Lefthook)

Configuration: `lefthook.yaml`

Hooks validate:
- Branch naming conventions
- Changelog format compliance
- Test coverage and pass rates
- Commit message format
- Pre-push validation

Install hooks:
```bash
lefthook install
```

Verify:
```bash
lefthook run pre-commit --all-files
```

## 📚 Documentation

- [Branch Context Mapper](sub-skills/branch-context-mapper/README.md)
- [Changelog Validator](sub-skills/changelog-validator/README.md)
- [Git Hooks Guide](docs/HOOKS_GUIDE.md)
- [Governance Rules](references/GOVERNANCE_RULES.md)
- [Architecture](docs/ARCHITECTURE.md)

## ✅ Quality Standards

All code meets:
- ✅ 90%+ Jest coverage (lines, functions, branches, statements)
- ✅ 100% BATS pass rate
- ✅ WordPress block theme/plugin specific examples
- ✅ Clear error messages with remediation
- ✅ Production-ready code
- ✅ Security reviewed

## 🔄 Workflow

```
1. Create branch (mapper validates naming)
   ↓
2. Add changelog entry (validator checks quality)
   ↓
3. PR review (validator scores entry)
   ↓
4. Release (validator confirms readiness)
   ↓
5. Deploy with confidence ✓
```

## 🤝 Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md)

Test-first development:
- Write failing test
- Implement to pass
- Verify coverage 90%+
- Commit and PR

## 📞 Support

- **Questions:** Check sub-skill README.md files
- **Issues:** GitHub Issues
- **Contributing:** See CONTRIBUTING.md

## 📄 License

MIT

---

**Phase 1 Status:** ✅ Production Ready  
**Created:** 2026-10-30  
**Repository:** https://github.com/lightspeedwp/changelog
