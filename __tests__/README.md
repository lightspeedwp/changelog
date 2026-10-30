# Jest Unit Tests

Unit tests for core functionality and logic.

## Purpose

Jest-based tests that verify:
- Individual function behavior
- Edge cases and error handling
- Return values and side effects
- Code coverage (90%+ target)

## Running Tests

```bash
# Run all Jest tests
npm run test:jest

# Run with coverage report
npm run test:jest -- --coverage

# Watch mode for development
npm run test:watch

# Run specific test file
jest __tests__/branch-context-mapper.test.js
```

## Test Structure

Each test file:
- Tests a specific module or function
- Includes setup and teardown
- Has descriptive test names
- Validates success and failure paths

## Coverage Requirements

- Lines: 90%+
- Functions: 90%+
- Branches: 90%+
- Statements: 90%+

Tests fail if coverage drops below 90%.

## Adding Tests

1. Create .test.js file in this directory
2. Follow Jest conventions
3. Use clear test descriptions
4. Test both success and error cases
5. Verify coverage with --coverage flag

## Test Patterns

Arrange-Act-Assert (AAA):
```javascript
test('should handle scenario', () => {
  // Arrange
  const input = {...};
  
  // Act
  const result = functionUnderTest(input);
  
  // Assert
  expect(result).toBe(expected);
});
```

---

See jest.config.js for Jest configuration.
