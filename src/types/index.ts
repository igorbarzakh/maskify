import { InputHTMLAttributes } from 'react';

export type MaskPattern = string | RegExp | MaskFunction;

export type MaskFunction = (input: string) => string;

export interface MaskConfig {
  pattern: MaskPattern;
  placeholder?: string;
  guide?: boolean;
}

export interface MaskedValue {
  value: string;
  rawValue: string;
  isValid: boolean;
  isComplete: boolean;
}

export interface InputMaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: string;
  value: string;
  onChange?: (value: string) => void;
  onAutoFillDetected?: (rawValue: string) => void;
  onComplete?: (parsedValue: string) => void;
  placeholder?: string;
  guide?: boolean;
  keepCharPositions?: boolean;
  showMask?: boolean;
}

export interface UseMaskedValueOptions {
  mask: string;
  value: string;
  onChange?: (value: string) => void;
}
