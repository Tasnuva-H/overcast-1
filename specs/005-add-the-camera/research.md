# Research: Camera Preview with Toggle Mirror UI

**Feature**: 005-add-the-camera  
**Date**: 2026-02-05  
**Status**: Complete

## Context

This feature specifies camera preview and mirror toggle behavior that partially overlaps with 004-video-options-screen. The codebase already has: VideoOptionsScreen (video-options screen), DevicePreview (device-setup modal), live preview in both, mirror toggle in both, and stream-level mirror via custom track (lib/mirrored-video-track.ts). Spec 005 clarifications add: mirror default **off**, both contexts required, mirror fixed at join, stream-level when on.

## Decision 1: Default mirror state

**Requirement**: Mirror toggle MUST default to off (unmirrored) when the user first sees the preview in either the video-options screen or the device-setup modal.

**Options considered**:
- **A. On (mirrored) by default**: Matches many consumer apps (selfie-style). Rejected per spec clarification.
- **B. Off (unmirrored) by default**: Spec clarification: "Off (unmirrored) by default; preview starts unmirrored unless the user turns it on."
- **C. Remember last**: Would require persisting or propagating state between the two contexts; adds complexity. Deferred unless product requests it.

**Decision**: B — Default to **off (unmirrored)** in both VideoOptionsScreen and DevicePreview. On first render of each context, mirror toggle state is false; preview shows unmirrored feed until the user turns mirror on.

**Rationale**: Clarification is explicit. Single source of truth per screen (each context can default independently; no cross-context sync required for "first see" behavior).

## Decision 2: Where preview and toggle appear (alignment with 004)

**Requirement**: Live camera preview and mirror toggle MUST appear in both (1) video-options screen and (2) device-setup modal.

**Current state**: Feature 004 already implements preview and mirror in both places. VideoOptionsScreen shows Daily-based preview and a mirror checkbox; DevicePreview shows preview and mirror checkbox.

**Decision**: No new surfaces. Ensure both existing components expose live preview and mirror toggle that meet FR-001–FR-005. If either is missing the toggle or preview, add it; otherwise align defaults and labels.

**Rationale**: Spec 005 clarifies "Both: on the video-options screen and in the device-setup modal." Reuse existing UI; no new routes or modals.

## Decision 3: Stream-level mirror and fixed-at-join

**Requirement**: When mirror is on at join, others see the user mirrored (stream-level). Mirror is fixed at join; no in-call mirror toggle.

**Current state**: Feature 004 / prior work implemented stream-level mirror via custom canvas track (createMirroredVideoTrack, startCustomTrack in Classroom) and mirror preference passed via URL (mirror=true|false). In-call mirror toggle is not present.

**Decision**: Retain current implementation. Mirror preference from video-options (at "Enter room") is passed to the classroom and applied to the published stream; no in-call control. No new APIs or track pipeline.

**Rationale**: Aligns with spec clarifications (stream-level when on, fixed at join). No research spike required.

## Decision 4: Camera unavailable behavior

**Requirement**: If the camera is unavailable or access is denied, the user MUST still be able to proceed (e.g. join or continue); UI MAY show a placeholder or message.

**Current state**: VideoOptionsScreen and DevicePreview show loading/placeholder when camera is not ready; user can still click "Enter room" or close device modal.

**Decision**: Keep existing behavior. Ensure "Enter room" and device-setup dismissal are not disabled when camera fails; show a clear message (e.g. "Camera unavailable. You can still continue.") where applicable.

**Rationale**: FR-006 and edge case already specified; implementation exists.

## NEEDS CLARIFICATION

None. All spec clarifications and requirements are actionable.
