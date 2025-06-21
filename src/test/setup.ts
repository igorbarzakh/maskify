import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock MutationObserver for tests
global.MutationObserver = class {
  constructor(_callback: MutationCallback) {
    // Mock constructor - callback not used in tests
  }
  disconnect() {}
  observe(_element: Node, _init?: MutationObserverInit) {
    // Mock observe - parameters not used in tests
  }
  takeRecords(): MutationRecord[] {
    return [];
  }
};

// Mock window.setInterval
Object.defineProperty(window, 'setInterval', {
  value: vi.fn(),
  writable: true,
});

// Mock window.clearInterval
Object.defineProperty(window, 'clearInterval', {
  value: vi.fn(),
  writable: true,
});
