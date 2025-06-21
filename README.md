# @maskify/react

React компонент для маскированного ввода с поддержкой автозаполнения браузера.

## Особенности

- 🎯 **Zero dependencies** - только React 18+ и TypeScript
- 🔄 **SSR-friendly** - работает с серверным рендерингом
- 🚀 **Автозаполнение** - автоматическое обнаружение автозаполнения браузера
- 🎨 **Гибкие маски** - строки, регулярные выражения, функции
- 📱 **Type-safe** - полная поддержка TypeScript
- ⚡ **Производительность** - оптимизированная обработка событий

## Установка

```bash
pnpm add @maskify/react
```

## Использование

### Базовое использование

```tsx
import { InputMask } from '@maskify/react';

function App() {
  const [phone, setPhone] = useState('');

  return (
    <InputMask
      mask="+7 (###) ###-##-##"
      value={phone}
      onChange={setPhone}
      placeholder="Введите номер телефона"
    />
  );
}
```

### С готовыми масками

```tsx
import { InputMask } from '@maskify/react';
import { phoneRu, cardNumber, dateIso } from '@maskify/react/masks';

function Form() {
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  const [date, setDate] = useState('');

  return (
    <form>
      <InputMask mask={phoneRu} value={phone} onChange={setPhone} />
      <InputMask mask={cardNumber} value={card} onChange={setCard} />
      <InputMask mask={dateIso} value={date} onChange={setDate} />
    </form>
  );
}
```

### Хук useMaskedValue

```tsx
import { useMaskedValue } from '@maskify/react';

function MyComponent() {
  const [input, setInput] = useState('');

  const maskedValue = useMaskedValue({
    mask: '####',
    input,
    onChange: (value) => {
      console.log('Formatted:', value.value);
      console.log('Raw:', value.rawValue);
      console.log('Valid:', value.isValid);
      console.log('Complete:', value.isComplete);
    },
  });

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Formatted: {maskedValue.value}</p>
      <p>Raw: {maskedValue.rawValue}</p>
      <p>Valid: {maskedValue.isValid ? 'Yes' : 'No'}</p>
      <p>Complete: {maskedValue.isComplete ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Обработка автозаполнения

```tsx
import { InputMask } from '@maskify/react';

function App() {
  const [phone, setPhone] = useState('');

  const handleAutoFill = (rawValue: string) => {
    console.log('Автозаполнение обнаружено:', rawValue);
    // Обработка автозаполнения
  };

  const handleComplete = (parsedValue: string) => {
    console.log('Маска заполнена:', parsedValue);
    // Дополнительная логика при заполнении
  };

  return (
    <InputMask
      mask="+7 (###) ###-##-##"
      value={phone}
      onChange={setPhone}
      onAutoFillDetected={handleAutoFill}
      onComplete={handleComplete}
    />
  );
}
```

## API

### InputMask Props

| Prop                 | Тип                             | Описание                           |
| -------------------- | ------------------------------- | ---------------------------------- |
| `mask`               | `MaskPattern \| MaskConfig`     | Маска для форматирования           |
| `value`              | `string`                        | Текущее значение                   |
| `onChange`           | `(value: string) => void`       | Обработчик изменения               |
| `onAutoFillDetected` | `(rawValue: string) => void`    | Обработчик автозаполнения          |
| `onComplete`         | `(parsedValue: string) => void` | Обработчик завершения              |
| `placeholder`        | `string`                        | Плейсхолдер                        |
| `guide`              | `boolean`                       | Показывать ли направляющие символы |
| `keepCharPositions`  | `boolean`                       | Сохранять позиции символов         |
| `showMask`           | `boolean`                       | Показывать маску как плейсхолдер   |

### Типы масок

#### Строковая маска

```tsx
mask = '+7 (###) ###-##-##';
```

#### Конфигурация маски

```tsx
mask={{
  pattern: "+7 (###) ###-##-##",
  placeholder: "+7 (___) ___-__-__",
  guide: true
}}
```

#### Функция маски

```tsx
mask={(input: string) => {
  // Кастомная логика форматирования
  return formattedInput
}}
```

#### Регулярное выражение

```tsx
mask={/\d{4}/}
```

### Готовые маски

```tsx
import {
  phoneRu, // +7 (###) ###-##-##
  cardNumber, // #### #### #### ####
  dateIso, // ####-##-##
  email, // Кастомная функция
  time24, // ##:##
  time12, // ##:## AM
  zipCode, // #####
  ssn, // ###-##-####
  currency, // $0.00
} from '@maskify/react/masks';
```

## Разработка

```bash
# Установка зависимостей
pnpm install

# Запуск в режиме разработки
pnpm dev

# Сборка библиотеки
pnpm build

# Запуск тестов
pnpm test
```

## Тестирование

```bash
# Запуск всех тестов
pnpm test

# Запуск тестов с UI
pnpm test:ui

# Покрытие кода
pnpm test:coverage
```

## Лицензия

MIT
