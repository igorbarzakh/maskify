import { useState, useMemo } from 'react';
import type { UseMaskedValueOptions, MaskedValue } from '../types';
import { formatValue, extractRawValue } from '../core/mask';

export function useMaskedValue(options: UseMaskedValueOptions): MaskedValue & {
  onChange: (newValue: string) => void;
} {
  const { mask, value, onChange: handleChangeCallback } = options;

  const processValue = useMemo(
    () => (inputValue: string) => {
      const formatted = formatValue(inputValue, mask);
      const raw = extractRawValue(formatted);
      const isComplete = raw.length === (mask.match(/#/g) || []).length;

      return {
        value: formatted,
        rawValue: raw,
        isValid: true,
        isComplete,
      };
    },
    [mask],
  );

  const [currentValue, setCurrentValue] = useState(() => processValue(value));

  const handleChange = (newValue: string) => {
    const newMaskedValue = processValue(newValue);
    setCurrentValue(newMaskedValue);
    if (handleChangeCallback) {
      handleChangeCallback(newMaskedValue.value);
    }
  };

  useMemo(() => {
    setCurrentValue(processValue(value));
  }, [value, processValue]);

  return { ...currentValue, onChange: handleChange };
}
