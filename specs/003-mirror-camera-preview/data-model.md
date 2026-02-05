# Data Model: Mirror Camera Preview

**Feature**: 003-mirror-camera-preview  
**Date**: 2026-02-05  
**Status**: Complete

## Scope

This feature adds a single UI preference with no backend or persistence. No new API contracts or database entities.

## Client-Side State

### Mirror preference (preview only)

| Attribute    | Type    | Default | Description                                      |
|-------------|---------|---------|--------------------------------------------------|
| mirrorEnabled | boolean | true    | When true, camera preview is displayed mirrored (selfie-style). |

- **Lifecycle**: Exists only while the Device Setup / DevicePreview component is mounted. Not persisted across sessions.
- **Validation**: Boolean; no validation beyond on/off.
- **Storage**: React component state (e.g. `useState`) in `DevicePreview.tsx`.

## Entities

No new domain entities. Existing entities (User, Classroom, Participant) are unchanged. Mirror state is local UI state only.

## Type Definitions (TypeScript)

No new shared types required. A single state variable is sufficient, e.g.:

```ts
const [mirrorEnabled, setMirrorEnabled] = useState<boolean>(true);
```

Optional: if mirror preference is later persisted or shared, a small type can be added (e.g. in `lib/types.ts`) — out of scope for this feature.
