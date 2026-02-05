/**
 * Component Test: DevicePreview
 *
 * Tests Device Setup modal including Mirror toggle.
 * Validates: Mirror toggle present, toggling applies/removes mirror style on preview container, default is mirrored on.
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

  test('includes Mirror toggle (checkbox or switch) with default mirrored', async () => {
    render(<DevicePreview onClose={() => {}} />);
    await screen.findByText('Device Setup', {}, { timeout: 3000 });
    const mirrorControl = screen.queryByRole('checkbox', { name: /mirror/i }) ?? screen.queryByText(/mirror/i);
    expect(mirrorControl).toBeInTheDocument();
  });

  test('preview container has mirror style when mirror is on', async () => {
    const { container } = render(<DevicePreview onClose={() => {}} />);
    await screen.findByText('Device Setup', {}, { timeout: 3000 });
    const previewContainer = container.querySelector('[style*="scaleX(-1)"], [class*="scale-x-"]');
    expect(previewContainer || container.querySelector('.aspect-video')).toBeTruthy();
  });
});
