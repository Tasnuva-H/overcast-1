'use client';

/**
 * VideoOptionsScreen Component
 *
 * WHY: There is no direct lobby-to-classroom path. The user MUST see this screen
 * (camera preview / video options) immediately after clicking "Join Classroom",
 * where they can change mirror and see Filters (placeholder) before entering the room.
 */

import React, { useState, useEffect, useRef } from 'react';
import { DailyProvider, useDaily, useLocalParticipant, DailyVideo } from '@daily-co/daily-react';
import { DailyCall } from '@daily-co/daily-js';
import { parseDailyError } from '@/lib/daily-utils';
import { AppUser } from '@/lib/types';

export interface VideoOptionsScreenProps {
  classroomId: string;
  classroomName: string;
  user: AppUser;
  onProceed: (mirror: boolean) => void;
  onBack: () => void;
}

/**
 * Inner content that uses Daily context (preview only)
 */
function VideoOptionsContent({
  classroomName,
  mirrorEnabled,
  setMirrorEnabled,
  onProceed,
  onBack,
}: {
  classroomName: string;
  mirrorEnabled: boolean;
  setMirrorEnabled: (v: boolean) => void;
  onProceed: (mirror: boolean) => void;
  onBack: () => void;
}) {
  const daily = useDaily();
  const localParticipant = useLocalParticipant();
  const [isStarted, setIsStarted] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startPreview = async () => {
    if (!daily) return;
    setCameraError(null);
    try {
      await daily.startCamera();
      setIsStarted(true);
    } catch (err) {
      const parsed = parseDailyError(err);
      setCameraError(parsed.message);
    }
  };

  useEffect(() => {
    if (!daily || isStarted) return;
    startPreview();
    return () => {};
  }, [daily, isStarted]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Video options</h2>
          <button
            type="button"
            onClick={onBack}
            className="text-gray-400 hover:text-white text-2xl"
            title="Back"
            aria-label="Back"
          >
            ×
          </button>
        </div>

        {/* Classroom name: user must know which room they are joining */}
        <p className="text-teal-400 font-medium mb-4">Joining: {classroomName}</p>

        {/* Camera preview or placeholder when unavailable (do not block Enter room) */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-2 text-sm">Camera Preview</h3>
          <div
            className={`relative rounded-lg overflow-hidden bg-gray-800 aspect-video ${mirrorEnabled ? 'scale-x-[-1]' : ''}`}
          >
            {!cameraError && localParticipant && isStarted ? (
              <DailyVideo
                sessionId={localParticipant.session_id}
                type="video"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                {cameraError ? (
                  <>
                    <p className="text-sm text-center">{cameraError}</p>
                    <button
                      type="button"
                      onClick={startPreview}
                      className="text-teal-400 hover:text-teal-300 font-medium text-sm"
                    >
                      Try again
                    </button>
                    <p className="text-xs text-gray-500">You can still continue without preview.</p>
                  </>
                ) : (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mr-3" />
                    <span>Starting camera...</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mirror toggle */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="mirror-preview"
            checked={mirrorEnabled}
            onChange={(e) => setMirrorEnabled(e.target.checked)}
            className="rounded text-teal-500 focus:ring-teal-500"
            aria-label="Mirror preview"
          />
          <label htmlFor="mirror-preview" className="text-gray-300 cursor-pointer">
            Mirror preview
          </label>
        </div>

        {/* Filters: placeholder only, does not link or perform any action (per spec) */}
        <button
          type="button"
          className="text-teal-400 hover:text-teal-300 underline mb-6 block text-left"
          onClick={() => {}}
        >
          Filters
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onProceed(mirrorEnabled)}
            className="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
          >
            Enter room
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Wrapper that creates a Daily call object for preview (same pattern as DevicePreview).
 * Uses ref so we only create one call object and destroy on unmount (avoids duplicate DailyIframe error).
 */
export default function VideoOptionsScreen({
  classroomId: _classroomId,
  classroomName,
  user: _user,
  onProceed,
  onBack,
}: VideoOptionsScreenProps) {
  // Default off (unmirrored) per spec 005; user can turn mirror on before entering room.
  const [mirrorEnabled, setMirrorEnabled] = useState(false);
  const [dailyCall, setDailyCall] = useState<DailyCall | null>(null);
  const callRef = useRef<DailyCall | null>(null);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const Daily = (await import('@daily-co/daily-js')).default;
        const call = Daily.createCallObject({ audioSource: true, videoSource: true });
        if (mounted) {
          callRef.current = call;
          setDailyCall(call);
        } else {
          call.destroy();
        }
      } catch (err) {
        console.error('[VideoOptionsScreen] Failed to create Daily call:', err);
      }
    };
    init();
    return () => {
      mounted = false;
      if (callRef.current) {
        callRef.current.destroy();
        callRef.current = null;
      }
      setDailyCall(null);
    };
  }, []);

  if (!dailyCall) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500" />
      </div>
    );
  }

  return (
    <DailyProvider callObject={dailyCall}>
      <VideoOptionsContent
        classroomName={classroomName}
        mirrorEnabled={mirrorEnabled}
        setMirrorEnabled={setMirrorEnabled}
        onProceed={onProceed}
        onBack={onBack}
      />
    </DailyProvider>
  );
}
