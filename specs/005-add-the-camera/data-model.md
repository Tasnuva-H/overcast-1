# Data Model: Camera Preview with Toggle Mirror UI

**Feature**: 005-add-the-camera  
**Date**: 2026-02-05

## Scope

This feature does not introduce new persistent entities or API payloads. It constrains **in-memory and URL state** for camera preview and mirror preference across the existing join flow.

## Concepts

### Camera preview

- **Definition**: The live view of the user’s camera shown in the UI.
- **Where**: Video-options screen (after “Join Classroom”, before entering the room) and device-setup (DevicePreview) modal.
- **State**: No separate stored entity; presence is determined by which screen/modal is shown and whether the camera stream is available. If the camera is unavailable, a placeholder or message may be shown; the user can still proceed.

### Mirror preference

- **Definition**: The user’s choice of mirrored (horizontally flipped) or unmirrored view for their video.
- **Attributes**:
  - **Value**: Boolean — `true` = mirrored, `false` = unmirrored.
  - **Default**: `false` (unmirrored) when the user first sees the preview in either context (per spec).
- **Lifecycle**:
  - Set by the user via the mirror toggle on the video-options screen or in the device-setup modal.
  - **Authoritative at join**: The value in effect when the user clicks “Enter room” (from the video-options screen) is passed into the classroom and applied for the entire call.
  - Not changeable during the live call (fixed at join).
- **Propagation**: Passed from Lobby/VideoOptionsScreen to the classroom via existing join flow (e.g. URL query such as `mirror=true` or `mirror=false`); classroom page and Classroom component consume it and apply it to local display and to the published video stream (stream-level when mirror is on).

### Relationship

- **Mirror preference** applies to **camera preview** (preview reflects toggle state) and to the **published video** in the call when the user joins with that preference.

## Validation rules (from spec)

- Mirror toggle MUST default to off in both video-options and device-setup when the user first sees the preview.
- Mirror preference at join MUST be applied for the whole call; no in-call mirror control.
- When mirror is on at join, the system MUST deliver the user’s video to other participants as mirrored (stream-level).

## Storage

- **No new persistence.** Mirror preference is in-memory (component state) until join; at join it is passed via URL (or equivalent) into the classroom and used for the session only.
