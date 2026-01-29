# Components Directory

React components for the Overcast video classroom application, built with Daily.co integration and futuristic design.

## Structure

- `Lobby.tsx` - Main lobby with 6 classroom grid and pre-call device testing
- `Classroom.tsx` - Classroom video component with DailyProvider wrapper
- `VideoFeed.tsx` - Daily video integration using React hooks with device selection
- `ParticipantList.tsx` - Participant display using useParticipantIds() hook
- `InstructorControls.tsx` - Instructor-specific controls (mute, breakout rooms)
- `CameraSelector.tsx` - Camera selection dropdown for switching video inputs
- `MicrophoneSelector.tsx` - Microphone selection dropdown for switching audio inputs
- `DevicePreview.tsx` - Pre-call device testing and selection modal
- `ui/` - Shared UI components (buttons, modals, etc.)

## Daily.co Integration

Components use Daily React hooks for video functionality:

```typescript
import { useParticipantIds, useDaily, useDevices, useScreenShare } from '@daily-co/daily-react';
```

### Device Selection

The app provides comprehensive camera and microphone selection:

**In-Call Device Switching:**
- Click the settings gear icon (⚙️) on your local video feed
- Select from available cameras and microphones
- Changes apply immediately without reconnecting

**Pre-Call Device Testing:**
- Use the "Test Camera & Microphone" button in the lobby
- Preview your video and audio before joining
- Select preferred devices that will be used when joining

**Components:**
- `CameraSelector` - Standalone camera selection dropdown
- `MicrophoneSelector` - Standalone microphone selection dropdown
- `DevicePreview` - Full pre-call testing interface with live preview

**Daily.co APIs Used:**
- `useDevices()` - Enumerate cameras, microphones, and speakers
- `daily.setInputDevicesAsync()` - Switch input devices
- `daily.startCamera()` - Start local media preview

## Design System

All components follow the futuristic black/teal theme defined in `globals.css`:

- `.btn-primary` - Teal buttons for primary actions
- `.classroom-card` - Dark cards with teal hover effects
- `.video-container` - Video display containers
- `.instructor-panel` - Instructor control panels

## Constitutional Compliance

- **Single File Preference**: Related functionality kept together
- **Comment-Driven**: All non-trivial logic explained with WHY comments
- **Newcomer-Friendly**: Clear component names and prop interfaces
- **Educational**: Components serve as examples of Daily.co integration patterns
