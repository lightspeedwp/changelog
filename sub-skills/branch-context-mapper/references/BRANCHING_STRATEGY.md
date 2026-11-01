# LightSpeed WP Branching Strategy

Branch naming convention: `{type}/{description}`

## Types

| Type     | Category | Version     | Purpose           |
| -------- | -------- | ----------- | ----------------- |
| feature  | Added    | MINOR       | New features      |
| fix      | Fixed    | PATCH       | Bug fixes         |
| security | Security | PATCH/MAJOR | Security patches  |
| docs     | -        | -           | Documentation     |
| refactor | Changed  | -           | Code improvements |
| test     | -        | -           | Tests             |
| chore    | -        | PATCH       | Maintenance       |

## Examples

- `feature/oauth-authentication`
- `fix/sidebar-width-bug`
- `security/xss-vulnerability-fix`
- `docs/api-documentation`
- `refactor/component-cleanup`
