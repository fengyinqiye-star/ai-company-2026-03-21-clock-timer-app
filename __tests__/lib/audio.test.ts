import { playAlarm, stopAlarm } from '@/lib/audio';

// Mock Web Audio API
const mockOscillatorNode = {
  type: 'sine' as OscillatorType,
  frequency: {
    setValueAtTime: jest.fn(),
  },
  connect: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  disconnect: jest.fn(),
};

const mockGainNode = {
  gain: {
    setValueAtTime: jest.fn(),
  },
  connect: jest.fn(),
  disconnect: jest.fn(),
};

const mockAudioContext = {
  createOscillator: jest.fn(() => mockOscillatorNode),
  createGain: jest.fn(() => mockGainNode),
  currentTime: 0,
  destination: {},
};

describe('audio', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Reset mocks
    jest.clearAllMocks();

    // Setup global AudioContext mock
    (global as unknown as Record<string, unknown>).AudioContext = jest.fn(
      () => mockAudioContext
    );
  });

  afterEach(() => {
    jest.useRealTimers();
    stopAlarm();
  });

  it('playAlarm creates oscillator and starts it', () => {
    playAlarm();

    expect(mockAudioContext.createOscillator).toHaveBeenCalled();
    expect(mockAudioContext.createGain).toHaveBeenCalled();
    expect(mockOscillatorNode.start).toHaveBeenCalled();
    expect(mockOscillatorNode.connect).toHaveBeenCalledWith(mockGainNode);
    expect(mockGainNode.connect).toHaveBeenCalledWith(
      mockAudioContext.destination
    );
  });

  it('playAlarm sets 800Hz square wave', () => {
    playAlarm();

    expect(mockOscillatorNode.type).toBe('square');
    expect(mockOscillatorNode.frequency.setValueAtTime).toHaveBeenCalledWith(
      800,
      0
    );
  });

  it('stopAlarm stops oscillator and disconnects nodes', () => {
    playAlarm();
    stopAlarm();

    expect(mockOscillatorNode.stop).toHaveBeenCalled();
    expect(mockOscillatorNode.disconnect).toHaveBeenCalled();
    expect(mockGainNode.disconnect).toHaveBeenCalled();
  });

  it('stopAlarm handles already-stopped oscillator gracefully', () => {
    playAlarm();
    mockOscillatorNode.stop.mockImplementationOnce(() => {
      throw new Error('Already stopped');
    });

    expect(() => stopAlarm()).not.toThrow();
  });

  it('playAlarm does not throw when AudioContext is unavailable', () => {
    delete (global as unknown as Record<string, unknown>).AudioContext;
    expect(() => playAlarm()).not.toThrow();
  });
});
