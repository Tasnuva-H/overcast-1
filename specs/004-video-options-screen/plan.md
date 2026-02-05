# Implementation Plan: Video Options Screen

**Branch**: `004-video-options-screen` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/Users/tasnuvahuda/Desktop/Overclock/Code/Practice/overcast/specs/004-video-options-screen/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → ✅ Found: spec.md
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ Clarifications present; no NEEDS CLARIFICATION
3. Fill the Constitution Check section
   → ✅ Completed below
4. Evaluate Constitution Check
   → No violations
5. Execute Phase 0 → research.md
   → ✅ research.md generated
6. Execute Phase 1 → data-model.md, quickstart.md (no new API → no contracts/)
   → ✅ data-model.md, quickstart.md created
7. Re-evaluate Constitution Check
   → No new violations
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
   → ✅ Described below
9. STOP - Ready for /tasks command
```

**IMPORTANT**: Phase 2 (tasks.md) is produced by the /tasks command, not by /plan.

## Summary
The user MUST see the camera preview (video options screen) immediately after clicking "Join Classroom"; there is no direct lobby-to-classroom path. The screen shows: which classroom they are joining (classroom name), camera preview, Mirror toggle (default on), and "Filters" (non-functional link). User can "Enter room" (proceed) or "Back"/"Cancel" (return to lobby without joining). When camera is unavailable or denied, show a placeholder but still allow "Enter room". Mirror affects both self-view and the stream others see (stream-level); mirror is fixed at join time (no in-call toggle). Mirror toggle also in Device Setup modal. In-Lobby state + VideoOptionsScreen; mirror preference passed to classroom and applied to outgoing video (Daily API or custom track processing).

## Technical Context
**Language/Version**: TypeScript/JavaScript with Next.js 15.5.4, React 19.1.0  
**Primary Dependencies**: Existing (Daily Video, @daily-co/daily-react, Tailwind); possible use of Canvas/MediaStream for stream-level mirror if Daily has no built-in  
**Storage**: N/A (mirror passed with navigation; no persistence across sessions)  
**Testing**: Jest + React Testing Library; optional E2E (including two clients to verify others see mirrored stream)  
**Target Platform**: Web browsers (same as app), Vercel  
**Project Type**: web — Next.js App Router; UI/flow + video stream behaviour  
**Performance Goals**: No new targets; mirror processing should not add noticeable latency  
**Constraints**: Mirror must affect **outgoing stream** (others see user mirrored when on); Filters is placeholder (no action)  
**Scale/Scope**: VideoOptionsScreen, Lobby flow, DevicePreview mirror, **stream-level mirror in Classroom/VideoFeed** (apply to published video)

## Constitution Check
*GATE: Must pass before Phase 0. Re-check after Phase 1.*

**Simplicity First**:
- [x] In-Lobby state + one new component; no new route
- [x] Preview mirror can use CSS; live-call mirror must affect stream (Daily API or minimal track processing); Filters as link-styled no-op
- [x] Justify any custom video processing in comments (why stream-level mirror is required per spec)

**Single File Preference**:
- [x] New component in one file (e.g. `VideoOptionsScreen.tsx`); Lobby changes in `Lobby.tsx`
- [x] Mirror logic can be duplicated or a small shared helper; no unnecessary modules

**Comment-Driven Development**:
- [x] Comment WHY video options appears (step between join click and room)
- [x] Comment WHY Filters is non-functional (placeholder for future)

**Newcomer-Friendly Architecture**:
- [x] Clear names: VideoOptionsScreen, mirrorEnabled, "Filters"
- [x] Standard React state and props; no new abstractions

**Test-Driven Clarity**:
- [x] Component tests for video options screen and mirror behavior
- [x] Quickstart.md for manual verification

## Project Structure

### Documentation (this feature)
```
specs/004-video-options-screen/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
└── tasks.md             # Phase 2 (/tasks command)
```
No `contracts/` (no new API).

### Source Code (repository root)
```
app/
├── page.tsx             # Unchanged or minimal (Lobby handles flow)
├── components/
│   ├── Lobby.tsx        # MODIFY: defer join; show VideoOptionsScreen when pending join set
│   ├── VideoOptionsScreen.tsx   # NEW: classroom name, preview, Mirror, Filters, Enter room, Back/Cancel; camera-unavailable allow proceed
│   ├── DevicePreview.tsx        # MODIFY: add Mirror toggle if not already present (003)
│   └── ...
└── ...
```
**Structure Decision**: One new component; Lobby and optionally DevicePreview updated. No new routes or pages.

## Phase 0: Outline & Research
✅ **Output**: research.md — in-Lobby state, same preview pattern as DevicePreview, Filters as non-functional link, mirror in both places.

## Phase 1: Design & Contracts
✅ **Output**: data-model.md (pending join state, local mirror state), quickstart.md.  
No API contracts. Agent file update optional.

## Phase 2: Task Planning Approach
*Executed by /tasks command.*

**Task Generation Strategy**:
- Add VideoOptionsScreen component: display classroom name, preview (when camera unavailable show placeholder but allow proceed), Mirror toggle, "Filters" (no action), "Enter room" and "Back"/"Cancel" (required). Pass mirror when calling onProceed; onBack clears pending join.
- Update Lobby: on "Join Classroom" set pending join (classroomId, user, classroom name); render VideoOptionsScreen; no direct lobby-to-classroom. On "Enter room" pass mirror and (classroomId, user) to onJoinClassroom; on "Back"/"Cancel" clear pending join.
- Add or confirm Mirror toggle in DevicePreview. Authoritative mirror for the call is the value set on the video options screen at "Enter room"; no in-call mirror toggle.
- **Stream-level mirror in live call**: When joining the classroom, apply mirror preference to the **outgoing video stream** so other participants see the user mirrored when mirror is on. Options: (1) Daily.co video effects / mirror API if available; (2) custom video track that applies horizontal flip (e.g. canvas or transform) before publishing. Also apply mirror to local participant’s tile (CSS) for consistency.
- Pass mirror from classroom page (searchParams) into Classroom/VideoFeed; apply to published track and to local display.

**Ordering**:
- VideoOptionsScreen component (can depend on existing DevicePreview pattern for preview).
- Lobby integration (state + conditional render).
- DevicePreview mirror (if not in 003) can be parallel or same task batch.
- Tests: component tests for VideoOptionsScreen and DevicePreview mirror; optional E2E.

**Estimated Output**: Roughly 4–7 tasks (e.g. T001 VideoOptionsScreen component, T002 Lobby flow, T003 DevicePreview mirror, T004 tests, T005 quickstart verification).

## Phase 3+: Future Implementation
**Phase 3**: /tasks creates tasks.md  
**Phase 4**: Implement per tasks  
**Phase 5**: Run tests and quickstart verification

## Complexity Tracking
No violations.

| Violation | Why Needed | Simpler Alternative Rejected |
|-----------|------------|-----------------------------|
| (none)    | —          | —                           |

## Progress Tracking

**Phase Status**:
- [x] Phase 0: Research complete
- [x] Phase 1: Design complete
- [x] Phase 2: Task approach described
- [ ] Phase 3: Tasks generated (/tasks)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations: N/A

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
