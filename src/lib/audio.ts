import { ALARM_FREQUENCY, ALARM_GAIN, ALARM_BLINK_INTERVAL } from '@/lib/constants';

let audioContext: AudioContext | null = null;
let oscillatorNode: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let blinkInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Play a beep alarm using Web Audio API
 * 800Hz square wave, 0.2s ON / 0.2s OFF pattern
 */
export function playAlarm(): void {
  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    // Stop any existing alarm first
    stopAlarm();

    oscillatorNode = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillatorNode.type = 'square';
    oscillatorNode.frequency.setValueAtTime(ALARM_FREQUENCY, audioContext.currentTime);

    gainNode.gain.setValueAtTime(ALARM_GAIN, audioContext.currentTime);

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillatorNode.start();

    // Blink pattern: ON 0.2s / OFF 0.2s
    let isOn = true;
    blinkInterval = setInterval(() => {
      if (gainNode) {
        isOn = !isOn;
        gainNode.gain.setValueAtTime(
          isOn ? ALARM_GAIN : 0,
          audioContext?.currentTime ?? 0
        );
      }
    }, ALARM_BLINK_INTERVAL);
  } catch {
    // Web Audio API not available - silently fail
  }
}

/**
 * Stop the alarm sound
 */
export function stopAlarm(): void {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
  }
  if (oscillatorNode) {
    try {
      oscillatorNode.stop();
    } catch {
      // Already stopped
    }
    oscillatorNode.disconnect();
    oscillatorNode = null;
  }
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }
}
