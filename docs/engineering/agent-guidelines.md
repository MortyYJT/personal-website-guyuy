# Detailed agent guidelines

This document expands the root `AGENTS.md`. Read the relevant sections before the tasks listed there; do not load unrelated sections for routine changes. If instructions conflict, follow higher-priority instructions and the user's explicit scope.

## Judgment and evidence

- Before acting, check for false premises, logical gaps, and missing information. Resolve what you can from reliable sources; ask only when the missing answer materially affects correctness, scope, or an irreversible choice. Continue independent work while waiting.
- Exercise independent judgment. Distinguish verified facts, inferences, predictions, and subjective preferences when the distinction matters; do not agree merely to please the user.
- Verify material claims about numbers, people, and outcomes against primary sources where practical. Prefer current source code, tests, logs, and live pages over README claims, memory, or search snippets. State uncertainty and verification limits; never invent metrics, credentials, experience, or results.
- If a user premise is wrong, say so directly and respectfully. Explain the evidence, practical risk, and a better interpretation or alternative. Call out overlooked variables, costs, tradeoffs, and biases that could change the decision, without adding hypothetical warnings to routine work.

## Identity and privacy

- Identify the owner only as `MortyYJT` or `谷鱼Y`. Do not add the owner's real name to repository files, UI, metadata, assets, filenames, sample data, documentation, or commit messages and author/committer fields.
- Use repository-local Git identity with `MortyYJT` and the verified GitHub noreply address for that account. Check author/committer attribution before publishing; do not change global Git settings or rewrite pushed history to repair attribution.
- Review imported resumes, screenshots, documents, and generated artifacts for identity leaks. Never commit secrets, `.env` files, private contact details, or identifying local filesystem paths. Use public profile details only within the approved scope.

## Communication and documentation

- Discuss work with the user in Chinese. Keep this file, README, engineering documentation, source comments, and docstrings in English; put Chinese planning and learning records in `note/`. Preserve intended Chinese UI copy and bilingual content.
- Record meaningful decisions, milestone evidence, and unresolved issues in `note/` as work progresses. Keep notes concise and free of private identity details.
- Report what changed, why, and how it was verified. Separate code, local build, browser behavior, CI, and deployment status; label anything not run or not verified plainly. Lead with the result and any action actually required from the user.

## Scope and implementation

- For architectural work, follow the agreed design, written specification, implementation plan, and review stages. Respect explicit workflow exceptions the user grants; do not infer new exceptions or add approval gates for routine, reversible work already authorized.
- Use Next.js as the web framework and TypeScript with strict checking for application code, including server code when needed. Use `.tsx` for JSX and `.ts` elsewhere; keep CSS, JSON, Markdown, and workflow files in their native formats. Confirm dependency versions and APIs against current documentation.
- Keep the first version focused on the approved personal website. Prefer static content and small reusable components; add APIs, persistence, authentication, services, or dependencies only for a concrete requirement. TypeScript types do not replace runtime validation of untrusted input.
- Reproduce the approved reference layout and interactions using the owner's own content. Check licensing before importing third-party code or assets, preserve required notices, and never copy someone else's biography or achievements into the owner's profile.

## Git and changes

- Inspect status, branch, HEAD, and remotes before changing repository state. Preserve unrelated user work. Use `codex/` branches and reviewable pull requests; the user merges into `main`. A new-repository bootstrap on `main` requires explicit authorization.
- Use `type(scope): imperative summary`, followed by a blank line and a non-empty English `- ` bullet body. Use `feat(ui)` or `fix(ui)` for UI changes; reserve `style` for formatting only. Run `git diff --cached --check` before committing.
- Treat committing, pushing, production release, merging, and irreversible deletion as separate actions. Proceed when the session clearly authorizes the action; otherwise prepare a concrete reviewable result first and explain the specific missing authorization. Do not request the same permission again.

## Verification and deployment

- Verify behavior with checks appropriate to the change. Use meaningful tests for logic, data handling, and server behavior; avoid tests that merely restate implementation. Validate visual changes in a real browser, including narrow and wide layouts, navigation, language persistence, theme, keyboard access, and reduced motion where applicable.
- Run the configured lint, typecheck, relevant tests, and production build before declaring product code ready. Report skipped or unavailable checks and their practical limits; document-only changes need content and diff checks, not application test runs.
- Before changing Vercel state, confirm the account, project, repository, branch, framework, root directory, and intended environment. A local build, manual deployment, or successful CI run alone does not prove automatic deployment works. Verify a real Git-triggered deployment and the resulting production URL before claiming CD is fixed.
- For destructive actions, confirm the exact target at the required final step. Prefer the reversible action that satisfies the request, such as disconnecting an obsolete Git deployment source before deciding whether to delete the project.
