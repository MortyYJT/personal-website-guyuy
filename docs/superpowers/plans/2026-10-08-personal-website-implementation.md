# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended by the workflow) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a fresh, pseudonymous personal website that closely follows the current reference site's visual design and supports reliable Git-triggered deployment.

**Architecture:** One Next.js App Router application with typed local bilingual content. A shared shell owns navigation and persistent language/theme preferences; small page sections consume that content. Static content requires no API, database, or authentication.

**Tech Stack:** Next.js, React, strict TypeScript, Tailwind CSS, npm, Node.js 24, Node's built-in test runner, GitHub Actions, Vercel Git integration.

**Spec:** [Approved design](../specs/2026-10-08-personal-website-design.md).

**Status:** Local implementation and independent review complete; publication Task 6 authorized and in progress. See the milestone note for browser testing boundaries.

## Global Constraints

- Repository: `personal-website-guyuy`; new history, no old website code.
- Owner identity: `MortyYJT` / `谷鱼Y`; never publish the owner's real name, private contact data, or identifying local paths.
- Routes: `/`, `/resume`, `/experience/projects`; no empty experience pages or fake downloads.
- Default preferences: Chinese and dark; persist explicit choices across navigation and reloads.
- Desktop content width: approximately 680–760 CSS pixels; mobile gutter at least 16 pixels.
- Browser acceptance widths: 375, 768, and 1440 CSS pixels.
- Static local content; no database, authentication, CMS, contact backend, analytics, or new API without an actual requirement.
- Use self-hosted or system fonts; builds must not fetch remote fonts.
- Preserve existing `AGENTS.md`, detailed guidelines, design, and `note/`; all engineering documentation and source comments are English.
- Follow approved workflow and authorization. Commit, push, merge, and production release remain separate actions; do not execute publication merely because local development passes.

## Review Focus

- Blocked browser storage or malformed preferences: navigation still works with Chinese/dark defaults. Task 2 tests safe preference reads and writes.
- Unsourced project details and absent optional content: unsupported claims and dead section links never render. Task 1 tests publishable content and section derivation.
- Narrow screens and bottom safe areas: all dock destinations remain reachable and no content is covered. Task 3 verifies this in a real browser.
- Reduced motion and non-pointer input: hero text stays readable and controls remain accessible. Tasks 3 and 5 verify keyboard and reduced-motion behavior.
- Direct route loads and reloads after preference changes: translated content, document language, theme, and navigation remain coherent without hydration errors. Task 5 verifies the complete cross-route flow.

## File Structure and Interfaces

