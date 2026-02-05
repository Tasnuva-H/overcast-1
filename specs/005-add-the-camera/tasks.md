# Tasks: Camera Preview with Toggle Mirror UI

**Input**: Design documents from `/Users/tasnuvahuda/Desktop/Overclock/Code/Practice/overcast/specs/005-add-the-camera/`
**Prerequisites**: plan.md, research.md, data-model.md, quickstart.md (contracts/ has no new API)

## Execution Flow (main)
```
1. Load plan.md from feature directory → Tech stack: Next.js, Daily, Tailwind; app/, lib/, tests/
2. Load data-model.md, research.md, quickstart.md → Mirror preference default false; both contexts; no new entities/API
3. Generate tasks: Setup → Tests (default off) → Core (change default in VideoOptionsScreen, DevicePreview) → Polish (quickstart)
4. Apply task rules: [P] for different files; tests before implementation
5. Number tasks T001–T007
6. Dependency graph and parallel examples below
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js App Router**: `app/`, `app/components/`, `app/classroom/[id]/` at repository root
- **Tests**: `tests/unit/components/` for component tests

---

## Phase 3.1: Setup
- [x] T001 Verify project structure and dependencies support the feature (Next.js, @daily-co/daily-react, @daily-co/daily-js, existing VideoOptionsScreen and DevicePreview). No new dependencies required per plan.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: Update tests so they expect default mirror OFF; then implementation makes them pass.**

- [x] T002 [P] Update VideoOptionsScreen unit test so the mirror toggle **defaults to off** (unmirrored). File: `tests/unit/components/VideoOptionsScreen.test.tsx`. Assert that on first render the mirror checkbox is unchecked (or mirror state is false), and that the preview is unmirrored by default. Adjust any test that assumed default on.
- [x] T003 [P] Update DevicePreview unit test so the mirror toggle **defaults to off** (unmirrored). File: `tests/unit/components/DevicePreview.test.tsx`. Assert that on first render the mirror control is off and the preview container does not have mirror style by default; adjust expectations for "preview container has mirror style" (only when user turns mirror on).

## Phase 3.3: Core Implementation (ONLY after tests expect default off)
- [x] T004 Change default mirror state to **off** in VideoOptionsScreen. File: `app/components/VideoOptionsScreen.tsx`. Replace `useState(true)` for mirror with `useState(false)` (or equivalent so mirrorEnabled defaults to false). Add a brief comment that default is off per spec 005.
- [x] T005 [P] Change default mirror state to **off** in DevicePreview. File: `app/components/DevicePreview.tsx`. Replace `useState(true)` for mirrorEnabled with `useState(false)`. Add a brief comment that default is off per spec 005.

## Phase 3.4: Integration
- [x] T006 Confirm join flow passes mirror preference correctly when default is off: when user does not toggle mirror and clicks "Enter room", the classroom URL (or equivalent) must receive `mirror=false`. File: `app/page.tsx` (and optionally `app/components/Lobby.tsx`) — verify handleJoinClassroom / onProceed passes the mirror value from VideoOptionsScreen; no change needed if already passing mirrorEnabled. If the app currently defaults options.mirror to true when not provided, change that default to false so it aligns with UI default.

## Phase 3.5: Polish
- [x] T007 Run quickstart verification from `specs/005-add-the-camera/quickstart.md`: manually verify (1) video-options screen shows preview and mirror toggle with **default off**, (2) device-setup modal shows preview and mirror toggle with **default off**, (3) toggling mirror updates preview in both, (4) with mirror on at join others see mirrored stream; with mirror off others see unmirrored, (5) no in-call mirror toggle, (6) camera unavailable does not block Enter room. Document any deviations.

---

## Dependencies

### Critical path
- T001 → T002, T003 (setup before tests)
- T002, T003 → T004, T005 (tests before implementation)
- T004 → T006 (VideoOptionsScreen provides mirror at proceed; T006 verifies page/Lobby uses it)
- T005 is independent of T004 (different file) → can run in parallel with T004 after tests
- T004, T005, T006 → T007 (implementation before quickstart validation)

### Specific dependencies
- T002 and T003 can run in parallel (different test files).
- T004 and T005 can run in parallel (different component files).
- T006 may depend on T004 if it touches the same join flow; run after T004 or in same batch.

### Blocking relationships
- Do not implement T004/T005 until T002/T003 expect default off (TDD).

---

## Parallel execution examples

```
# Phase 3.2 – run both test updates:
Task: "Update VideoOptionsScreen unit test for default mirror off in tests/unit/components/VideoOptionsScreen.test.tsx"
Task: "Update DevicePreview unit test for default mirror off in tests/unit/components/DevicePreview.test.tsx"

# Phase 3.3 – after tests, change defaults in both components:
Task: "Change default mirror to off in app/components/VideoOptionsScreen.tsx"
Task: "Change default mirror to off in app/components/DevicePreview.tsx"
```

---

## Notes
- No new API or contract tests for this feature (contracts/README states no new endpoints).
- No new data-model entities; mirror preference is in-memory and URL only.
- Stream-level mirror and fixed-at-join are already implemented (004 / lib/mirrored-video-track.ts); 005 only changes **default** to off and aligns tests/docs.
- Constitution: single-file changes, comments for WHY (default off per spec), newcomer-friendly names.

## Validation checklist
- [x] No new contracts for this feature → no contract test tasks
- [x] Data model has no new domain entities → no model tasks; state in existing components
- [x] Tests (T002, T003) before core implementation (T004, T005)
- [x] Parallel tasks [P] are in different files
- [x] Each task specifies exact file path
- [x] Constitution: single-file preference, comments for WHY, newcomer-friendly language

### Constitution compliance
- [x] Tasks favor single-file implementations (changes in existing VideoOptionsScreen, DevicePreview, test files)
- [x] Task descriptions use clear, newcomer-friendly language
- [x] No unnecessary file splits
