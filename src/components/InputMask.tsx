import React, { forwardRef } from 'react';
import type { InputMaskProps } from '../types';
import { useMaskedValue } from '../hooks/useMaskedValue';

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, ref) => {
  const { mask, value, onChange, onComplete, ...rest } = props;

  const {
    value: maskedValue,
    onChange: handleChange,
    isComplete,
  } = useMaskedValue({
    mask,
    value,
    onChange,
  });

  React.useEffect(() => {
    if (isComplete) {
      onComplete?.(value);
    }
  }, [isComplete, onComplete, value]);

  const handleReactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return <input {...rest} ref={ref} value={maskedValue} onChange={handleReactChange} />;
});

InputMask.displayName = 'InputMask';