| Files | Responsibility |
| --- | --- |
| `package.json`, `package-lock.json`, `.gitignore`, `.nvmrc`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs` | Root application tooling and repeatable installation |
| `src/content/types.ts`, `src/content/profile.ts`, `src/content/projects.ts`, `src/content/ui.ts` | Typed bilingual content and reviewed project evidence |
| `src/lib/content.ts`, `src/lib/preferences.ts`, `src/lib/preferences.test.ts`, `src/lib/content.test.ts` | Pure content filtering and preference validation/storage logic |
| `src/components/preferences-provider.tsx`, `src/components/site-header.tsx`, `src/components/site-shell.tsx`, `src/components/fish-mark.tsx` | Shared client state, navigation, page composition, original branding |
| `src/components/home/hero.tsx`, `src/components/home/section.tsx`, `src/components/home/section-dock.tsx`, `src/components/home/home-content.tsx` | Reference-style homepage composition and active section navigation |
| `src/components/project-entry.tsx`, `src/components/resume-content.tsx`, `src/components/projects-content.tsx` | Shared project presentation and content-page views |
| `src/app/layout.tsx`, `globals.css`, `page.tsx`, `resume/page.tsx`, `experience/projects/page.tsx`, `not-found.tsx`, `icon.svg`, `robots.ts` | App Router pages, metadata, global styling, favicon, crawling rules |
| `.github/workflows/ci.yml`, `README.md`, `note/2026-10-08-implementation.md` | CI, maintenance guide, evidence and milestone record |

Type contracts:

- `Locale = 'zh' | 'en'`; `Theme = 'dark' | 'light'`; `LocalizedText = Record<Locale, string>`.
- `Preferences = { locale: Locale; theme: Theme }`.
- `Project = { id: string; title: LocalizedText; summary: LocalizedText; technologies: readonly string[]; repositoryUrl: string; status: 'in-progress' | 'implemented'; evidence: readonly string[] }`.
- `Profile = { identity: 'MortyYJT' | '谷鱼Y'; introduction: LocalizedText; about: LocalizedText; githubUrl: string; resumeIntro: LocalizedText; interests: readonly { id: string; label: LocalizedText; entries: readonly LocalizedText[] }[] }`.
- `getPublishableProjects(projects: readonly Project[]): readonly Project[]` excludes entries without repository/source evidence or empty localized summaries.
- `getHomeSections(profile: Profile, projects: readonly Project[]): readonly { id: string; label: LocalizedText }[]` includes only sections with renderable content; IDs remain language-independent.
- `readPreferences(storage: Pick<Storage, 'getItem'> | undefined): Preferences` and `writePreferences(storage: Pick<Storage, 'setItem'> | undefined, value: Preferences): boolean` never throw for unavailable storage or malformed values.
- `usePreferences(): { locale: Locale; theme: Theme; setLocale(value: Locale): void; setTheme(value: Theme): void }` shares preferences across routes.

## Task 1: Verified Content and a Runnable Application

**Files:** Root tooling; `src/content/*`; `src/lib/content.ts`; `src/lib/content.test.ts`; basic `src/app/layout.tsx`, `page.tsx`, `globals.css`; milestone note.

**Interfaces:** Produces the content types, profile/project/UI modules, `getPublishableProjects`, and `getHomeSections` defined above. UI tasks depend only on these contracts.

- [x] Inspect Git status/HEAD/remotes and repository-local identity. Use the current empty checkout for implementation; an unborn repository cannot provide a useful worktree from an existing commit. Set the development branch to `codex/personal-website-rebuild` without discarding existing files.
- [x] Fetch current public source/configuration for `MortyYJT/commerce-support-agent` and `MortyYJT/offerpilot`; record canonical evidence URLs and distinguish visible code from README claims. Exclude details unsupported by those sources. Do not import either repository's private configuration.
- [x] Resolve compatible stable dependency versions and build root tooling without overwriting documentation. The registry snapshot on 2026-10-08 reported Next.js/ESLint config `16.4.0`, React/React DOM `19.3.0`, TypeScript `7.0.2`, and Tailwind/PostCSS `4.3.3`; check compatibility at installation and pin the chosen exact versions. Configure `dev`, `build`, `start`, `lint`, `typecheck`, and `test` scripts. Use Node's built-in test runner for pure `.ts` tests, avoiding a test-framework dependency.

  Script commands: `dev: next dev`, `build: next build`, `start: next start`, `lint: eslint .`, `typecheck: tsc --noEmit`, `test: node --test src/lib/*.test.ts`. Configure `allowImportingTsExtensions` with `noEmit` so Node tests can import pure source modules by their `.ts` paths. Add matching React/Node type packages as pinned development dependencies.
- [x] Write failing content tests with these assertions: an entry with no evidence is excluded; an empty English summary is excluded; absent interests remove `interests` from dock destinations; every included dock destination has a real section; section IDs do not depend on the selected language.
- [x] Run `npm test`; confirm the content tests fail because the content functions are not implemented, rather than because of broken tooling.
- [x] Implement the exact content contracts and restrained bilingual profile copy. Publish only sourced technology tags and summaries. Omit interests until genuine entries are supplied; GitHub is the initial public contact channel.
- [x] Render a minimal home route using the content module. Use system fonts and pseudonymous metadata; add an original fish favicon.
- [x] Run `npm test`, `npm run typecheck`, and `npm run build`; expect all to exit 0. Record exact selected dependency versions and verified content sources in the milestone note.

## Task 2: Persistent Language and Theme

**Files:** `src/lib/preferences.ts`, `src/lib/preferences.test.ts`, `src/components/preferences-provider.tsx`, shared layout.

**Interfaces:** Consumes `Locale`, `Theme`, and `Preferences`; produces `readPreferences`, `writePreferences`, and `usePreferences`.

- [x] Write failing tests for default `{ locale: 'zh', theme: 'dark' }`, valid saved English/light values, malformed JSON, unknown locale/theme values, missing fields, throwing reads, and throwing writes. Store one versioned preferences value under `guyuy:preferences:v1`; invalid individual fields fall back independently.
- [x] Run `npm test`; confirm these fail for unimplemented preference behavior.
- [x] Implement defensive preference parsing and storage. `writePreferences` returns false on failure while in-memory UI state remains usable; never use preferences to store identifying information.
- [x] Implement a shared provider that hydrates safely and updates language/theme together with storage. Set `document.documentElement.lang` to `zh-CN` or `en` and its theme attribute to the selected palette. Retain stable server defaults to avoid hydration mismatches.
- [x] Add a small pre-hydration theme script that catches storage errors and applies only the validated theme before paint. Scope any necessary hydration suppression to the root attribute intentionally changed by that script; do not suppress errors throughout the component tree.
- [x] Run `npm test` and `npm run typecheck`; expect exit 0. Verify a temporary basic language/theme control in the browser and then integrate the production controls in Task 3.

## Task 3: Reference-Style Homepage and Shared Shell

**Files:** `site-shell.tsx`, `site-header.tsx`, `fish-mark.tsx`, `src/components/home/*`, `globals.css`, home route.

**Interfaces:** Consumes profile/projects/UI content, `getHomeSections`, and `usePreferences`; produces `SiteShell({ children }: { children: React.ReactNode })`, `HomeContent()`, and reusable `Section({ id, title, children })`.

- [x] Refresh the reference site's live homepage in the browser, observe wide and narrow layouts, and record the visual features being reproduced. Do not download its personal imagery or copy its biography.
- [x] Implement purple-gray and light theme tokens, gradient/grain background, 720-pixel content column, 16-pixel minimum mobile gutters, readable type scale, focus treatment, and section offsets. Decorative textures must ignore pointer events.
- [x] Build the original fish mark and floating capsule header with brand/home, resume, project experience, language, and theme controls. Keep routes direct until genuine additional experience categories exist.
- [x] Build the hero with truthful typed phrases, about, resume entry, selected projects, source-backed stack, optional sourced interests, and GitHub contact. Missing optional fields must not create fake links or filler sections.
- [x] Build the dock from `getHomeSections`, track active sections, account for header offsets and bottom safe-area spacing, and keep overflow inside the dock. Disconnect observers/timers when components unmount; reduced motion shows a stable phrase and disables smooth/continuous motion.
- [x] Start `npm run dev -- --hostname 127.0.0.1`. In the real browser verify 375/768/1440 widths, scroll-to-section, every dock link, keyboard focus, readable theme palettes, and the reduced-motion hero. Expected: no body overflow, obscured final section, unreachable dock item, or navigation tied to hover.
- [x] Save review screenshots and record browser findings in the milestone note. Apply repairs before completing this task; do not claim a CSS unit test proves visual fidelity.

## Task 4: Resume, Project Evidence, and Route Completeness

**Files:** `project-entry.tsx`, `resume-content.tsx`, `projects-content.tsx`, resume/projects routes, `not-found.tsx`, `robots.ts`, metadata in layout.

**Interfaces:** Consumes Task 1 content and Task 3 shell; produces `ProjectEntry({ project }: { project: Project })`, `ResumeContent()`, and `ProjectsContent()`.

- [x] Build shared project entries with localized copy, accurate status, sourced technology tags, and canonical GitHub/evidence links. Never describe a draft or experiment as a deployed production result.
- [x] Implement the HTML resume with approved pseudonym, verified introduction, selected projects, source-backed technical areas, and GitHub contact. Omit education/employment sections without sourced approved content; do not add a PDF download.
- [x] Implement `/experience/projects` with project context, implemented behavior, limitations, and evidence links. Use the calmer content-page visual treatment from the design.
- [x] Add branded 404/home navigation and pseudonymous title/description/Open Graph metadata. Use relative/social-safe local assets; do not insert a guessed production domain into canonical or sitemap URLs. Generate domain-dependent metadata only when the actual production URL is known.
- [x] Run typecheck and production build; expect exit 0. Verify direct URL loads of all three routes and an unknown path, in both languages and themes, with a working return-home action.

## Task 5: Local Acceptance and CI Preparation

**Files:** `.github/workflows/ci.yml`, `README.md`, milestone note; repair any files implicated by acceptance failures.

**Interfaces:** Consumes the complete local application and scripts; produces a repeatable documented build and CI definition, without claiming that remote CI has run.

- [x] Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`; each must exit 0. Do not disable rules, remove meaningful tests, or skip typechecking to pass.
- [x] Run the production server with `npm run start -- --hostname 127.0.0.1`. Use the real browser to switch to English/light, navigate home → resume → projects → home, and reload each route. Expected: saved language/theme persist, document language matches the rendered copy, and no hydration or application console errors occur.
- [ ] Verify the same flow with unavailable storage through supported developer-testing tooling, then restore normal storage. Expected: controls still work in memory and a fresh load uses Chinese/dark defaults. The pure throwing-storage tests remain the repeatable regression evidence.
- [x] Complete browser checks for 375/768/1440 widths, keyboard-only navigation, reduced motion, direct unknown-route handling, final-section dock clearance, and all public links. Capture the accepted views; do not reuse an earlier screenshot as proof after repairs.
- [x] Scan product content, metadata, generated public assets, and included docs for forbidden owner identity and private paths. Do not embed forbidden real-name literals into checked-in tests just to scan for them; derive local-only patterns without committing those identifiers.
- [x] Create CI for pull requests and pushes with read-only permissions, Node 24, lockfile installation, lint/typecheck/test/build. Pin official actions to verified release commit SHAs. No Vercel token is needed for this validation pipeline; Git integration handles deployment later.
- [x] Write the English README with setup, scripts, content editing, preference behavior, evidence policy, and deployment configuration. Record local/browser results separately from remote CI/CD status.
- [x] Review the complete diff against the design and repository rules. Fix findings and rerun only affected checks plus the final build when runtime code changes. Request an independent review using the execution workflow's review stage; do not claim it happened until evidence exists.

Browser testing boundary: running-page denied storage was verified; a fresh denied-storage browser load could not be injected with the available tooling. Throwing-read/default behavior is covered by unit tests. This specific step remains partially verified.

## Task 6: Authorized Publication and Real CD Acceptance

**Files/state:** Git remote and commits, GitHub repository/PR and Actions runs, Vercel project/Git connection, production metadata configuration, milestone note.

**Interfaces:** Consumes the locally accepted application. Produces verified repository identity, CI result, deployed commit, and public production URL only after the corresponding external actions are authorized.

- [x] Present the accepted local result and exact proposed external targets: `MortyYJT/personal-website-guyuy`, matching Vercel project, development branch and initial main bootstrap. Obtain missing authorization for commit/push, repository creation, bootstrap and production release as required by session context. Continue with already-authorized actions without reasking.
- [x] Verify repository-local author/committer fields, run `git diff --cached --check`, and use conventional commit subjects with an English bullet body. Publish new history without altering the previous repository.
- [x] Create/connect the new GitHub repository, attach any created PR to this chat, and preserve user-owned merges. Verify the intended account is associated with the published commits and that the new repository is accessible.
- [x] Inspect the current Vercel account, available projects, old-project domain associations, and old Git disconnection. Prefer a new matching project; reuse the old project only when its actual domain association justifies it. Correct framework/root/output settings before the first deployment. Do not delete old resources.
- [ ] Verify remote CI on the exact published commit. Once the production branch/bootstrap is authorized and ready, verify a genuine Git-triggered production deployment from the expected commit, not merely a manual CLI upload.
- [ ] Set the actual production origin for canonical/Open Graph/crawling metadata, publish that reviewed change within authorization, and verify the resulting automatic deployment. Use official provider tools or the authenticated browser; never retrieve or print private tokens.
- [ ] Open the production URL and smoke-test home, resume, projects, preferences and direct routes. Record commit SHA, CI run, Vercel deployment, project, production URL, and separate status for every acceptance dimension. If publication is pending, report local readiness and remote criteria as not verified.

## Execution Handoff

Recommended method: native execution in this session using `superpowers:executing-plans`. The UI tasks share state, content types, and visual tokens, so keeping them in one implementation context reduces duplicate setup and interface drift. An independent final review is still required by the chosen workflow.

Alternative: subagent-driven implementation, with task-level implementation and review handoffs. Choose this only if the user wants that added review cadence and context cost.

Approve this plan and select the execution method before scaffolding or installing application dependencies. Approving local implementation does not by itself authorize every publication action in Task 6.
