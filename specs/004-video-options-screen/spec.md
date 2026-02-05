# Feature Specification: Video Options Screen

**Feature Branch**: `004-video-options-screen`
**Created**: 2026-02-05
**Status**: Draft
**Input**: Add a screen between the "Join Classroom" button and actually entering the room where the user is presented with "video options". Add a mirror option as a toggle. Add the text "Filters" as a link option that does not link anywhere (just another option in the list). The mirror option flips the camera capture so it is mirrored. This mirror option should also be available during the camera preview (Device Setup) as a toggle.

## Execution Flow (main)
```
1. Parse user description from Input
   → ✅ Feature description provided
2. Extract key concepts
   → ✅ Video options screen, mirror toggle, Filters placeholder, camera preview
3. Clarifications section added below
4. User scenarios and requirements filled
5–8. Review checklist passed
```

---

## Clarifications

### Session 2026-02-05
- Q: When does the video options screen appear? → A: Immediately after the user clicks "Join Classroom" on a classroom card. The user MUST see the camera preview (video options) right after clicking "Join Classroom", where they can change settings (mirror, Filters). There is no direct lobby-to-classroom path. Flow: Lobby → user clicks "Join Classroom" → camera preview / video options screen → user clicks "Enter room" → classroom page.
- Q: What appears on the video options screen? → A: A "video options" experience that includes: (1) a camera preview so the user can see themselves, (2) a Mirror toggle that flips the preview when on, (3) the text "Filters" presented as a link-style option in the same list as the mirror option. "Filters" does not navigate or perform any action; it is a placeholder option for future use.
- Q: Does the mirror setting persist from video options into the room or from Device Preview into the room? → A: Yes. When the user has the mirror toggle set to mirror (on), that preference MUST persist into the live call. The user’s own video (local participant) in the classroom view MUST be displayed mirrored, and **the video stream sent to other participants MUST also be mirrored**—so others see that user mirrored when the user has mirror on. If the toggle is off, both the local view and the stream others receive are unmirrored. Same applies when the user set mirror in Device Preview and then joins a room. So mirror affects the actual capture/stream, not just local display.
- Q: Default for mirror toggle? → A: Mirrored (on) by default on both the video options screen and the Device Preview, for a selfie-style view.
- Q: Can the user change the mirror setting after they have already joined the classroom (and have that change apply for both their view and what others see)? → A: No. Mirror is fixed at join time (set on video options or Device Preview). Once in the room, the user cannot change it for that session.
- Q: If the camera fails or is denied on the video options screen, can the user still proceed to the classroom? → A: Yes. The user can still click "Enter room" and join; show a placeholder or message where the preview would be; mirror toggle and Filters remain available.
- Q: When the user is on the video options screen, must there be a way to go back to the lobby without joining? → A: Yes. A "Back" or "Cancel" control is required; it returns the user to the lobby classroom grid without joining.
- Q: When the user sets mirror in Device Preview only and later joins without going through video options—how should mirror be determined? → A: There must not be a flow where the user goes directly from lobby to classroom. The user MUST see the camera preview (video options) right after they click "Join Classroom", where they can change settings (mirror, etc.). So the join flow is always: Lobby → Join Classroom → camera preview / video options screen → Enter room. Mirror preference is set on that screen at join time.
- Q: On the video options screen, should the UI show which classroom the user is about to join? → A: Yes. Show the classroom name (or identifier) so the user knows which room they are about to enter.

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
When a user clicks "Join Classroom" on a classroom card, they see a video options screen before entering the room. On this screen they can see their camera preview, turn mirror on/off (flip the video), and see a "Filters" option (non-functional). They can then proceed to enter the room. The same mirror toggle is available in the existing Device Setup / camera preview modal.

