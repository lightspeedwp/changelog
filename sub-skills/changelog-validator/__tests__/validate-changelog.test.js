const { validateChangelog } = require('../scripts/validate-changelog.cjs');
const fs = require('fs');
const path = require('path');
const os = require('os');

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

    test('should pass all governance checks for valid changelog', () => {
      const testFile = path.join(testDir, 'governance.md');
      const content = `# Changelog

## [Unreleased]

## [1.0.0] - 2026-10-30
### Added
- Feature (#1)

### Fixed
- Bug (#2)
`;
      fs.writeFileSync(testFile, content);
      const result = validateChangelog(testFile);
      expect(result.governance.immutability).toBe('pass');
      expect(result.governance.atomicity).toBe('pass');
      expect(result.governance.consistency).toBe('pass');
      expect(result.governance.completeness).toBe('pass');
      expect(result.governance.clarity).toBe('pass');
      expect(result.governance.traceability).toBe('pass');
    });
  });

  describe('Score Calculation', () => {
    test('should return score for valid changelog', () => {
      const testFile = path.join(testDir, 'score.md');
      fs.writeFileSync(testFile, '# Changelog\n## [1.0.0] - 2026-10-30\n### Added\n- Feature');
      const result = validateChangelog(testFile);
      expect(result.score).toBeGreaterThan(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    test('should return score of 0 for invalid changelog', () => {
      const testFile = path.join(testDir, 'invalid-score.md');
      fs.writeFileSync(testFile, 'No changelog here');
      const result = validateChangelog(testFile);
      expect(result.score).toBe(0);
    });
  });

  describe('Error Handling', () => {
    test('should handle missing file', () => {
      const result = validateChangelog('/path/that/does/not/exist.md');
      expect(result.isValid).toBe(false);
      expect(result.score).toBe(0);
      expect(result.errors).toContain('File not found: /path/that/does/not/exist.md');
    });

    test('should handle file read errors gracefully', () => {
      const testFile = path.join(testDir, 'error.md');
      fs.writeFileSync(testFile, '# Changelog');

      // Temporarily make file unreadable
      const originalRead = fs.readFileSync;
      fs.readFileSync = () => { throw new Error('Permission denied'); };

      const result = validateChangelog(testFile);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);

      // Restore original function
      fs.readFileSync = originalRead;
    });

    test('should handle missing version headers', () => {
      const testFile = path.join(testDir, 'no-version.md');
      fs.writeFileSync(testFile, '# Changelog\nSome content without version headers');
      const result = validateChangelog(testFile);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('No version headers found');
    });
  });

  describe('Release Readiness', () => {
    test('should indicate ready for release when valid', () => {
      const testFile = path.join(testDir, 'release.md');
      fs.writeFileSync(testFile, '# Changelog\n## [1.0.0] - 2026-10-30');
      const result = validateChangelog(testFile);
      expect(result.readyForRelease).toBe(true);
    });

    test('should indicate not ready for release when invalid', () => {
      const testFile = path.join(testDir, 'not-release.md');
      fs.writeFileSync(testFile, 'Just some text');
      const result = validateChangelog(testFile);
      expect(result.readyForRelease).toBe(false);
    });
  });

  describe('Module Exports', () => {
    test('should export validateChangelog function', () => {
      expect(typeof validateChangelog).toBe('function');
    });
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });
});
