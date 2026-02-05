# Tasks: Video Options Screen

**Input**: Design documents from `/Users/tasnuvahuda/Desktop/Overclock/Code/Practice/overcast/specs/004-video-options-screen/`
**Prerequisites**: plan.md, research.md, data-model.md (no contracts for this feature)

## Execution Flow (main)
```
1. Load plan.md from feature directory → ✅ Tech stack: Next.js, Daily, Tailwind
2. Load data-model.md, research.md, quickstart.md → ✅ Pending join state, VideoOptionsScreen props, mirror stream-level
3. Generate tasks by category → Tests first (TDD), then core (VideoOptionsScreen, Lobby, DevicePreview, page, classroom page, Classroom, VideoFeed), then polish
4. Apply task rules → [P] for different files; tests before implementation
5. Number tasks T001, T002, ...
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
- [x] T001 Verify existing project structure and dependencies support feature (Next.js, @daily-co/daily-react, Tailwind). No new dependencies required per plan.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [x] T002 [P] Component test: VideoOptionsScreen renders classroom name, preview area (or placeholder), Mirror toggle, "Filters" link-style control, "Enter room" button, and "Back"/"Cancel" button. File: `tests/unit/components/VideoOptionsScreen.test.tsx` (create; mock or skip Daily if needed).
- [x] T003 [P] Component test: DevicePreview includes Mirror toggle; toggling applies/removes mirror style (e.g. scaleX(-1)) on preview container; default is mirrored on. File: `tests/unit/components/DevicePreview.test.tsx` (create if missing, or extend existing).

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Video options screen and lobby flow
- [x] T004 Create VideoOptionsScreen component in `app/components/VideoOptionsScreen.tsx`: Display classroom name (prop `classroomName`), camera preview (Daily call object + startCamera; when camera unavailable show placeholder/message but keep Mirror and Filters visible and allow "Enter room"), Mirror toggle (state `mirrorEnabled` default true, CSS transform on preview container), "Filters" as link-styled control with no-op click, "Enter room" button (calls `onProceed(mirrorEnabled)`), "Back" or "Cancel" button (calls `onBack()`). Props: `classroomId`, `classroomName`, `user`, `onProceed: (mirror: boolean) => void`, `onBack: () => void`. Add comments explaining WHY video options appear (no direct lobby-to-classroom) and WHY Filters is non-functional (placeholder).
- [x] T005 Update Lobby in `app/components/Lobby.tsx`: On "Join Classroom" click, set pending join state `{ classroomId, user, classroomName }` (derive classroomName from classrooms list) instead of calling `onJoinClassroom` immediately. When pending join is set, render VideoOptionsScreen with classroomId, classroomName, user, onProceed, onBack. On `onProceed(mirror)` call parent `onJoinClassroom(classroomId, user, { mirror })` and clear pending join. On `onBack()` clear pending join (return to grid). Ensure there is no direct lobby-to-classroom navigation.
- [x] T006 Add Mirror toggle to DevicePreview in `app/components/DevicePreview.tsx`: Add `mirrorEnabled` state (default true). Render a Mirror toggle (e.g. checkbox or switch). When mirrorEnabled, apply horizontal flip (e.g. CSS `transform: scaleX(-1)` or Tailwind equivalent) to the camera preview container. Fix duplicate DailyIframe error if present (use ref + empty dependency array for createCallObject effect). Add brief comment that mirror is preview-only here; authoritative value for the call is set on video options screen at "Enter room".

### Pass mirror through navigation and into classroom
- [x] T007 Update home page in `app/page.tsx`: Change `handleJoinClassroom` to accept optional third parameter `options?: { mirror?: boolean }`. When present, append `&mirror=true` or `&mirror=false` to the classroom URL so the classroom page can read mirror preference. Default mirror to true if not provided.
- [x] T008 Update classroom page in `app/classroom/[id]/page.tsx`: Read `mirror` from `searchParams.get('mirror')` (parse as boolean; "true" → true, else false). Pass `mirrorLocalVideo={mirror}` (or equivalent prop name) to the Classroom component along with existing props.
- [x] T009 Update Classroom in `app/components/Classroom.tsx`: Add prop `mirrorLocalVideo?: boolean`. Pass it through to VideoFeed (e.g. `mirrorLocalVideo={mirrorLocalVideo}`).
- [x] T010 Update VideoFeed in `app/components/VideoFeed.tsx`: Add prop `mirrorLocalVideo?: boolean`. (1) Apply CSS horizontal flip to the **local participant video tile** when `mirrorLocalVideo` is true (so the user sees themselves mirrored in the call). (2) Apply **stream-level mirror** so other participants see this user mirrored when `mirrorLocalVideo` is true: research Daily.co API for video effects/mirror on published track; if unavailable, implement via custom video track (e.g. canvas or transform) that flips the frame before publishing. Add comments explaining that mirror affects both local display and outgoing stream per spec.

## Phase 3.4: Integration
- [x] T011 Ensure Lobby passes classroom name to VideoOptionsScreen: When building pending join, set `classroomName` from the selected classroom (e.g. `classrooms.find(c => c.id === classroomId)?.name`). Verify VideoOptionsScreen shows it (e.g. "Joining: {classroomName}").

## Phase 3.5: Polish
- [x] T012 [P] Run component tests: `npm test -- tests/unit/components/VideoOptionsScreen.test.tsx tests/unit/components/DevicePreview.test.tsx` (or equivalent). Fix any failures; ensure tests pass.
- [ ] T013 Run quickstart verification from `specs/004-video-options-screen/quickstart.md`: Manual check that video options screen appears after Join Classroom, shows classroom name, Mirror toggle, Filters, Enter room, Back/Cancel; camera unavailable allows proceed; mirror persists into call and others see it; no in-call mirror toggle. Document any deviations.

---

## Dependencies

### Critical path
- T001 → T002, T003 (setup before tests)
- T002, T003 → T004, T005, T006 (tests before implementation)
- T004 → T005 (VideoOptionsScreen exists before Lobby uses it)
- T005 → T007 (Lobby calls onJoinClassroom with mirror)
- T007 → T008 (page builds URL with mirror)
- T008 → T009 (classroom page passes mirror to Classroom)
- T009 → T010 (Classroom passes mirror to VideoFeed)
- T010 → T011 (stream + local mirror in place)
- T004–T011 → T012, T013 (implementation before polish)

### Specific dependencies
- T004 (VideoOptionsScreen) and T006 (DevicePreview mirror) can be implemented in parallel after T002/T003.
- T007, T008, T009, T010 are sequential (page → classroom page → Classroom → VideoFeed) when touching the join-to-classroom data flow.
- T011 can be done with T005 (Lobby) or immediately after.

### Blocking relationships
- T005 (Lobby) depends on T004 (VideoOptionsScreen) for rendering.
- T008 depends on T007 for URL shape.
- T009 depends on T008 for prop source.
- T010 depends on T009 for prop receipt.

---

## Parallel execution examples

```
# Phase 3.2 – run both component tests:
Task: "Component test VideoOptionsScreen in tests/unit/components/VideoOptionsScreen.test.tsx"
Task: "Component test DevicePreview mirror in tests/unit/components/DevicePreview.test.tsx"

