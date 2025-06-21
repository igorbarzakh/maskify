export interface AutofillDetectorOptions {
  onAutoFillDetected: (rawValue: string) => void;
  pollingInterval?: number;
}

export class AutofillDetector {
  private element: HTMLInputElement;
  private options: AutofillDetectorOptions;
  private lastValue: string = '';
  private observer: MutationObserver | null = null;
  private pollingInterval: number | null = null;
  private isDestroyed: boolean = false;

  constructor(element: HTMLInputElement, options: AutofillDetectorOptions) {
    this.element = element;
    this.options = {
      pollingInterval: 100,
      ...options,
    };
    this.lastValue = element.value;
    this.startDetection();
  }

  private startDetection(): void {
    // Try MutationObserver first
    if (typeof MutationObserver !== 'undefined') {
      this.setupMutationObserver();
    }

    // Fallback to polling
    this.setupPolling();
  }

  private setupMutationObserver(): void {
    try {
      this.observer = new MutationObserver((mutations) => {
        if (this.isDestroyed) return;

        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            const newValue = this.element.value;
            if (newValue !== this.lastValue) {
              this.handleValueChange(newValue);
            }
          }
        }
      });

      this.observer.observe(this.element, {
        attributes: true,
        attributeFilter: ['value'],
      });
    } catch (_error) {
      // Ignore MutationObserver errors and fall back to polling
      console.warn('MutationObserver not supported, falling back to polling');
    }
  }

  private setupPolling(): void {
    this.pollingInterval = window.setInterval(() => {
      if (this.isDestroyed) return;

      const currentValue = this.element.value;
      if (currentValue !== this.lastValue) {
        this.handleValueChange(currentValue);
      }
    }, this.options.pollingInterval);
  }

  private handleValueChange(newValue: string): void {
    this.lastValue = newValue;
    this.options.onAutoFillDetected(newValue);
  }

  public updateValue(value: string): void {
    this.lastValue = value;
  }

  public destroy(): void {
    this.isDestroyed = true;

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}
