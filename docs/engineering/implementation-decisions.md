# Implementation decisions — plan: docs/superpowers/plans/2026-10-08-personal-website-implementation.md

Execution: native; user approved design and plan and selected primary-agent implementation.
Baseline: unborn repository, no runtime code or tests, no remote; branch codex/personal-website-rebuild.
Ruling: Work in the existing empty checkout on a development branch — the approved plan explicitly uses it and no commit exists for a useful worktree — cost if wrong: local changes require later relocation.
Ruling: Use task briefs with BASE=unborn and record test commands manually — skill commit-range helpers require HEAD, while the plan defers committing until authorization — cost if wrong: later review relies on working-tree files rather than a commit diff.
Pre-flight: Task 1 content types and section derivation -> Tasks 3/4 renderers: consistent.
Pre-flight: Task 2 usePreferences -> Tasks 3/4 controls/content: consistent.
Pre-flight: Tasks 1–4 scripts/routes -> Task 5 verification/CI -> Task 6 deployment: consistent.
Task 1: in progress.
Ruling: Pin TypeScript 5.9.3 instead of the 7.0.2 registry candidate — established compatibility with the current lint ecosystem takes priority over newest-major adoption — cost if wrong: later migration needed.

Task 1: compatibility investigation — TS5.9 lacks global URLPatternInput/Options required by Next16.4; TS7 passes full declarations but typescript-eslint rejects its API. Testing stable TS6.0.3 with ESLint9.39.5 and Node24 types; skipLibCheck remains false.
Task 2: pure preferences RED 8/8 → GREEN 14/14 full suite; production browser controls pending Task3 integration.
Ruling: validate preferences through the final production controls rather than a disposable temporary UI — same provider behavior with less throwaway code — cost if wrong: a provider error surfaces with the shell.

Task 1: complete — content tests RED6→GREEN6, full suite14; TS6.0.3/Node24 types typecheck full declarations passes, ESLint9.39.5 compatible. Next16.4/React19.3/Tailwind4.3.3 pinned.
Ruling: use TS6.0.3 and ESLint9.39.5 — TS7 cannot run typescript-eslint and TS5.9 lacks Next globals; full declarations remain checked — cost if wrong: future toolchain upgrade; ESLint9 upstream support ended.
Task 3: shell/hero/dock implemented after fresh reference observation; Tasks3/4 browser checks pending.

Ruling: retain Next recommended skipLibCheck=true after observing conflicting global declarations in .next/dev/types and .next/types — strict application checks and Next route validation remain enabled; framework declaration duplication should not block development/build switching — cost if wrong: external declaration errors are not checked. This supersedes the full-declaration-checking experiment.

Task 2: complete — 14/14 suite; production language/theme persistence and denied-write in-memory navigation verified.
Task 3: complete — 375/768/1440 actual CDP metrics, all dock anchors, keyboard and reduced motion verified; screenshots saved outside repo.
Task 4: complete — all product routes and404 direct/reload, both languages/palettes, public links200, metadata/build verified.
Task 5: local acceptance complete with explicit browser boundaries — final lint/typecheck/tests14/build pass; CI definition prepared, not remotely run; privacy scan55/0.
Task 6: pending explicit publication authorization.
Final review: fresh GPT-6.1 Sol reviewer; Astra dispatch failed before review due usage limits. No Critical/Important; one Minor translation omission.
Final: Ruling: correct the minor hero translation omission — approved entire-interface bilingual requirement takes precedence over the skill's general advice to defer minors — cost if wrong: one small additional copy change. Browser RED localized=false → GREEN=true, English text confirmed, suite14/14.
Final: Ruling: cold denied-storage browser load is accepted with source inspection and throwing-read unit coverage; runtime browser denial is verified — new-document injection is unavailable — cost if wrong: a browser-only cold-start quirk remains possible.
Final: Ruling: actual phone safe-area/touch behavior remains unverified; responsive CSS/keyboard/browser evidence is accepted locally — no physical device test is available — cost if wrong: device-specific interaction quirks.
Final: Ruling: remote CI/Git attribution/CD is deferred to authorized Task6 — no published commit or production target exists — cost if wrong: release delayed until authorization.
Final: Ruling: unsourced interests/tabs/PDF/resume details remain omitted — spec limits optional content to genuine inputs — cost if wrong: less profile detail.
Final: Ruling: preserve current theme hydration strategy — normal-load frame probe shows light from first frame and no painted dark frame; slow sample covers initial paint only — cost if wrong: an untested timing may flash.
Final: Ruling: keep the ignored workspace until commits exist; archive decisions into durable docs now — skill cleanup requires committed history as evidence — cost if wrong: small local scratch retained.
Final: Ruling: use the plan's concrete publication handoff instead of a merge menu — unborn repository has no commit/base to merge and no remote — cost if wrong: integration alternatives require later discussion.
Final: minor (deferred): none; actual toolchain limitations and test boundaries remain documented.