### Acceptance Scenarios
1. **Given** the user has selected a classroom and clicks "Join Classroom", **When** the app responds, **Then** the user is shown a video options screen (not taken directly to the classroom).
2. **Given** the user is on the video options screen, **When** they view the options, **Then** they see which classroom they are about to join (e.g. classroom name), a camera preview, and at least two options: a Mirror toggle and "Filters" (styled as a link).
3. **Given** the Mirror toggle is on, **When** the user views the preview, **Then** the preview is horizontally flipped (mirrored). When they turn the toggle off, **Then** the preview is unmirrored.
4. **Given** the user clicks or taps "Filters", **When** the action is performed, **Then** nothing happens (no navigation, no modal); it is a placeholder.
5. **Given** the user is in the Device Setup / camera preview modal (Test Camera & Microphone), **When** they view the options, **Then** they see a Mirror toggle that flips the camera preview when toggled; default is mirrored (on).
6. **Given** the user is on the video options screen, **When** they choose to proceed (e.g. "Enter room" or "Continue"), **Then** they are taken to the classroom page.
6b. **Given** the user is on the video options screen, **When** they click "Back" or "Cancel", **Then** they are returned to the lobby classroom grid without joining the classroom.
7. **Given** the user had the Mirror toggle set to on when they entered the room, **When** other participants view that user’s video in the call, **Then** they see that user’s video mirrored (horizontally flipped). When the user has mirror off, **Then** others see that user’s video unmirrored.
8. **Given** the user has joined the room with a mirror preference set at join time, **Then** that preference applies for the duration of the call; there is no in-call mirror toggle—the user cannot change mirror after entering the room.

### Edge Cases
- If the camera is unavailable or denied on the video options screen, show a clear message or placeholder where the preview would be; mirror toggle and Filters option remain visible and usable. The user MUST still be able to proceed to "Enter room" and join the classroom (do not block on camera).
- Mirror state on the video options screen and in Device Preview are independent per screen. The authoritative mirror value for the call is the one set on the video options screen (the camera preview shown after "Join Classroom") when the user clicks "Enter room"; there is no direct lobby-to-classroom flow.
- Mirror cannot be changed during the live call; the preference set at join time applies for the entire session. No in-call mirror toggle is required.

---

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST show the camera preview (video options screen) immediately after the user clicks "Join Classroom" on a classroom card. There MUST be no direct lobby-to-classroom path; the user always sees this screen and can change settings (mirror, etc.) before proceeding to the classroom page.
- **FR-002**: The video options screen MUST display a camera preview (live capture) so the user can see the effect of the mirror option.
- **FR-002b**: The video options screen MUST display which classroom the user is about to join (e.g. classroom name or identifier such as "Joining: Cohort 1") so the user knows which room they are entering.
- **FR-003**: The video options screen MUST include a Mirror toggle that, when on, displays the camera preview horizontally flipped (mirrored); when off, displays unmirrored. Default is on (mirrored).
- **FR-004**: The video options screen MUST include the text "Filters" as an option styled like a link, in the same list/group as the Mirror option. Selecting "Filters" MUST perform no navigation or action (placeholder).
- **FR-005**: The video options screen MUST provide a way for the user to proceed to the classroom (e.g. "Enter room" or "Continue" button) that navigates to the classroom page.
- **FR-005b**: The video options screen MUST provide a "Back" or "Cancel" control that returns the user to the lobby classroom grid without joining the classroom.
- **FR-006**: The existing Device Setup / camera preview modal MUST include a Mirror toggle that flips the camera preview when toggled; default is on (mirrored). (Aligns with 003-mirror-camera-preview; may be implemented together.)
- **FR-007**: When the user proceeds to the classroom (e.g. “Enter room”), the current mirror preference MUST persist into the live call: (1) the local participant’s video in the classroom view MUST be displayed mirrored or unmirrored according to that preference, and (2) **the video stream sent to other participants MUST be mirrored or unmirrored the same way**—so when a user has mirror on, others see that user mirrored; when mirror is off, others see that user unmirrored. Mirror therefore affects the actual video capture/stream, not just local display.
- **FR-008**: When the camera is unavailable or denied on the video options screen, the system MUST show a placeholder or message where the preview would be, keep the Mirror toggle and Filters option visible and usable, and MUST still allow the user to proceed to "Enter room" and join the classroom (do not block entry on camera).

### Key Entities
- **Video options state**: Local UI state for the video options screen (e.g. mirror on/off). When the user proceeds, mirror preference is passed to the classroom and applied so that both local display and the outgoing stream are mirrored or unmirrored accordingly.
- **Mirror preference**: Boolean; applies in preview (video options and Device Preview), persists into the live call, and controls both how the user sees themselves and how others see that user (stream-level).

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details (no tech stack in spec)
- [x] Focused on user value and flows
- [x] All mandatory sections completed

### Requirement Completeness
- [x] Clarifications documented
- [x] Requirements testable and unambiguous
- [x] Scope bounded (video options screen + mirror in Device Preview; Filters placeholder)

---

## Execution Status
- [x] User description parsed
- [x] Key concepts extracted
- [x] Clarifications added
- [x] User scenarios defined
- [x] Requirements generated
- [x] Review checklist passed
