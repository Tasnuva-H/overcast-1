# Research: Mirror Camera Preview

**Feature**: 003-mirror-camera-preview  
**Date**: 2026-02-05  
**Status**: Complete

## Decision: Use CSS transform for mirroring

**Rationale**:
- Mirroring is a display-only concern: we want the preview to look flipped to the user, not change the actual video stream sent to Daily.co.
- CSS `transform: scaleX(-1)` on the container of the local video element flips the image horizontally with no extra dependencies, no video re-encoding, and no impact on what other participants see.
- The existing stack (React, DailyVideo component, Tailwind) supports inline styles or Tailwind classes (e.g. Tailwind’s arbitrary value `scale-x-[-1]` or a wrapper div with `style={{ transform: 'scaleX(-1)' }}`).
- This is the simplest approach that meets the spec: one boolean state, one conditional class/style on the preview container.

**Alternatives considered**:
- **Daily.co API / video processing**: Daily does not expose a “mirror local preview” API; mirroring would require custom video processing (e.g. Canvas/WebGL). Rejected as overkill for a preview-only, client-side preference.
- **Persisting preference to backend**: Spec states mirror is preview-only with no persistence required. Rejected for this feature scope; can be added later if needed.

## Integration point

- **Component**: `app/components/DevicePreview.tsx` — the Device Setup / camera preview screen.
- **Change**: Add a mirror toggle (checkbox or button) and apply a horizontal flip (CSS transform) to the existing camera preview container when mirror is on. Default: mirror on (selfie-style).

## NEEDS CLARIFICATION

None; scope is bounded and approach is standard.
