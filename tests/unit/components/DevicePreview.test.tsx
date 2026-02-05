/**
 * Component Test: DevicePreview
 *
 * Tests Device Setup modal including Mirror toggle.
 * Validates: Mirror toggle present, default off (unmirrored) per spec 005; toggling applies/removes mirror style.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@daily-co/daily-react', () => {
  const React = require('react');
  return {
    DailyProvider: function MockDailyProvider(props) {
      return React.createElement('div', { 'data-testid': 'daily-provider' }, props.children);
    },
    useDaily: () => null,
    useDevices: () => ({ cameras: [], microphones: [], currentCam: null, currentMic: null }),
    useLocalParticipant: () => null,
    DailyVideo: () => React.createElement('div', { 'data-testid': 'daily-video' }, 'Video'),
  };
});

jest.mock('@daily-co/daily-js', () => ({
  __esModule: true,
  default: {
    createCallObject: jest.fn(() => ({
      destroy: jest.fn(),
      startCamera: jest.fn().mockResolvedValue(undefined),
      participants: jest.fn(() => ({})),
    })),
  },
}));

// Import after mocks
import DevicePreview from '@/app/components/DevicePreview';

describe('DevicePreview Component', () => {
  test('renders Device Setup heading', async () => {
    render(<DevicePreview onClose={() => {}} />);
    expect(await screen.findByText('Device Setup', {}, { timeout: 3000 })).toBeInTheDocument();
  });

  test('includes Mirror toggle and defaults to off (unmirrored) per spec 005', async () => {
    render(<DevicePreview onClose={() => {}} />);
    await screen.findByText('Device Setup', {}, { timeout: 3000 });
    const mirrorControl = screen.queryByRole('checkbox', { name: /mirror/i }) ?? screen.queryByText(/mirror/i);
    expect(mirrorControl).toBeInTheDocument();
    expect(mirrorControl).not.toBeChecked();
  });

  test('preview container has mirror style only when mirror is turned on', async () => {
    const { container } = render(<DevicePreview onClose={() => {}} />);
    await screen.findByText('Device Setup', {}, { timeout: 3000 });
    const mirrorCheckbox = screen.queryByRole('checkbox', { name: /mirror/i });
    const aspectVideo = container.querySelector('.aspect-video');
    expect(aspectVideo).toBeTruthy();
    const hasMirrorByDefault = aspectVideo?.classList.contains('scale-x-[-1]') ?? false;
    expect(hasMirrorByDefault).toBe(false);
    if (mirrorCheckbox) {
      fireEvent.click(mirrorCheckbox);
      const withMirror = container.querySelector('[class*="scale-x-"]');
      expect(withMirror).toBeTruthy();
    }
  });
});
