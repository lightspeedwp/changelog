const { validateChangelog } = require('../scripts/validate-changelog.cjs');
const fs = require('fs');
const path = require('path');

describe('Changelog Validator', () => {
  const testDir = path.join(__dirname, 'fixtures');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  describe('Format Compliance', () => {
    test('should validate proper changelog format', () => {
      const testFile = path.join(testDir, 'valid.md');
      const content = `# Changelog

## [1.0.0] - 2026-10-30

### Added
- New feature (#123)

### Fixed
- Bug fix (#124)
`;
      fs.writeFileSync(testFile, content);
      const result = validateChangelog(testFile);
      expect(result.isValid).toBe(true);
      expect(result.score).toBeGreaterThan(0);
    });

    test('should reject missing title', () => {
      const testFile = path.join(testDir, 'no-title.md');
      fs.writeFileSync(testFile, '## [1.0.0] - 2026-10-30\n### Added\n- Feature');
      const result = validateChangelog(testFile);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Governance Rules', () => {
    test('should check immutability rule', () => {
      const testFile = path.join(testDir, 'test.md');
      fs.writeFileSync(testFile, '# Changelog\n## [1.0.0] - 2026-10-30');
      const result = validateChangelog(testFile);
      expect(result.governance.immutability).toBe('pass');
    });

    test('should return governance status', () => {
      const testFile = path.join(testDir, 'test2.md');
      fs.writeFileSync(testFile, '# Changelog\n## [1.0.0] - 2026-10-30');
      const result = validateChangelog(testFile);
      expect(result.governance).toHaveProperty('atomicity');
      expect(result.governance).toHaveProperty('consistency');
      expect(result.governance).toHaveProperty('completeness');
      expect(result.governance).toHaveProperty('clarity');
      expect(result.governance).toHaveProperty('traceability');
    });
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });
});
