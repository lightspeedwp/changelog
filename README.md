# LightSpeed WP Changelog Automation

**Production-ready changelog automation system for WordPress block themes and plugins**

Enforce consistent, high-quality changelogs across LightSpeed WP projects through automated branch validation, changelog entry validation, and governance rule enforcement. Fully aligned with org-wide branching strategy and changelog standards.

**Status:** ✅ Phase 1 Complete | 🔧 Phase 2 In Planning | 📋 Spec-Kit Integrated

---

## 📖 Documentation Guide

**New to this project?** Start here:
- 🚀 [Team Onboarding](docs/TEAM_ONBOARDING.md) — Setup, concepts, and workflows
- 📊 [Phase 2 Roadmap](docs/PHASE_2_ROADMAP.md) — Implementation plan and timeline

**Managing this project?** Read these:
- 🏛️ [CLAUDE.md](CLAUDE.md) — Project instructions and principles
- 🤖 [AGENTS.md](AGENTS.md) — Agent definitions and automation
- ⚙️ Spec-Kit Constitution (via `/speckit-constitution` skill)

**Deep dives:**
- 🔀 [Branch Context Mapper](sub-skills/branch-context-mapper/SKILL.md) — Branch type analysis
- ✅ [Changelog Validator](sub-skills/changelog-validator/SKILL.md) — Format and governance validation

---

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

## 🏛️ Governance & Org-Wide Standards

### Phase 1: Core Governance (6 Rules)

The changelog-validator enforces:
1. **Immutability** - Released versions cannot change
2. **Atomicity** - Each entry references single PR/issue
3. **Consistency** - All entries follow format rules
4. **Completeness** - [Unreleased] empty in releases
5. **Clarity** - Entries meet quality thresholds (0-100 scoring)
6. **Traceability** - Every entry links to code

### Alignment with LightSpeed WP Org-Wide Standards

This project enforces the organization's canonical standards:
- **24 branch types** with automated label routing (see [Org Branching Strategy](https://github.com/lightspeedwp/.github/blob/develop/docs/BRANCHING_STRATEGY.md))
- **20 changelog validation rules** (R001-R020) with error/warning severity levels
- **6 changelog categories**: feature, fix, improvement, breaking-change, security, performance
- **Forbidden branch prefixes**: claude, copilot, openai
- **PR template routing** based on branch type
- **Branch protection** rules for main branch (squash-merge only, require reviews, etc.)

**Note:** Phase 1 implements 6 core rules. Phase 2 will expand to all 20 org-wide rules and 24 branch types.

See [Org-Wide Standards Analysis](docs/ORG_STANDARDS.md) for complete details.

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

## 📚 Key Documentation

### For Developers
- [Branch Context Mapper](sub-skills/branch-context-mapper/SKILL.md) — Branch type analysis and mapping
- [Changelog Validator](sub-skills/changelog-validator/SKILL.md) — Format and quality validation
- [Team Onboarding Guide](docs/TEAM_ONBOARDING.md) — Setup and workflows

### For Project Planning
- [Phase 2 Roadmap](docs/PHASE_2_ROADMAP.md) — 8-12 week implementation plan with tasks and timelines
- [Org-Wide Standards](docs/ORG_STANDARDS.md) — Alignment with LightSpeed WP canonical rules

### For Maintainers
- [CLAUDE.md](CLAUDE.md) — Project instructions and best practices
- [AGENTS.md](AGENTS.md) — Agent definitions
- Spec-Kit Constitution — Run `/speckit-constitution` in Claude Code

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

### Development Workflow

1. **Create branch** following LightSpeed WP conventions: `feature/`, `fix/`, `security/`, `docs/`, etc.
2. **Make changes** with test-first development (write failing test → implement → verify 90%+ coverage)
3. **Validate locally** with `npm test` (Jest + BATS)
4. **Commit** with meaningful messages (lefthook validates format automatically)
5. **Open PR** with branch type routing to correct template
6. **Update changelog** entry in [Unreleased] section

For detailed guidance, see [TEAM_ONBOARDING.md](docs/TEAM_ONBOARDING.md#contributing).

### Test Requirements

- **Jest:** 90%+ coverage (lines, functions, branches, statements)
- **BATS:** 100% pass rate
- **Total:** 145+ test cases across both sub-skills

## 📞 Support & Issues

- **Getting started:** [Team Onboarding](docs/TEAM_ONBOARDING.md)
- **Questions about sub-skills:** Check [SKILL.md](sub-skills/branch-context-mapper/SKILL.md) files
- **Report issues:** [GitHub Issues](https://github.com/lightspeedwp/changelog/issues)
- **Project questions:** See [CLAUDE.md](CLAUDE.md)

## ⚙️ Spec-Kit Integration

This project uses GitHub's **Spec Kit** for specification-driven development:

```bash
# Available in Claude Code:
/speckit-constitution      # Establish project principles
/speckit-specify          # Create baseline specification
/speckit-plan             # Create implementation plan
/speckit-tasks            # Generate actionable tasks
/speckit-implement        # Execute implementation
/speckit-converge         # Assess codebase & append remaining work

# Optional enhancements:
/speckit-clarify          # De-risk ambiguous areas
/speckit-analyze          # Cross-artifact consistency
/speckit-checklist        # Generate quality checklists
```

**Project specs:** `.specify/specs/001-changelog-agent-quality.md`

---

## 📄 License

MIT

---

**Phase 1 Status:** ✅ Production Ready (26 files, 1,327+ insertions)  
**Spec-Kit Status:** ✅ Installed (v1.2.5 with Claude integration)  
**Last Updated:** 2026-10-31  
**Repository:** https://github.com/lightspeedwp/changelog  
**Org Standards:** ✅ Aligned (24 branch types, 20 changelog rules)
