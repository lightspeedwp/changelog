# Validate Changelog Format

**Task:** Check changelog compliance with Keep a Changelog 1.1.0

## Input

- CHANGELOG.md file

## Output

- Format validation result
- Quality score
- Governance status
- Error messages if any

## Success Criteria

- Valid Markdown structure
- Proper version headers
- Valid dates (ISO 8601)
- Category sections present
- Entries properly formatted

## Example

Input: `CHANGELOG.md`

Output:

```json
{
  "isValid": true,
  "score": 91,
  "readyForRelease": true
}
```
