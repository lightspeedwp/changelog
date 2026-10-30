# Documentation

This directory contains documentation for the LightSpeed WP Changelog project.

## Quick Links

- **[Changelog Guidelines](./CHANGELOG_GUIDELINES.md)** — How to write good changelog entries and manage releases
- **[Branching Strategy](./BRANCHING_STRATEGY.md)** — Branch naming conventions and workflow
- **[Agent Documentation](../AGENTS.md)** — Available agents and their capabilities

## For Users

### Getting Started

1. Read [Changelog Guidelines](./CHANGELOG_GUIDELINES.md) — Overview of format and process
2. Review examples in the guidelines — Good and bad entries
3. Run validation on your changelog — Verify format compliance
4. Use the changelog skill — Create or maintain your CHANGELOG.md

### Common Tasks

**Add entries to a changelog:**
- See "Adding Entries During Development" in [Changelog Guidelines](./CHANGELOG_GUIDELINES.md)

**Create a release:**
- See "Creating a Release" in [Changelog Guidelines](./CHANGELOG_GUIDELINES.md)

**Validate your changelog:**
```bash
node ~/.claude/skills/changelog/scripts/validate-changelog.cjs CHANGELOG.md
```

**Check branch naming:**
- See [Branch Naming Rules](./BRANCHING_STRATEGY.md#naming-rules)

## For Developers

### Project Structure

```
changelog/
├── CHANGELOG.md              # Project changelog
├── AGENTS.md                 # Agent documentation
├── CLAUDE.md                 # Project instructions
├── docs/                     # This documentation
│   ├── README.md            # This file
│   ├── CHANGELOG_GUIDELINES.md
│   └── BRANCHING_STRATEGY.md
├── .specify/                # Speckit configuration
│   └── specs/
│       └── 001-changelog-agent-quality.md
└── ~/.claude/
    ├── skills/changelog/     # Changelog skill
    └── agents/               # Agent definitions
```

### Adding Documentation

1. Create new file in `docs/`
2. Link it from this README
3. Update table of contents if needed
4. Commit with changelog entry

### Updating Specs

1. Edit `.specify/specs/XXX-*.md`
2. Update version and date
3. Add to revision history
4. Commit with changelog entry

## Resources

### External Standards

- [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) — Official changelog standard
- [Semantic Versioning](https://semver.org/) — Version numbering rules

### LightSpeed WP Standards

- [Branch Naming](../AGENTS.md#branch-validation-agent) — Naming conventions
- [Changelog Format](../references/CHANGELOG_FORMAT.md) — Organization format

### Tools

- [Validation Script](~/.claude/skills/changelog/scripts/validate-changelog.cjs) — Automated validation
- [Changelog Skill](~/.claude/skills/changelog/SKILL.md) — Skill definition

## Troubleshooting

### My changelog doesn't validate

1. Run the validation script:
   ```bash
   node ~/.claude/skills/changelog/scripts/validate-changelog.cjs CHANGELOG.md
   ```
2. Check error messages
3. Reference [Validation Rules](../references/VALIDATION_RULES.md)
4. Review examples in [Changelog Guidelines](./CHANGELOG_GUIDELINES.md)

### I don't know how to format entries

1. Read "Writing Good Changelog Entries" in [Changelog Guidelines](./CHANGELOG_GUIDELINES.md)
2. Look at examples (✅ Good Examples section)
3. Check similar projects' changelogs
4. Ask on Slack or create an issue

### Version numbering is confusing

1. Read [Semantic Versioning](https://semver.org/)
2. See "Semantic Versioning" in [Changelog Guidelines](./CHANGELOG_GUIDELINES.md)
3. Review "When to Bump" table in guidelines

## Contributing

To contribute to documentation:

1. Fork the repository
2. Create a branch: `docs/your-topic`
3. Make changes
4. Run validation: `node scripts/validate-changelog.cjs CHANGELOG.md`
5. Create a pull request
6. Reference your changes in CHANGELOG.md

## Questions?

- Check the [FAQ](./CHANGELOG_GUIDELINES.md#faq) in Guidelines
- Read [Validation Rules](../references/VALIDATION_RULES.md)
- Create an issue on GitHub
- Ask on Slack

---

**Last updated:** 2026-10-30  
**Maintained by:** LightSpeed WP Team
