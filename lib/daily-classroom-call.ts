/**
 * Shared classroom Daily call singleton.
 * Ensures only one classroom call exists; Lobby can clear it when user is not in a room
 * so DevicePreview can create its own call without "Duplicate DailyIframe" errors.
 */

import type { DailyCall } from '@daily-co/daily-js';

let dailyCallSingleton: DailyCall | null = null;
let initializationPromise: Promise<DailyCall> | null = null;

export function getClassroomCall(): DailyCall | null {
  return dailyCallSingleton;
}

export function setClassroomCall(call: DailyCall): void {
  dailyCallSingleton = call;
}

export function getClassroomInitPromise(): Promise<DailyCall> | null {
  return initializationPromise;
}

export function setClassroomInitPromise(p: Promise<DailyCall> | null): void {
  initializationPromise = p;
}

/**
 * Destroy the classroom call if it exists. Call from Lobby on mount so that
 * when the user opens DevicePreview (e.g. after navigating back from a room),
 * there is no existing Daily instance and createCallObject() won't throw
 * "Duplicate DailyIframe instances are not allowed".
 */
export function destroyClassroomCall(): void {
  if (dailyCallSingleton) {
    try {
      dailyCallSingleton.destroy();
    } catch (e) {
      console.error('[daily-classroom-call] Error destroying classroom call:', e);
    }
    dailyCallSingleton = null;
    initializationPromise = null;
  }
}
