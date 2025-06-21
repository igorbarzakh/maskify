export function formatValue(value: string, mask: string): string {
  // 1. Extract "clean" digits from user input
  const cleanValue = value.replace(/\D/g, '');

  // 2. Extract "clean" digits from the mask itself
  const maskDigits = mask.replace(/\D/g, '');

  // 3. Remove from user input digits that are part of the mask
  let valueWithoutMaskDigits = cleanValue;
  if (valueWithoutMaskDigits.startsWith(maskDigits)) {
    valueWithoutMaskDigits = valueWithoutMaskDigits.slice(maskDigits.length);
  }

  // 4. Apply the mask
  let result = '';
  let valueIndex = 0;
  for (let i = 0; i < mask.length && valueIndex < valueWithoutMaskDigits.length; i++) {
    const maskChar = mask[i];
    if (maskChar === '#') {
      result += valueWithoutMaskDigits[valueIndex];
      valueIndex++;
    } else {
      result += maskChar;
    }
  }
  return result;
}

export function extractRawValue(formattedValue: string): string {
  return formattedValue.replace(/\D/g, '');
}
