'use client';

/**
 * MicrophoneSelector Component
 * 
 * Provides UI for selecting audio input device (microphone).
 * Uses Daily.co device management APIs to enumerate and switch microphones.
 * 
 * WHY: Users often have multiple audio input devices (built-in mic, headset, etc.)
 * and need a way to switch between them during a video call.
 */

import React, { useState, useEffect } from 'react';
import { useDaily, useDevices } from '@daily-co/daily-react';

interface MicrophoneSelectorProps {
  /** Optional callback when microphone is changed */
  onMicrophoneChange?: (deviceId: string) => void;
  /** CSS class for styling */
  className?: string;
}

/**
 * MicrophoneSelector Component
 * 
 * Displays a dropdown menu of available microphones and allows switching.
 * Automatically detects when devices are added/removed (e.g., headset plugged in).
 */
export default function MicrophoneSelector({ onMicrophoneChange, className = '' }: MicrophoneSelectorProps) {
  const daily = useDaily();
  const { microphones, currentMic } = useDevices();
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log available microphones for debugging
  useEffect(() => {
    console.log('[MicrophoneSelector] Available microphones:', microphones);
    console.log('[MicrophoneSelector] Current microphone:', currentMic);
  }, [microphones, currentMic]);

  /**
   * Handle microphone selection change
   * Uses Daily.co's setInputDevicesAsync to switch microphone
   */
  const handleMicrophoneChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = event.target.value;
    
    if (!daily) {
      console.error('[MicrophoneSelector] Daily object not available');
      setError('Audio system not initialized');
      return;
    }

    setIsChanging(true);
    setError(null);

    try {
      console.log('[MicrophoneSelector] Switching to microphone:', deviceId);
      
      // Use Daily's API to change the audio input device
      await daily.setInputDevicesAsync({
        audioDeviceId: deviceId
      });

      console.log('[MicrophoneSelector] Microphone switched successfully');
      
      // Notify parent component if callback provided
      if (onMicrophoneChange) {
        onMicrophoneChange(deviceId);
      }
    } catch (err) {
      console.error('[MicrophoneSelector] Failed to switch microphone:', err);
      setError('Failed to switch microphone. Please try again.');
    } finally {
      setIsChanging(false);
    }
  };

  // Don't show selector if no microphones available or only one microphone
  if (!microphones || microphones.length <= 1) {
    return null;
  }

  return (
    <div className={`microphone-selector ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Microphone icon */}
        <span className="text-gray-400" title="Select Microphone">
          🎤
        </span>

        {/* Microphone dropdown */}
        <select
          value={currentMic?.device?.deviceId || ''}
          onChange={handleMicrophoneChange}
          disabled={isChanging}
          className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Select microphone"
        >
          {microphones.map((microphone) => (
            <option key={microphone.device.deviceId} value={microphone.device.deviceId}>
              {microphone.device.label || `Microphone ${microphone.device.deviceId.slice(0, 8)}`}
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
 * <MicrophoneSelector />
 * 
 * // With change callback
 * <MicrophoneSelector 
 *   onMicrophoneChange={(deviceId) => console.log('Microphone changed to:', deviceId)}
 * />
 * 
 * // With custom styling
 * <MicrophoneSelector className="my-4" />
 */
