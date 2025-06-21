// Core exports
export { InputMask } from './components/InputMask';
export { useMaskedValue } from './hooks/useMaskedValue';

// Types
export type { InputMaskProps, MaskFunction, MaskPattern, MaskConfig, MaskedValue } from './types';

// Core utilities
export { createMask, parseMask, formatValue } from './core/mask';
export { validateValue } from './core/validator';

// Predefined masks
export * from './masks';
