# Data Model: Video Options Screen

**Feature**: 004-video-options-screen  
**Date**: 2026-02-05  
**Status**: Complete

## Scope

This feature adds a new UI step (video options screen) and options (mirror toggle, Filters placeholder). No backend, no new API, no persistence.

## Client-Side State

### Lobby / join flow

| Concept | Type | Description |
|--------|------|-------------|
| Pending join | `{ classroomId: string, user: AppUser, classroomName?: string } \| null` | When non-null, Lobby shows the video options screen instead of the classroom grid. VideoOptionsScreen receives classroomId (and classroom name for display). On "Enter room", Lobby calls `onJoinClassroom` with classroomId, user, and mirror preference; on "Back"/"Cancel", Lobby clears pending join and returns to grid. There is no direct lobby-to-classroom path. |

### Video options screen (local to component)

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| mirrorEnabled | boolean | true | When true, preview is displayed mirrored. This preference is passed when proceeding to the room and applied so the **outgoing video stream** is also mirrored (others see the user mirrored). |

### Device Preview (existing)

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| mirrorEnabled | boolean | true | Same as above. The authoritative mirror value for the call is the one set on the video options screen when the user clicks "Enter room" (there is no direct lobby-to-classroom flow). |

Mirror preference is passed with navigation to the classroom and applied at stream level (outgoing video) and for local display.

## Entities

No new domain entities. Reuse existing `AppUser`, `Classroom`; no new API contracts.

## Type Definitions (TypeScript)

- Reuse `AppUser`, `Classroom` from `lib/types.ts`.
- Video options screen props: e.g. `classroomId: string`, `classroomName: string`, `user: AppUser`, `onProceed: (mirror: boolean) => void`, `onBack: () => void` (Back/Cancel is required).
- No new shared types required beyond existing Lobby/classroom types.
