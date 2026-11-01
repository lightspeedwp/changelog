#!/usr/bin/env bats

SCRIPT_PATH="$(cd "$(dirname "${BATS_TEST_FILENAME}")" && pwd)/../scripts/validate-changelog.cjs"
TEST_DIR="${BATS_TMPDIR}/changelog-tests"

setup() {
  mkdir -p "$TEST_DIR"
}

@test "should validate proper changelog format" {
  cat > "$TEST_DIR/valid.md" << 'CONTENT'
# Changelog

## [1.0.0] - 2026-10-30

### Added
- New feature (#123)

### Fixed
- Bug fix (#124)
CONTENT
  result=$(node "$SCRIPT_PATH" "$TEST_DIR/valid.md" --json)
  [[ "$result" == *'"isValid": true'* ]]
}

@test "should reject missing title" {
  cat > "$TEST_DIR/no-title.md" << 'CONTENT'
## [1.0.0] - 2026-10-30

### Added
- Feature
CONTENT
  run node "$SCRIPT_PATH" "$TEST_DIR/no-title.md"
  [ "$status" -ne 0 ]
}

@test "should handle missing file" {
  run node "$SCRIPT_PATH" "$TEST_DIR/nonexistent.md"
  [ "$status" -ne 0 ]
}

teardown() {
  rm -rf "$TEST_DIR"
}
