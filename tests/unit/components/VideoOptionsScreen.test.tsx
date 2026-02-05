/**
 * Component Test: VideoOptionsScreen
 *
 * Tests the video options screen shown after "Join Classroom" (no direct lobby-to-classroom path).
 * Validates: classroom name, preview area or placeholder, Mirror toggle, Filters link, Enter room, Back/Cancel.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoOptionsScreen from '@/app/components/VideoOptionsScreen';

jest.mock('@daily-co/daily-js', () => ({
  __esModule: true,
  default: {
    createCallObject: jest.fn(() => ({
      destroy: jest.fn(),
      startCamera: jest.fn().mockResolvedValue(undefined),
    })),
  },
}));

jest.mock('@daily-co/daily-react', () => {
  const React = require('react');
  return {
    DailyProvider: function MockDailyProvider(props) {
      return React.createElement(React.Fragment, null, props.children);
    },
    useDaily: () => ({
      startCamera: () => Promise.resolve(),
    }),
    useLocalParticipant: () => ({ session_id: 'test-session' }),
    DailyVideo: () => React.createElement('div', { 'data-testid': 'daily-video' }, 'Video'),
  };
});

const defaultProps = {
  classroomId: '1',
  classroomName: 'Cohort 1',
  user: {
    name: 'Test User',
    role: 'student',
    sessionId: 'test-session',
    currentClassroom: '1',
    joinedAt: new Date(),
  },
  onProceed: jest.fn(),
  onBack: jest.fn(),
};

describe('VideoOptionsScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders classroom name so user knows which room they are joining', async () => {
    render(<VideoOptionsScreen {...defaultProps} />);
    expect(await screen.findByText(/Joining:/i)).toBeInTheDocument();
    expect(screen.getByText(/Cohort 1/)).toBeInTheDocument();
  });

  test('renders Mirror toggle', async () => {
    render(<VideoOptionsScreen {...defaultProps} />);
    await screen.findByText(/Joining:/i);
    const mirrorControl = screen.getByRole('checkbox', { name: /mirror/i });
    expect(mirrorControl).toBeInTheDocument();
  });

  test('renders Filters as a link-style option', async () => {
    render(<VideoOptionsScreen {...defaultProps} />);
    await screen.findByText(/Joining:/i);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders Enter room button', async () => {
    render(<VideoOptionsScreen {...defaultProps} />);
    await screen.findByText(/Joining:/i);
    expect(screen.getByRole('button', { name: /enter room/i })).toBeInTheDocument();
  });

  test('renders Back or Cancel button', async () => {
    render(<VideoOptionsScreen {...defaultProps} />);
    await screen.findByText(/Joining:/i);
    const backButton = screen.getByRole('button', { name: /cancel/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });

  test('calls onProceed with mirror value when Enter room is clicked', async () => {
    render(<VideoOptionsScreen {...defaultProps} />);
    await screen.findByText(/Joining:/i);
    const enterButton = screen.getByRole('button', { name: /enter room/i });
    fireEvent.click(enterButton);
    expect(defaultProps.onProceed).toHaveBeenCalledWith(expect.any(Boolean));
  });
});