# Phase 3.3 – after tests, parallel where different files:
Task: "Create VideoOptionsScreen in app/components/VideoOptionsScreen.tsx"
Task: "Add Mirror toggle to DevicePreview in app/components/DevicePreview.tsx"
# Then sequential: T005 Lobby → T007 page → T008 classroom page → T009 Classroom → T010 VideoFeed

# Phase 3.5 – run tests and quickstart:
Task: "Run component tests for VideoOptionsScreen and DevicePreview"
Task: "Run quickstart verification from specs/004-video-options-screen/quickstart.md"
```

---

## Notes
- No contract tests (no new API endpoints).
- No new data-model entities; reuse AppUser, Classroom; pending join is in-memory state in Lobby.
- Mirror is fixed at join time: do not add an in-call mirror toggle in Classroom/VideoFeed.
- Back/Cancel on video options screen is required; camera unavailable must not block "Enter room".
- Stream-level mirror (others see user mirrored) is required; implement via Daily API or custom track and document in code.

## Validation checklist
- [x] No contracts for this feature → no contract test tasks
- [x] Data model has no new domain entities → no separate model tasks; state in components
- [x] Tests (T002, T003) before core implementation (T004–T010)
- [x] Parallel tasks [P] are in different files
- [x] Each task specifies exact file path
- [x] Constitution: single-file preference, comments for WHY, newcomer-friendly names

### Constitution compliance
- [x] Tasks favor single-file implementations (VideoOptionsScreen in one file; Lobby, DevicePreview, VideoFeed changes in existing files)
- [x] Complex tasks (T010 stream-level mirror) include comment/documentation requirement
- [x] Task descriptions use clear, newcomer-friendly language
- [x] No unnecessary file splits
