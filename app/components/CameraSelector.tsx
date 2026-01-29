'use client';

/**
 * CameraSelector Component
 * 
 * Provides UI for selecting video input device (camera).
 * Uses Daily.co device management APIs to enumerate and switch cameras.
 * 
 * WHY: Users often have multiple cameras (built-in, external USB, etc.)
 * and need a way to switch between them during a video call.
 */

import React, { useState, useEffect } from 'react';
import { useDaily, useDevices } from '@daily-co/daily-react';

interface CameraSelectorProps {
  /** Optional callback when camera is changed */
  onCameraChange?: (deviceId: string) => void;
  /** CSS class for styling */
  className?: string;
}

/**
 * CameraSelector Component
 * 
 * Displays a dropdown menu of available cameras and allows switching.
 * Automatically detects when devices are added/removed (e.g., USB camera plugged in).
 */
export default function CameraSelector({ onCameraChange, className = '' }: CameraSelectorProps) {
  const daily = useDaily();
  const { cameras, currentCam } = useDevices();
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log available cameras for debugging
  useEffect(() => {
    console.log('[CameraSelector] Available cameras:', cameras);
    console.log('[CameraSelector] Current camera:', currentCam);
  }, [cameras, currentCam]);

  /**
   * Handle camera selection change
   * Uses Daily.co's setInputDevicesAsync to switch camera
   */
  const handleCameraChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = event.target.value;
    
    if (!daily) {
      console.error('[CameraSelector] Daily object not available');
      setError('Video system not initialized');
      return;
    }

    setIsChanging(true);
    setError(null);

    try {
      console.log('[CameraSelector] Switching to camera:', deviceId);
      
      // Use Daily's API to change the video input device
      await daily.setInputDevicesAsync({
        videoDeviceId: deviceId
      });

      console.log('[CameraSelector] Camera switched successfully');
      
      // Notify parent component if callback provided
      if (onCameraChange) {
        onCameraChange(deviceId);
      }
    } catch (err) {
      console.error('[CameraSelector] Failed to switch camera:', err);
      setError('Failed to switch camera. Please try again.');
    } finally {
      setIsChanging(false);
    }
  };

  // Don't show selector if no cameras available or only one camera
  if (!cameras || cameras.length <= 1) {
    return null;
  }

  return (
    <div className={`camera-selector ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Camera icon */}
        <span className="text-gray-400" title="Select Camera">
          📹
        </span>

        {/* Camera dropdown */}
        <select
          value={currentCam?.device?.deviceId || ''}
          onChange={handleCameraChange}
          disabled={isChanging}
          className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Select camera"
        >
          {cameras.map((camera) => (
            <option key={camera.device.deviceId} value={camera.device.deviceId}>
              {camera.device.label || `Camera ${camera.device.deviceId.slice(0, 8)}`}
            </option>
          ))}
        </select>

        {/* Loading indicator */}
        {isChanging && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * // Basic usage
 * <CameraSelector />
 * 
 * // With change callback
 * <CameraSelector 
 *   onCameraChange={(deviceId) => console.log('Camera changed to:', deviceId)}
 * />
 * 
 * // With custom styling
 * <CameraSelector className="my-4" />
 */
