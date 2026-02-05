# Implementation Plan: Mirror Camera Preview

**Branch**: `003-mirror-camera-preview` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/Users/tasnuvahuda/Desktop/Overclock/Code/Practice/overcast/specs/003-mirror-camera-preview/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → ✅ Found: spec.md
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ No NEEDS CLARIFICATION; Clarifications section present
3. Fill the Constitution Check section based on the content of the constitution document.
   → ✅ Completed below
4. Evaluate Constitution Check section below
   → No violations
5. Execute Phase 0 → research.md
   → ✅ research.md generated; no unresolved unknowns
6. Execute Phase 1 → data-model.md, quickstart.md (no new API → no contracts/)
   → ✅ data-model.md, quickstart.md created
7. Re-evaluate Constitution Check section
   → No new violations
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
   → ✅ Described below
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 8. Phase 2 (tasks.md) is executed by the /tasks command.

## Summary
Add a user-controlled mirror (flip) option to the camera preview in the Device Setup screen. When enabled, the preview is displayed horizontally flipped (selfie-style) via CSS transform; default is mirrored. No new APIs or persistence; single-component change in `app/components/DevicePreview.tsx`.

## Technical Context
**Language/Version**: TypeScript/JavaScript with Next.js 15.5.4, React 19.1.0  
**Primary Dependencies**: Existing stack (Daily Video, @daily-co/daily-react, Tailwind CSS); no new dependencies  
**Storage**: N/A (mirror state is in-memory UI state only)  
**Testing**: Jest with React Testing Library for component tests; optional unit test for mirror toggle  
**Target Platform**: Web browsers (same as existing app), Vercel  
**Project Type**: web — Next.js App Router; this feature is a UI enhancement only  
**Performance Goals**: No new performance targets; mirror is CSS-only, negligible cost  
**Constraints**: Preview-only; no change to stream sent to Daily or to other participants  
**Scale/Scope**: Single component (DevicePreview); single boolean state; no backend

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity First**: Does this feature use the simplest approach?
- [x] Solution starts with simplest working approach (CSS transform for mirror; no video pipeline changes)
- [x] No complex patterns introduced
- [x] No premature optimization (no persistence, no server round-trip)

**Single File Preference**: Are we minimizing file count without sacrificing clarity?
- [x] All changes contained in `app/components/DevicePreview.tsx`
- [x] No new files required (optional: one-line doc in docs/ if desired)

**Comment-Driven Development**: Will the code be educational for newcomers?
- [x] Comment explaining WHY mirror defaults to on (selfie-style expectation)
- [x] Comment explaining that mirror is display-only (CSS), not stream change

**Newcomer-Friendly Architecture**: Is the design approachable for junior developers?
- [x] Clear naming: e.g. `mirrorEnabled`, “Mirror preview”
- [x] Standard React state + conditional class/style; no new abstractions

**Test-Driven Clarity**: Do tests serve as living documentation?
- [x] Optional component test: toggle mirror, assert container has flip class/style when on
- [x] Quickstart.md provides manual verification steps

## Project Structure

### Documentation (this feature)
```
specs/003-mirror-camera-preview/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```
No `contracts/` for this feature (no new API endpoints).

### Source Code (repository root)
No new directories. Only modified file:
- **app/components/DevicePreview.tsx** — add mirror state, toggle UI, and apply CSS transform (e.g. `scaleX(-1)` or Tailwind equivalent) to the camera preview container when mirror is on.

**Structure Decision**: Reuse existing Next.js App Router and component layout. All implementation lives in the existing DevicePreview component.

## Phase 0: Outline & Research
✅ **Output**: research.md — decision to use CSS transform for mirroring; no NEEDS CLARIFICATION.

## Phase 1: Design & Contracts
✅ **Output**: data-model.md (mirror state as boolean UI state), quickstart.md (verification steps).  
No API contracts (no new endpoints).  
Agent file update: optional; no new technologies.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do — DO NOT execute during /plan.*

**Task Generation Strategy**:
- One implementation task: add mirror toggle and apply transform in `DevicePreview.tsx`.
- One optional test task: component test for mirror toggle behavior (toggle on → container has flip style; toggle off → no flip).
- No contract tests (no new API).
- Quickstart steps → manual verification or optional E2E step.

**Ordering Strategy**:
- Implementation task can stand alone (single file).
- If test task added: test can be written before or after implementation (TDD or follow-up).

**Estimated Output**: 1–3 tasks in tasks.md (e.g. T001: Add mirror toggle to DevicePreview; T002 [P]: Component test for mirror toggle; T003: Run quickstart verification).

**IMPORTANT**: Phase 2 is executed by the /tasks command, NOT by /plan.

## Phase 3+: Future Implementation
**Phase 3**: /tasks command creates tasks.md  
**Phase 4**: Implementation (edit DevicePreview.tsx per tasks)  
**Phase 5**: Validation (run tests, execute quickstart.md)

## Complexity Tracking
No violations. Table left empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                   |

## Progress Tracking

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning approach described (tasks.md created by /tasks)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented: N/A

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
