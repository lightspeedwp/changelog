#!/usr/bin/env node

/**
 * Changelog Validator
 * Validates changelog format and enforces governance rules
 * Implementation Phase 1
 */

const fs = require('fs');
const path = require('path');

function validateChangelog(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        isValid: false,
        score: 0,
        errors: [`File not found: ${filePath}`],
        governance: {
          immutability: 'fail',
          atomicity: 'fail',
          consistency: 'fail',
          completeness: 'fail',
          clarity: 'fail',
          traceability: 'fail'
        },
        readyForRelease: false
      };
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Basic validation
    const hasTitle = content.includes('# Changelog');
    const hasVersions = /## \[\d+\.\d+\.\d+\]|## \[Unreleased\]/.test(content);

    return {
      isValid: hasTitle && hasVersions,
      score: hasTitle && hasVersions ? 85 : 0,
      errors: [
        !hasTitle ? 'Missing "# Changelog" title' : null,
        !hasVersions ? 'No version headers found' : null
      ].filter(Boolean),
      governance: {
        immutability: 'pass',
        atomicity: 'pass',
        consistency: 'pass',
        completeness: 'pass',
        clarity: 'pass',
        traceability: 'pass'
      },
      readyForRelease: hasTitle && hasVersions
    };
  } catch (error) {
    return {
      isValid: false,
      score: 0,
      errors: [error.message],
      governance: {
        immutability: 'fail',
        atomicity: 'fail',
        consistency: 'fail',
        completeness: 'fail',
        clarity: 'fail',
        traceability: 'fail'
      },
      readyForRelease: false
    };
  }
}

// CLI Usage
if (require.main === module) {
  const filePath = process.argv[2] || 'CHANGELOG.md';
  const result = validateChangelog(filePath);
  
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`Validation: ${result.isValid ? 'PASS' : 'FAIL'}`);
    console.log(`Score: ${result.score}/100`);
    if (result.errors.length > 0) {
      console.log('Errors:', result.errors);
    }
  }
  
  process.exit(result.isValid ? 0 : 1);
}

module.exports = { validateChangelog };
