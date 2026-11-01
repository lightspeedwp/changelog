const { analyzeBranch, BRANCH_TYPES } = require('../scripts/branch-context-mapper.cjs');

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

    test('should calculate PATCH for security fixes', () => {
      const result = analyzeBranch('security/xss-fix');
      expect(result.versionBump).toBe('PATCH');
      expect(result.category).toBe('Security');
    });

    test('should have null version bump for docs', () => {
      const result = analyzeBranch('docs/readme');
      expect(result.versionBump).toBeNull();
      expect(result.category).toBeNull();
    });

    test('should have null version bump for refactor', () => {
      const result = analyzeBranch('refactor/cleanup');
      expect(result.versionBump).toBeNull();
      expect(result.category).toBe('Changed');
    });

    test('should have null version bump for test', () => {
      const result = analyzeBranch('test/new-tests');
      expect(result.versionBump).toBeNull();
      expect(result.category).toBeNull();
    });

    test('should calculate PATCH for chore', () => {
      const result = analyzeBranch('chore/deps');
      expect(result.versionBump).toBe('PATCH');
      expect(result.category).toBeNull();
    });
  });

  describe('Error Handling', () => {
    test('should reject null branch name', () => {
      const result = analyzeBranch(null);
      expect(result.isValid).toBe(false);
      expect(result.validationErrors).toContain('Branch name is required');
    });

    test('should reject empty branch name', () => {
      const result = analyzeBranch('');
      expect(result.isValid).toBe(false);
      expect(result.validationErrors).toContain('Branch name is required');
    });

    test('should reject branch without slash separator', () => {
      const result = analyzeBranch('featureoauth');
      expect(result.isValid).toBe(false);
      expect(result.validationErrors).toContain('Branch name must follow format: type/description');
    });

    test('should reject branch with multiple slashes', () => {
      const result = analyzeBranch('feature/oauth/auth');
      expect(result.isValid).toBe(false);
      expect(result.validationErrors).toContain('Branch name must follow format: type/description');
    });

    test('should reject unknown branch type', () => {
      const result = analyzeBranch('unknown/feature');
      expect(result.isValid).toBe(false);
      expect(result.validationErrors[0]).toContain('Unknown branch type');
    });
  });

  describe('Breaking Changes', () => {
    test('should detect non-breaking branches', () => {
      const result = analyzeBranch('feature/new-feature');
      expect(result.isBreaking).toBe(false);
    });
  });

  describe('Module Exports', () => {
    test('should export analyzeBranch function', () => {
      expect(typeof analyzeBranch).toBe('function');
    });

    test('should export BRANCH_TYPES mapping', () => {
      expect(BRANCH_TYPES).toBeDefined();
      expect(BRANCH_TYPES.feature).toBeDefined();
      expect(BRANCH_TYPES.fix).toBeDefined();
      expect(BRANCH_TYPES.security).toBeDefined();
      expect(BRANCH_TYPES.docs).toBeDefined();
      expect(BRANCH_TYPES.refactor).toBeDefined();
      expect(BRANCH_TYPES.test).toBeDefined();
      expect(BRANCH_TYPES.chore).toBeDefined();
    });

    test('should have correct branch type mappings', () => {
      expect(BRANCH_TYPES.feature.category).toBe('Added');
      expect(BRANCH_TYPES.feature.versionBump).toBe('MINOR');
      expect(BRANCH_TYPES.fix.category).toBe('Fixed');
      expect(BRANCH_TYPES.fix.versionBump).toBe('PATCH');
      expect(BRANCH_TYPES.security.category).toBe('Security');
      expect(BRANCH_TYPES.docs.category).toBeNull();
      expect(BRANCH_TYPES.refactor.category).toBe('Changed');
      expect(BRANCH_TYPES.refactor.versionBump).toBeNull();
    });
  });
});
