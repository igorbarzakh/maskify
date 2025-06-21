import { InputHTMLAttributes } from 'react';

export type MaskPattern = string;
export type MaskFunction = (input: string) => string;

export interface MaskedValue {
  value: string;
  rawValue: string;
  isValid: boolean;
  isComplete: boolean;
}

export interface InputMaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: MaskPattern;
  value: string;
  onChange?: (value: string) => void;
  onAutoFillDetected?: (rawValue: string) => void;
  onComplete?: (parsedValue: string) => void;
}

export interface UseMaskedValueOptions {
  mask: MaskPattern;
  value: string;
  onChange?: (value: string) => void;
}
