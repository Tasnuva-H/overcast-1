# Feature Specification: Camera Preview with Toggle Mirror UI

**Feature Branch**: `005-add-the-camera`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "add the camera preview with toggle mirror UI"

## Clarifications

### Session 2026-02-05
- Q: When the user has "mirror" ON at join, should others in the call see this user's video mirrored? → A: Yes – stream-level; others in the call see this user's video mirrored (horizontally flipped) when mirror was on at join.
- Q: Where must the camera preview (with mirror toggle) appear? → A: Both: on the video-options screen and in the device-setup modal.
- Q: What should the default state of the mirror toggle be when the user first sees the preview? → A: Off (unmirrored) by default; preview starts unmirrored unless the user turns it on.
- Q: Once the user has entered the live call, can they change the mirror setting during the call? → A: No – fixed at join; mirror is set only before entering (on video-options / device-setup). In the call there is no mirror toggle; what was chosen at join applies for the whole call.

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Prioritize simplicity**: Favor straightforward solutions that newcomers can understand
5. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs
   - Complexity justification (when simple solutions won't work)

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a participant, I want to see a live preview of my camera and turn mirroring on or off with a clear control, so that I can check how I look and choose a mirrored (selfie-style) or unmirrored view before or while using video in the classroom.

### Acceptance Scenarios
1. **Given** the user is on the video-options screen or in the device-setup modal, **When** the preview is available, **Then** the user sees a live view of their camera feed.
2. **Given** the camera preview is visible, **When** the user uses the mirror toggle, **Then** the preview updates to show either a mirrored (horizontally flipped) or unmirrored view according to the toggle state.
3. **Given** the mirror toggle exists, **When** the user views the control, **Then** it is clear whether mirroring is currently on or off (e.g. label or state indicator).
4. **Given** the user has changed the mirror setting, **When** they proceed into the call or continue the flow, **Then** the chosen mirror preference is applied: when mirror was on at join, the user’s video is shown mirrored to all participants in the live call (stream-level); when mirror was off, the video is shown unmirrored to all.

### Edge Cases
- What happens when the camera is unavailable or permission is denied? The user MUST still be able to proceed (e.g. join or continue) without being blocked; the preview may show a placeholder or message.
- How does the system behave when the user toggles mirror repeatedly? The preview MUST update each time to reflect the current toggle state.
- During the live call, the user cannot change mirror; the setting is fixed at join. No in-call mirror control is required.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: The system MUST show a live camera preview to the user in both of the following contexts: the video-options screen (after “Join Classroom”, before entering the room) and the device-setup (device-preview) modal.
- **FR-002**: The system MUST provide a mirror toggle (or equivalent control) that clearly indicates its current state (on/off) in both the video-options screen and the device-setup modal. The toggle MUST default to off (unmirrored) when the user first sees the preview in either context.
- **FR-003**: When the user turns the mirror toggle on, the preview MUST display a horizontally flipped (mirrored) image of the camera feed.
- **FR-004**: When the user turns the mirror toggle off, the preview MUST display the camera feed without horizontal flip.
- **FR-005**: The system MUST allow the user to change the mirror setting at any time while the preview is visible, and the preview MUST update immediately to reflect the change.
- **FR-006**: If the camera is unavailable or access is denied, the system MUST NOT prevent the user from continuing the flow (e.g. joining the classroom); the UI MAY show a message or placeholder instead of the live preview.
- **FR-007**: When the user joins the live call with mirror on, the system MUST deliver the user’s video to other participants as mirrored (horizontally flipped). When mirror was off at join, the system MUST deliver the user’s video unmirrored to other participants.
- **FR-008**: The mirror setting MUST be fixed at join time. The system MUST NOT offer a mirror toggle during the live call; the value chosen on the video-options screen (or device-setup) applies for the entire call.

### Key Entities
- **Camera preview**: The live view of the user’s camera shown on the video-options screen and in the device-setup modal.
- **Mirror preference**: The user’s choice of mirrored or unmirrored view; it may be used when showing the user’s video in the call or in other preview contexts.

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---
