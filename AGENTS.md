# Agents Reference

This repository provides one parent Claude Code skill with two bundled sub-skills.

| Component               | Entrypoint                                             | Purpose                                                                |
| ----------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `ls-changelog`          | [SKILL.md](SKILL.md)                                   | Route changelog creation, editing, review, and release preparation     |
| `branch-context-mapper` | [Sub-skill](sub-skills/branch-context-mapper/SKILL.md) | Map branch context to changelog categories and version recommendations |
| `changelog-validator`   | [Sub-skill](sub-skills/changelog-validator/SKILL.md)   | Run basic checks and guide manual governance review                    |

Install the repository at `~/.claude/skills/ls-changelog/` and invoke `/ls-changelog`. The parent reads the relevant nested instructions; no separate sub-skill commands or globally installed branch-validation agent are required.

When maintaining these skills, preserve the root entrypoint and relative resource links. Keep documented helper capabilities aligned with executable behaviour. See [CLAUDE.md](CLAUDE.md) for repository development guidance.
