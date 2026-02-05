# Quickstart: Camera Preview with Toggle Mirror UI

**Feature**: 005-add-the-camera  
**Date**: 2026-02-05

## Prerequisites

- App running (e.g. `npm run dev`)
- Browser with camera access (or ability to deny for unavailable test)
- User has entered name and role in the Lobby and sees the classroom grid

## Verification Steps

### 1. Camera preview on video-options screen

- In the Lobby, select a classroom and click **Join Classroom**.
- **Expected**: Video options screen appears with a live camera preview (or placeholder if camera unavailable).
- **Expected**: A **Mirror** toggle is visible and clearly indicates its state (on/off). **Default is off** (unmirrored) when you first see the screen.

### 2. Mirror toggle on video-options screen

- On the video options screen, turn the Mirror toggle **on**. **Expected**: Preview updates to mirrored (horizontally flipped).
- Turn the toggle **off**. **Expected**: Preview updates to unmirrored.
- **Expected**: No page reload or camera reconnect when toggling; preview updates immediately.

### 3. Camera preview and mirror in device-setup modal

- From the Lobby (after name/role entered), open the device-setup (Device Preview / Test Camera & Microphone) modal.
- **Expected**: Live camera preview is shown (or placeholder if unavailable).
- **Expected**: A Mirror toggle is present. **Default is off** (unmirrored) when you first open the modal.
- Toggle mirror on and off. **Expected**: Preview flips and restores immediately.

### 4. Mirror preference at join (stream-level)

- On the video options screen, set Mirror **on**, then click **Enter room**.
- Open the same room in a second browser or device (second participant).
- **Expected**: The second participant sees the first participant’s video **mirrored** (horizontally flipped).
- Leave; re-join with Mirror **off** (or join from a fresh session with mirror off).
- **Expected**: The second participant sees the first participant’s video **unmirrored**. Mirror affects the stream others receive.

### 5. No in-call mirror toggle

- Join a classroom (with mirror on or off).
- **Expected**: In the live call there is **no** mirror toggle on the local video tile or in settings. The mirror setting is fixed for the whole call (whatever was chosen at join).

### 6. Camera unavailable — can still proceed

- (Optional: deny camera permission or use a device with no camera.) On the video options screen or in the device-setup modal, if the camera is unavailable, a placeholder or message should appear.
- **Expected**: You can still click **Enter room** or close the device modal and continue; entry is not blocked on camera.

## Manual Test Checklist

- [ ] Video options screen shows live camera preview (or placeholder) and Mirror toggle; **default mirror is off**.
- [ ] Device-setup modal shows live camera preview (or placeholder) and Mirror toggle; **default mirror is off**.
- [ ] Toggling mirror updates the preview immediately in both contexts.
- [ ] Mirror state is clearly indicated (e.g. label or checkbox state) in both contexts.
- [ ] With mirror on at join, other participants see this user’s video mirrored; with mirror off, unmirrored (stream-level).
- [ ] No mirror toggle is offered during the live call (fixed at join).
- [ ] When camera is unavailable, user can still proceed (Enter room or close modal).
