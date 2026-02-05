# Implementation Plan: Camera Preview with Toggle Mirror UI

**Branch**: `005-add-the-camera` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-add-the-camera/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phase 2 is executed by the /tasks command.

## Summary

Provide a live camera preview and mirror toggle in both the video-options screen and the device-setup modal. Mirror defaults to **off** (unmirrored); when the user turns it on and enters the room, the published video is mirrored for other participants (stream-level). Mirror is fixed at join (no in-call toggle). Reuse existing VideoOptionsScreen and DevicePreview; align default mirror state and ensure both contexts meet FR-001–FR-008. No new APIs; mirror preference is passed via existing join flow (e.g. URL) and applied in the client.

## Technical Context

**Language/Version**: TypeScript (Next.js app), Node 18+  
**Primary Dependencies**: Next.js 15, @daily-co/daily-react, @daily-co/daily-js, Tailwind CSS, React 19  
**Storage**: N/A (mirror preference in-memory and URL only; no new persistence)  
**Testing**: Jest (unit), Playwright (integration), React Testing Library  
**Target Platform**: Web (modern browsers with getUserMedia)  
**Project Type**: Web (Next.js App Router; app/, lib/, no separate backend)  
**Performance Goals**: Preview and toggle respond immediately; no new latency targets  
**Constraints**: Mirror fixed at join; camera unavailable must not block join  
**Scale/Scope**: Same as existing classroom app; two UI contexts (video-options, device-setup)

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity First**: Does this feature use the simplest approach? Any complex patterns must be justified.
- [x] Solution starts with simplest working approach (reuse existing screens; change default to off)
- [x] Complex patterns documented with rationale (stream-level mirror already justified in 004 / lib/mirrored-video-track.ts)
- [x] No premature optimization or over-engineering

**Single File Preference**: Are we minimizing file count without sacrificing clarity?
- [x] Related functionality kept together (changes in existing VideoOptionsScreen, DevicePreview, possibly Lobby/Classroom)
- [x] File splits justified by clear organizational benefits (no new feature modules)
- [x] No excessive hierarchies or unnecessary modules

**Comment-Driven Development**: Will the code be educational for newcomers?
- [x] Non-trivial logic includes WHY comments (default mirror off per spec; mirror fixed at join)
- [x] Business decisions explained in accessible language
- [x] Complex patterns include educational explanations (existing mirror pipeline already commented)

**Newcomer-Friendly Architecture**: Is the design approachable for junior developers?
- [x] Clear, descriptive naming without jargon (mirror preference, camera preview)
- [x] Architecture patterns explained when advanced
- [x] No implicit conventions or domain-specific abstractions

**Test-Driven Clarity**: Do tests serve as living documentation?
- [x] Test names describe scenarios in plain language (existing VideoOptionsScreen, DevicePreview unit tests)
- [x] Tests demonstrate complete user workflows (quickstart manual steps; optional E2E)
- [x] Test code follows same simplicity principles

## Project Structure

### Documentation (this feature)
```
specs/005-add-the-camera/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (README only; no new API)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
app/
├── api/                 # Existing rooms, participants API
├── classroom/[id]/      # Classroom page (reads mirror from URL)
├── components/          # VideoOptionsScreen, DevicePreview, Lobby, Classroom, VideoFeed
└── page.tsx             # Lobby; join with options.mirror

lib/
├── daily-config.ts
├── daily-utils.ts
├── mirrored-video-track.ts   # Stream-level mirror (existing)
├── types.ts
└── utils.ts

tests/
├── contract/            # No new contracts for 005
├── integration/         # Playwright E2E
└── unit/
    └── components/      # VideoOptionsScreen, DevicePreview tests
```

**Structure Decision**: Single Next.js app (App Router). Feature 005 touches existing app/components (VideoOptionsScreen, DevicePreview) and possibly app/page, app/classroom/[id]/page, app/components/Classroom, VideoFeed, Lobby. No new routes or API endpoints.

## Phase 0: Outline & Research

Completed. **Output**: [research.md](./research.md)

- Decision 1: Default mirror **off** in both video-options and device-setup.
- Decision 2: Reuse both existing contexts; no new surfaces.
- Decision 3: Retain stream-level mirror and fixed-at-join (existing implementation).
- Decision 4: Camera unavailable does not block proceed (existing behavior).

## Phase 1: Design & Contracts

Completed.

- **data-model.md**: Camera preview and mirror preference as in-memory/URL concepts; no new persistence.
- **contracts/**: No new API; [contracts/README.md](./contracts/README.md) documents that.
- **quickstart.md**: Manual verification steps for preview in both contexts, default mirror off, stream-level, no in-call toggle, camera unavailable can proceed.
- **Contract tests**: None (no new endpoints).

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base.
- No new API contracts → no new contract test tasks.
- Data model is state/URL only → no new entity implementation tasks; tasks will update existing components.
- From quickstart and FRs: (1) Set mirror default to off in VideoOptionsScreen and DevicePreview. (2) Ensure both show live preview and mirror toggle with clear state. (3) Confirm mirror at join is passed and applied (stream-level, fixed at join). (4) Confirm no in-call mirror toggle. (5) Confirm camera unavailable does not block proceed.
- Unit tests: Update or add tests for default mirror off and both contexts.
- Optional: quickstart validation or E2E scenario.

**Ordering Strategy**:
- Tests before implementation where changing default or behavior (TDD).
- Component changes can be parallel where files differ (VideoOptionsScreen vs DevicePreview).
- Dependency order: default + UI alignment first; then confirm join/stream behavior if any code path changes.

**Estimated Output**: Approximately 6–12 numbered tasks (default-off change, tests, quickstart check). No contract tasks.

**IMPORTANT**: Phase 2 is executed by the /tasks command, NOT by /plan.

## Phase 3+: Future Implementation

**Phase 3**: /tasks command creates tasks.md  
**Phase 4**: Implementation (execute tasks per constitution)  
**Phase 5**: Validation (run tests, execute quickstart.md)

## Error handling: “Failed to access camera/microphone” when permissions are granted

**Problem**: Users who have already granted browser permissions still see “Failed to access camera/microphone. Please check permissions.” because we showed a single generic message for every `startCamera()` failure.

**Plan (implemented)**:
1. **Parse the real error** in `lib/daily-utils.ts`:
   - **DOMException**: `NotAllowedError` → permission denied; `NotFoundError` → no device; `NotReadableError` / `AbortError` → device in use.
   - **Daily load failures**: Messages containing “call object bundle”, “call-machine”, “_daily.instances” → “Video system didn’t load in time. Please try again.” (not “check permissions”).
   - **Network/timeout/token/room full**: Keep existing mapping.
2. **Use parsed message in UI**: In DevicePreview and VideoOptionsScreen, call `parseDailyError(err)` in the `startCamera()` catch and set error to `parsed.message` instead of the generic permission line.
3. **Try again**: When start fails, show the parsed message and a “Try again” button so users can retry (e.g. after closing another app or refreshing) without reopening the modal.

**Outcome**: Users see an accurate message (permission denied vs device in use vs load failure vs no device) and can use “Try again” when it’s retryable.

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

No violations. No table entries.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
