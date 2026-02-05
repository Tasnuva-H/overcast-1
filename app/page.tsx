'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Lobby from '@/app/components/Lobby';
import { AppUser } from '@/lib/types';

/**
 * Main lobby page for Overcast Video Classroom Application
 * 
 * This page serves as the entry point for students and instructors.
 * It renders the Lobby component which handles:
 * - User name and role input
 * - Display of 6 available classrooms
 * - Real-time participant counts
 * - Classroom capacity indicators
 * 
 * When a user joins a classroom, we navigate to the dynamic classroom page
 * and pass user data via URL state (Next.js App Router pattern).
 */
export default function Home() {
  const router = useRouter();

  /**
   * Handle classroom join action (called after user proceeds from video options screen).
   * Passes mirror preference via URL so the classroom can show local video mirrored and apply to stream.
   *
   * @param classroomId - The ID of the classroom to join
   * @param user - The user data including name, role, sessionId
   * @param options - Optional; mirror preference from video options (default false per spec 005)
   */
  const handleJoinClassroom = useCallback(
    (classroomId: string, user: AppUser, options?: { mirror?: boolean }) => {
      const mirror = options?.mirror ?? false;
      const params = new URLSearchParams({
        name: user.name,
        role: user.role,
        sessionId: user.sessionId,
        mirror: String(mirror),
      });
      router.push(`/classroom/${classroomId}?${params.toString()}`);
    },
    [router]
  );

  return (
    <Lobby onJoinClassroom={handleJoinClassroom} />
  );
}
