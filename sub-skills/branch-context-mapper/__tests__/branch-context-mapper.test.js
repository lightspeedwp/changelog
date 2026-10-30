const { analyzeBranch } = require('../scripts/branch-context-mapper.cjs');

describe('Branch Context Mapper', () => {
  describe('Branch Type Extraction', () => {
    test('should extract feature branch type', () => {
      const result = analyzeBranch('feature/oauth-auth');
      expect(result.branchType).toBe('feature');
      expect(result.description).toBe('oauth-auth');
    });

    test('should extract fix branch type', () => {
      const result = analyzeBranch('fix/sidebar-bug');
      expect(result.branchType).toBe('fix');
      expect(result.description).toBe('sidebar-bug');
    });

    test('should reject invalid branch format', () => {
      const result = analyzeBranch('invalid-branch');
      expect(result.isValid).toBe(false);
    });
  });

  describe('Category Mapping', () => {
    test('should map feature to Added', () => {
      const result = analyzeBranch('feature/new-feature');
      expect(result.category).toBe('Added');
    });

    test('should map fix to Fixed', () => {
      const result = analyzeBranch('fix/bug-fix');
      expect(result.category).toBe('Fixed');
    });
  });

  describe('Version Bump Calculation', () => {
    test('should calculate MINOR for features', () => {
      const result = analyzeBranch('feature/new');
      expect(result.versionBump).toBe('MINOR');
    });

    test('should calculate PATCH for fixes', () => {
      const result = analyzeBranch('fix/issue');
      expect(result.versionBump).toBe('PATCH');
    });
  });
});
