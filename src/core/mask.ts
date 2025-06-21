export function formatValue(value: string, mask: string): string {
  // 1. Получаем "чистые" цифры из пользовательского ввода.
  const cleanValue = value.replace(/\D/g, '');

  // 2. Получаем "чистые" цифры из самой маски.
  const maskDigits = mask.replace(/\D/g, '');

  // 3. Убираем из пользовательского ввода цифры, которые являются частью маски.
  let valueWithoutMaskDigits = cleanValue;
  if (valueWithoutMaskDigits.startsWith(maskDigits)) {
    valueWithoutMaskDigits = valueWithoutMaskDigits.slice(maskDigits.length);
  }

  // 4. Применяем маску.
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
