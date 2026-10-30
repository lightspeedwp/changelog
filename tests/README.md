# BATS Shell Tests

End-to-end shell integration tests using BATS framework.

## Purpose

Shell-based tests that verify:
- CLI functionality
- Command-line interface behavior
- Exit codes and output
- Real-world usage scenarios

## Running Tests

```bash
# Run all BATS tests
npm run test:bats

# Run specific test file
bats tests/branch-context-mapper.bats

# Run with verbose output
bats --verbose tests/
```

## Test Structure

Each test:
- Sets up test environment
- Executes the command
- Validates output and exit code
- Cleans up

## Coverage Target

- 100% pass rate
- All major scenarios covered
- Edge cases included
- Real-world WordPress examples

## Adding Tests

1. Create .bats file in this directory
2. Follow BATS conventions
3. Use clear test names
4. Clean up after each test
5. Verify test passes locally

---

See .batsrc for BATS configuration.
