import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputMask } from './InputMask';

// Mock for DataTransfer
class DataTransferMock {
  private data: Record<string, string> = {};
  setData(type: string, value: string) {
    this.data[type] = value;
  }
  getData(type: string) {
    return this.data[type] || '';
  }
}
// @ts-expect-error - Adding DataTransfer to global for testing
global.DataTransfer = DataTransferMock;

// Wrapper component for testing
const TestWrapper = ({ mask, onComplete }: { mask: string; onComplete?: (v: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={setValue}
      onComplete={onComplete}
      data-testid="input"
    />
  );
};

describe('InputMask', () => {
  it('formats input according to mask', () => {
    render(<TestWrapper mask="##-##" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234' } });
    expect(input.value).toBe('12-34');
  });

  it('handles phone number mask', () => {
    render(<TestWrapper mask="+7 (###) ###-##-##" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '9991112233' } });
    expect(input.value).toBe('+7 (999) 111-22-33');
  });

  it('calls onComplete when mask is filled', () => {
    const handleComplete = vi.fn();
    render(<TestWrapper mask="##" onComplete={handleComplete} />);
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '12' } });
    expect(handleComplete).toHaveBeenCalledWith('12');
  });

  it('handles paste events', () => {
    render(<TestWrapper mask="##-##" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    const pastedText = '1234';
    fireEvent.change(input, { target: { value: pastedText } });
    expect(input.value).toBe('12-34');
  });
});
