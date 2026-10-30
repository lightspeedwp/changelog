#!/usr/bin/env bats

SCRIPT_PATH="$(cd "$(dirname "${BATS_TEST_FILENAME}")" && pwd)/../scripts/branch-context-mapper.cjs"

@test "should validate feature branch names" {
  result=$(node "$SCRIPT_PATH" feature/oauth-auth)
  [[ "$result" == *"feature"* ]]
}

@test "should validate fix branch names" {
  result=$(node "$SCRIPT_PATH" fix/sidebar-bug)
  [[ "$result" == *"fix"* ]]
}

@test "should reject invalid branch format" {
  run node "$SCRIPT_PATH" invalid-branch
  [ "$status" -ne 0 ]
}

@test "should require branch name argument" {
  run node "$SCRIPT_PATH"
  [ "$status" -ne 0 ]
}
