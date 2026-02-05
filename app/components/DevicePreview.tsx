'use client';

/**
 * DevicePreview Component
 * 
 * Pre-call device testing and selection interface.
 * Allows users to test their camera and microphone before joining a classroom.
 * 
 * WHY: Users should verify their devices work correctly before entering
 * a classroom. This reduces technical issues and improves the user experience.
 */

import React, { useState, useEffect, useRef } from 'react';
import { DailyProvider, useDaily, useDevices, DailyVideo, useLocalParticipant } from '@daily-co/daily-react';
import { DailyCall } from '@daily-co/daily-js';

interface DevicePreviewProps {
  onClose?: () => void;
}

/**
 * Device preview content (inside DailyProvider)
 */
function DevicePreviewContent({ onClose }: DevicePreviewProps) {
  const daily = useDaily();
  const { cameras, microphones, currentCam, currentMic } = useDevices();
  const localParticipant = useLocalParticipant();
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Mirror is preview-only here; the authoritative value for the call is set on the video options screen at "Enter room"
  const [mirrorEnabled, setMirrorEnabled] = useState(true);

  // Start local media preview
  useEffect(() => {
    if (!daily || isStarted) return;

    const startPreview = async () => {
      try {
        console.log('[DevicePreview] Starting local media preview...');
        await daily.startCamera();
        setIsStarted(true);
        console.log('[DevicePreview] Preview started successfully');
      } catch (err) {
        console.error('[DevicePreview] Failed to start preview:', err);
        setError('Failed to access camera/microphone. Please check permissions.');
      }
    };

    startPreview();

    // Cleanup on unmount - Daily.co automatically stops camera when component unmounts
    // The parent component handles destroy() in its cleanup
    return () => {
      // No explicit cleanup needed - handled by DailyProvider
    };
  }, [daily, isStarted]);

  // Handle camera change
  const handleCameraChange = async (deviceId: string) => {
    if (!daily) return;

    try {
      console.log('[DevicePreview] Switching camera to:', deviceId);
      await daily.setInputDevicesAsync({ videoDeviceId: deviceId });
    } catch (err) {
      console.error('[DevicePreview] Failed to switch camera:', err);
      setError('Failed to switch camera');
    }
  };

  // Handle microphone change
  const handleMicrophoneChange = async (deviceId: string) => {
    if (!daily) return;

    try {
      console.log('[DevicePreview] Switching microphone to:', deviceId);
      await daily.setInputDevicesAsync({ audioDeviceId: deviceId });
    } catch (err) {
      console.error('[DevicePreview] Failed to switch microphone:', err);
      setError('Failed to switch microphone');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Device Setup</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
              title="Close"
            >
              ×
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Video preview: mirror toggle flips preview (CSS only; call mirror set on video options at Enter room) */}
        <div className="mb-4">
          <h3 className="text-white font-medium mb-2 text-sm">Camera Preview</h3>
          <div
            className={`relative rounded-lg overflow-hidden bg-gray-800 aspect-video ${mirrorEnabled ? 'scale-x-[-1]' : ''}`}
          >
            {localParticipant && isStarted ? (
              <DailyVideo
                sessionId={localParticipant.session_id}
                type="video"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Starting camera...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mirror toggle (preview-only; default on for selfie-style view) */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="device-preview-mirror"
            checked={mirrorEnabled}
            onChange={(e) => setMirrorEnabled(e.target.checked)}
            className="rounded text-teal-500 focus:ring-teal-500"
            aria-label="Mirror preview"
          />
          <label htmlFor="device-preview-mirror" className="text-gray-300 cursor-pointer text-sm">
            Mirror preview
          </label>
        </div>

        {/* Camera selection */}
        {cameras && cameras.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📹 Camera
            </label>
            <select
              value={currentCam?.device?.deviceId || ''}
              onChange={(e) => handleCameraChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {cameras.map((camera) => (
                <option key={camera.device.deviceId} value={camera.device.deviceId}>
                  {camera.device.label || `Camera ${camera.device.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Microphone selection */}
        {microphones && microphones.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              🎤 Microphone
            </label>
            <select
              value={currentMic?.device?.deviceId || ''}
              onChange={(e) => handleMicrophoneChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {microphones.map((microphone) => (
                <option key={microphone.device.deviceId} value={microphone.device.deviceId}>
                  {microphone.device.label || `Microphone ${microphone.device.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Info text */}
        <p className="text-gray-400 text-sm mb-4">
          Test your camera and microphone. You can change these settings anytime during the call.
        </p>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * DevicePreview wrapper with DailyProvider.
 * Uses ref + empty deps so we create only one Daily call object (avoids "Duplicate DailyIframe" error).
 */
export default function DevicePreview({ onClose }: DevicePreviewProps) {
  const [dailyCall, setDailyCall] = useState<DailyCall | null>(null);
  const callRef = useRef<DailyCall | null>(null);

  useEffect(() => {
    let mounted = true;
    const initializeDaily = async () => {
      try {
        const Daily = (await import('@daily-co/daily-js')).default;
        console.log('[DevicePreview] Creating call object for preview...');
        const call = Daily.createCallObject({
          audioSource: true,
          videoSource: true,
        });
        if (mounted) {
          callRef.current = call;
          setDailyCall(call);
        } else {
          call.destroy();
        }
      } catch (error) {
        console.error('[DevicePreview] Failed to initialize Daily:', error);
      }
    };
    initializeDaily();
    return () => {
      mounted = false;
      if (callRef.current) {
        console.log('[DevicePreview] Cleaning up Daily call object...');
        callRef.current.destroy();
        callRef.current = null;
      }
      setDailyCall(null);
    };
  }, []);

  if (!dailyCall) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-white">Loading device preview...</p>
        </div>
      </div>
    );
  }

  return (
    <DailyProvider callObject={dailyCall}>
      <DevicePreviewContent onClose={onClose} />
    </DailyProvider>
  );
}
