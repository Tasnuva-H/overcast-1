# Quickstart: Video Options Screen

**Feature**: 004-video-options-screen  
**Date**: 2026-02-05

## Prerequisites

- App running (e.g. `npm run dev`)
- Browser with camera access
- User has entered name and role in the Lobby and sees the classroom grid

## Verification Steps

### 1. Video options screen appears after "Join Classroom"

- In the Lobby, select a classroom and click **Join Classroom**.
- **Expected**: A video options screen appears (full-screen or modal). You do **not** go straight to the classroom page.
- **Expected**: The screen shows which classroom you are about to join (e.g. classroom name), a camera preview, and options (Mirror toggle and "Filters").

### 2. Mirror toggle on video options screen

- On the video options screen, find the **Mirror** toggle. Default should be on (preview looks mirrored / selfie-style).
- Turn the toggle off. **Expected**: Preview updates to unmirrored.
- Turn the toggle on. **Expected**: Preview updates to mirrored.
- **Expected**: No page reload or camera reconnect when toggling.

### 3. "Filters" option

- On the video options screen, find the **Filters** option (styled like a link).
- Click or tap "Filters". **Expected**: Nothing happens (no navigation, no new page, no modal). It is a placeholder.

### 4. Proceed to classroom

- On the video options screen, click **Enter room** (or equivalent).
- **Expected**: You are taken to the classroom page and join the room as before.

### 5. Mirror in Device Preview

- From the Lobby (after name/role entered), click **Test Camera & Microphone** to open the Device Setup modal.
- **Expected**: A Mirror toggle is present. Default is on (mirrored).
- Toggle off and on. **Expected**: Preview flips and restores immediately.

### 6. Mirror persists and others see it (stream-level)

- Join a classroom with **Mirror on** (from video options screen), then open the same room in a second browser or device (second participant).
- **Expected**: The second participant sees the first participant’s video **mirrored** (horizontally flipped).
- Leave and re-join with **Mirror off** (or use a fresh join with mirror off).
- **Expected**: The second participant sees the first participant’s video **unmirrored**. So mirror affects the video stream others receive, not just the local view.

### 7. Back/Cancel from video options (required)

- On the video options screen, click **Back** or **Cancel**.
- **Expected**: You return to the Lobby classroom grid without joining; no navigation to the classroom.

### 8. Camera unavailable — can still proceed

- (Optional: deny camera permission or use a device with no camera.) On the video options screen, if the camera is unavailable or denied, you should see a placeholder or message where the preview would be; Mirror toggle and Filters remain available.
- **Expected**: You can still click "Enter room" and join the classroom (entry is not blocked on camera).

## Manual Test Checklist

- [ ] Clicking "Join Classroom" shows video options screen (no direct lobby-to-classroom path).
- [ ] Video options screen shows classroom name (which room user is joining), camera preview, Mirror toggle, and "Filters".
- [ ] Mirror toggle on video options screen works; default is on.
- [ ] "Filters" is visible and styled like a link; clicking it does nothing.
- [ ] "Enter room" (or equivalent) navigates to the classroom.
- [ ] "Back" or "Cancel" returns to lobby without joining.
- [ ] When camera is unavailable, placeholder/message shown; user can still proceed to "Enter room".
- [ ] Device Preview modal has a Mirror toggle; default on; toggling works.
- [ ] With mirror on, other participants see that user’s video mirrored; with mirror off, others see it unmirrored (stream-level).

## Automated Tests (when added)

- Component test: VideoOptionsScreen renders preview, Mirror toggle, Filters, and proceed button.
- Component test: Mirror toggle toggles mirror class/style on preview container.
- Component test: Filters control has no href and does not navigate.
- Optional E2E: Lobby → Join Classroom → video options → Enter room → classroom page.
