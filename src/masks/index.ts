import type { MaskConfig } from '../types';

// Russian phone number mask
export const phoneRu: MaskConfig = {
  pattern: '+7 (###) ###-##-##',
  placeholder: '+7 (___) ___-__-__',
  guide: true,
};

// Credit card number mask
export const cardNumber: MaskConfig = {
  pattern: '#### #### #### ####',
  placeholder: '____ ____ ____ ____',
  guide: true,
};

// ISO date mask
export const dateIso: MaskConfig = {
  pattern: '####-##-##',
  placeholder: '____-__-__',
  guide: true,
};

// Email mask (basic)
export const email: MaskConfig = {
  pattern: (input: string) => {
    // Simple email formatting - just return as is
    return input;
  },
  placeholder: 'example@domain.com',
  guide: false,
};

// Additional useful masks
export const time24: MaskConfig = {
  pattern: '##:##',
  placeholder: '__:__',
  guide: true,
};

export const time12: MaskConfig = {
  pattern: '##:## AM',
  placeholder: '__:__ AM',
  guide: true,
};

export const zipCode: MaskConfig = {
  pattern: '#####',
  placeholder: '_____',
  guide: true,
};

export const ssn: MaskConfig = {
  pattern: '###-##-####',
  placeholder: '___-__-____',
  guide: true,
};

export const currency: MaskConfig = {
  pattern: (input: string) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');
    if (!digits) return '';

    // Format as currency
    const number = parseInt(digits, 10) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  },
  placeholder: '$0.00',
  guide: false,
};

// Export all masks
export const masks = {
  phoneRu,
  cardNumber,
  dateIso,
  email,
  time24,
  time12,
  zipCode,
  ssn,
  currency,
};
