# Feature Specification: Mirror Camera Preview

**Feature Branch**: `003-mirror-camera-preview`
**Created**: 2026-02-05
**Status**: Draft
**Input**: Add a feature to the camera capture where the user can choose to flip the video so that it is mirrored.

## Execution Flow (main)
```
1. Parse user description from Input
   → ✅ Feature description provided: mirror/flip option in camera preview
2. Extract key concepts from description
   → ✅ Identified: camera capture, user choice, flip/mirror video
3. For each unclear aspect:
   → ✅ Clarifications section added below
4. Fill User Scenarios & Testing section
   → ✅ User flow: open device preview → toggle mirror → see mirrored video
5. Generate Functional Requirements
   → ✅ Testable requirements below
6. Identify Key Entities (if data involved)
   → ✅ Minimal: UI state only (mirror on/off)
7. Run Review Checklist
   → ✅ No implementation details; scope bounded
8. Return: SUCCESS (spec ready for planning)
```

---

## Clarifications

### Session 2026-02-05
- Q: Where does the mirror option appear? → A: In the existing Device Setup / camera preview screen (pre-call), alongside camera and microphone selection.
- Q: Should the mirror preference persist (e.g. into the classroom call)? → A: Mirror is for preview only; no requirement to persist into the live call unless we add it later.
- Q: Default state for mirror? → A: Mirrored (on) by default, since that matches how users expect to see themselves (selfie-style).

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
A user opening the device preview (camera capture) before joining a classroom can choose to flip the video so it appears mirrored (selfie-style). They can toggle this on or off and see the result immediately in the preview.

### Acceptance Scenarios
1. **Given** the user has opened the Device Setup / device preview screen, **When** they view the camera preview, **Then** they see a control to flip/mirror the video.
2. **Given** the mirror option is off, **When** the user turns mirror on, **Then** the preview updates to show a horizontally flipped (mirrored) image.
3. **Given** the mirror option is on, **When** the user turns mirror off, **Then** the preview shows the unmirrored (camera-native) image.
4. **Given** the user toggles mirror, **When** the change is made, **Then** the update is immediate with no need to reload or reconnect the camera.

### Edge Cases
- Mirror preference applies only to the local preview in Device Setup; it does not affect what other participants see in the call (that remains camera-native unless we specify otherwise later).

---

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST provide a user-controlled option to flip (mirror) the camera preview video in the Device Setup / device preview screen.
- **FR-002**: When mirror is enabled, the preview MUST display the video horizontally flipped (mirrored).
- **FR-003**: When mirror is disabled, the preview MUST display the video in its native (unmirrored) orientation.
- **FR-004**: The mirror setting MUST take effect immediately when toggled, without requiring camera reconnect or page refresh.
- **FR-005**: The default state for the mirror option MUST be “on” (mirrored), so users see a selfie-style view by default.

### Key Entities
- **Mirror state**: Boolean preference for the current device preview session (mirror on/off). No persistence required for this feature; UI state only.

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Clarifications documented

---

## Execution Status
- [x] User description parsed
- [x] Key concepts extracted
- [x] Clarifications added
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed
