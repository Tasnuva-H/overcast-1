/**
 * Creates a mirrored (horizontally flipped) video track from a camera track.
 * Used for stream-level mirroring so other participants see the user mirrored.
 *
 * WHY: Per spec 004, mirror must affect the outgoing stream, not just local display.
 * Daily.co does not expose a built-in "mirror published stream" API, so we use
 * a canvas pipeline: source track → video element → canvas (draw flipped) → captureStream.
 */

const MIRROR_TRACK_NAME = 'mirror-video';
const DEFAULT_FRAME_RATE = 30;

export const MIRROR_CUSTOM_TRACK_NAME = MIRROR_TRACK_NAME;

export interface MirroredTrackResult {
  track: MediaStreamTrack;
  stop: () => void;
}

/**
 * Creates a new MediaStreamTrack that shows the source video horizontally flipped.
 * Call stop() when done to release the canvas loop and tracks.
 */
export function createMirroredVideoTrack(
  sourceTrack: MediaStreamTrack,
  options?: { frameRate?: number }
): MirroredTrackResult {
  const frameRate = options?.frameRate ?? DEFAULT_FRAME_RATE;
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.srcObject = new MediaStream([sourceTrack]);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    sourceTrack.stop();
    throw new Error('Canvas 2d context not available');
  }

  let animationId: number | null = null;
  let stopped = false;

  const drawFrame = () => {
    if (stopped || video.readyState < 2) {
      animationId = requestAnimationFrame(drawFrame);
      return;
    }
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (w > 0 && h > 0) {
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();
    }
    animationId = requestAnimationFrame(drawFrame);
  };

  video.onloadedmetadata = () => {
    if (stopped) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    drawFrame();
  };

  const stream = canvas.captureStream(frameRate);
  const outTrack = stream.getVideoTracks()[0];

  const stop = () => {
    stopped = true;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    outTrack.stop();
    sourceTrack.stop();
    video.srcObject = null;
  };

  outTrack.onended = () => stop();

  return { track: outTrack, stop };
}
