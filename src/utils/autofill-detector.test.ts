import { describe, it, expect, vi, afterEach, beforeAll, afterAll, beforeEach } from 'vitest';
import { AutofillDetector } from './autofill-detector';

describe('AutofillDetector with polling', () => {
  let detector: AutofillDetector | null = null;
  const onAutoFillDetected = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    detector?.destroy();
    onAutoFillDetected.mockClear();
  });

  it('should detect autofill via polling', () => {
    const input = document.createElement('input');
    detector = new AutofillDetector(input, { onAutoFillDetected });
    input.value = 'autofilled';
    vi.advanceTimersByTime(200);
    expect(onAutoFillDetected).toHaveBeenCalledWith('autofilled');
  });

  it('should not call callback for programmatic value updates', () => {
    const input = document.createElement('input');
    detector = new AutofillDetector(input, { onAutoFillDetected });
    input.value = 'programmatic';
    detector.updateValue('programmatic');
    vi.advanceTimersByTime(200);
    expect(onAutoFillDetected).not.toHaveBeenCalled();
  });
});

describe('AutofillDetector with MutationObserver', () => {
  const onAutoFillDetected = vi.fn();
  let detector: AutofillDetector | null = null;

  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();
  let mutationCallback: MutationCallback | null = null;

  class MockMutationObserver {
    constructor(callback: MutationCallback) {
      mutationCallback = callback;
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
    takeRecords = () => [];
  }

  beforeAll(() => {
    vi.stubGlobal('MutationObserver', MockMutationObserver);
  });

  afterEach(() => {
    detector?.destroy();
    onAutoFillDetected.mockClear();
    mockDisconnect.mockClear();
    mockObserve.mockClear();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('should setup observer and detect change', () => {
    const input = document.createElement('input');
    detector = new AutofillDetector(input, { onAutoFillDetected });
    input.value = 'autofilled-via-observer';
    const mutations: Partial<MutationRecord>[] = [{ type: 'attributes', attributeName: 'value' }];
    mutationCallback?.(mutations as MutationRecord[], new MockMutationObserver(() => {}));
    expect(onAutoFillDetected).toHaveBeenCalledWith('autofilled-via-observer');
  });
});
