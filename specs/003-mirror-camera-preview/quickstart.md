# Quickstart: Mirror Camera Preview

**Feature**: 003-mirror-camera-preview  
**Date**: 2026-02-05

## Prerequisites

- App running (e.g. `npm run dev`)
- Browser with camera access
- Device preview available from the lobby (e.g. “Device Setup” or similar entry point)

## Verification Steps

1. **Open device preview**
   - From the main lobby, open the Device Setup / camera preview screen so the local camera feed is visible.

2. **Confirm mirror control exists**
   - Locate the mirror/flip control (e.g. “Mirror preview” checkbox or “Flip video” toggle).
   - Default state: mirror **on** (preview looks selfie-style, horizontally flipped).

3. **Toggle mirror off**
   - Turn mirror off.
   - **Expected**: Preview updates immediately to unmirrored (camera-native) view.

4. **Toggle mirror on**
   - Turn mirror on again.
   - **Expected**: Preview updates immediately to mirrored (selfie-style) view.

5. **No reload required**
   - After each toggle, the video should update without reloading the page or reconnecting the camera.

## Manual Test Checklist

- [ ] Mirror control is visible on the Device Setup screen.
- [ ] Default is mirrored (on).
- [ ] Turning mirror off shows unmirrored preview.
- [ ] Turning mirror on shows mirrored preview.
- [ ] Changes apply immediately (no refresh/reconnect).

## Automated Tests (when added)

- Unit/component test: DevicePreview renders mirror toggle; toggling updates preview container class/style (e.g. scaleX(-1) applied when mirror is on).
- No API or contract tests required for this feature.
