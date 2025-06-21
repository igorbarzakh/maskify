import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputMask } from '../src/components/InputMask';

function App() {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: 32 }}>
      <h1>Demo: InputMask</h1>
      <InputMask
        mask="####-####"
        placeholder="____-____"
        value={value}
        onChange={setValue}
        data-testid="input"
      />
      <div style={{ marginTop: 16 }}>Value: {value}</div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
