# Maskify React

React component for masked input with automatic autofill detection.

## Features

- 🎯 **Zero dependencies** - only React 18+ and TypeScript
- ⚡ **Ultra lightweight** - only 0.87 kB gzipped
- 🔄 **SSR-friendly** - works with server-side rendering
- 🚀 **Autofill detection** - automatic browser autofill detection
- 🎨 **Flexible masks** - strings, regular expressions, functions
- 📱 **Type-safe** - full TypeScript support
- ⚡ **Performance** - optimized event handling
- 🌍 **Universal** - compatible with npm, yarn, pnpm, and bun

## Installation

```bash
npm install maskify-react
# or
yarn add maskify-react
# or
pnpm add maskify-react
```

## Usage

### Basic usage

```tsx
import { InputMask } from 'maskify-react';

function App() {
  const [value, setValue] = useState('');

  return (
    <InputMask
      mask="+7 (###) ###-##-##"
      value={value}
      onChange={setValue}
      placeholder="+7 (999) 123-45-67"
    />
  );
}
```

### useMaskedValue hook

```tsx
import { useMaskedValue } from 'maskify-react';

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

### Handling autofill

```tsx
import { InputMask } from 'maskify-react';

function App() {
  const [phone, setPhone] = useState('');

  const handleAutoFill = (rawValue: string) => {
    console.log('Autofill detected:', rawValue);
  };

  const handleComplete = (parsedValue: string) => {
    console.log('Mask completed:', parsedValue);
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

## Available masks

- **Phone**: `"+7 (###) ###-##-##"`
- **Credit card**: `"#### #### #### ####"`
- **Date**: `"####-##-##"`
- **Time**: `"##:##"`

## Demo

See live examples: [https://igorbarzakh.github.io/maskify/](https://igorbarzakh.github.io/maskify/)

## License

MIT
