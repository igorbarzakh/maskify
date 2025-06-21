import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useMaskedValue } from './useMaskedValue';

describe('useMaskedValue', () => {
  it('returns initial masked value', () => {
    const { result } = renderHook(() =>
      useMaskedValue({
        mask: '####-####',
        value: '1234',
      }),
    );
    expect(result.current.value).toBe('1234');
  });

  it('updates when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useMaskedValue({ mask: '####', value }),
      { initialProps: { value: '12' } },
    );
    expect(result.current.value).toBe('12');
    rerender({ value: '1234' });
    expect(result.current.value).toBe('1234');
  });

  it('handles phone number mask', () => {
    const { result } = renderHook(() =>
      useMaskedValue({
        mask: '+7 (###) ###-##-##',
        value: '9991112233',
      }),
    );
    expect(result.current.value).toBe('+7 (999) 111-22-33');
  });

  it('calls onChange callback', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useMaskedValue({
        mask: '####',
        value: '',
        onChange,
      }),
    );

    act(() => {
      result.current.onChange('1234');
    });

    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('correctly sets isComplete flag', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useMaskedValue({ mask: '##-##', value }),
      { initialProps: { value: '12' } },
    );
    expect(result.current.isComplete).toBe(false);
    rerender({ value: '1234' });
    expect(result.current.isComplete).toBe(true);
  });
});
