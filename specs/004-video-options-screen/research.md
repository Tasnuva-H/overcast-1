# Research: Video Options Screen

**Feature**: 004-video-options-screen  
**Date**: 2026-02-05  
**Status**: Complete

## Decision 1: Where to insert the video options screen

**Options considered**:
- **A. New route** (e.g. `/classroom/[id]/video-options`): User clicks Join Classroom → navigate to video-options → user clicks Enter room → navigate to classroom. Requires new page and passing user/classroom via state or query.
- **B. In-Lobby state + component**: User clicks Join Classroom → Lobby shows a video options view (full-screen or modal) with preview and options; on "Enter room" Lobby calls existing `onJoinClassroom` and navigates. No new route; one new component and Lobby state.

**Decision**: B — In-Lobby state and a dedicated Video Options component (modal or full-screen overlay). Same app surface (Lobby); no new URL; minimal change to page.tsx (Lobby still owns the flow, just defers the final join until after video options).

**Rationale**: Keeps routing simple (no new page), reuses existing Lobby → classroom navigation, and keeps "video options" clearly a step in the join flow rather than a separate page.

## Decision 2: Camera preview and mirror behaviour (stream-level)

**Requirements**: Mirror must (1) show the user a mirrored preview when on, and (2) **affect the video stream sent to other participants**—when a user has mirror on, others must see that user mirrored. So mirror is not display-only; it must apply to the actual capture/stream.

**Options considered**:
- **CSS-only on local view**: Rejected for live call—others would not see the mirrored video.
- **Apply mirror to the video track before sending**: Use a canvas or video processing step to flip the frame and send the mirrored stream (e.g. replace the track with a processed track). Daily.co / browser APIs may support custom video tracks.
- **Daily.co API**: Check whether Daily exposes a “mirror my video” or video-effect option that affects the published stream; if yes, use it for the live call. Preview can still use CSS for consistency.

**Decision**: Mirror must be implemented at **stream level** for the live call so that the video other participants receive is mirrored when the user has mirror on. For preview (video options screen and Device Preview), mirror can be applied as CSS so the user sees the effect immediately; the same mirror preference is then applied to the outgoing stream when joining the call (e.g. via Daily API if available, or via a custom video track that applies horizontal flip before publishing). Research Daily.co documentation for “video effects” or “mirror” on published video; fallback is custom track processing (e.g. CanvasCapture + MediaStream).

## Decision 3: "Filters" as non-functional link

**Decision**: Render "Filters" as a link-styled control (e.g. `<button type="button">` or `<span role="button">` with `cursor: pointer` and underline/link styling). On click: no navigation, no href; optionally `preventDefault` and no-op or show a short "Coming soon" message. No route, no modal, no API.

**Rationale**: Spec explicitly requires "does not link anywhere" and "just another option in the list". Simplest is a button/link lookalike with an empty or placeholder handler.

## Decision 4: Mirror in both places and in the call

**Decision**: Implement mirror toggle (1) on the Video Options screen and (2) in the DevicePreview modal. In preview, mirror can be shown via CSS. The chosen mirror preference is passed when the user enters the room and applied so that **the published video stream is mirrored or unmirrored** (others see the user accordingly). In the classroom, the local participant’s tile is also displayed mirrored/unmirrored to match. Implementation must apply mirror to the outgoing track in the live call (Daily API or custom track processing). Mirror is fixed at join time (no in-call toggle).

## Decision 5: No direct lobby-to-classroom; Back/Cancel; classroom name; camera unavailable

**Decision** (from clarifications): No direct lobby-to-classroom path—user always sees camera preview (video options) immediately after "Join Classroom". Back/Cancel is required and returns user to lobby. Video options screen must show which classroom the user is about to join (e.g. classroom name). When camera is unavailable or denied, show placeholder/message but still allow "Enter room" (do not block on camera).

## NEEDS CLARIFICATION

None. Scope and placement are clear from spec and clarifications.
