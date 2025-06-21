import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputMask } from '../src/components/InputMask';

// Wrapper component for each example
const MaskExample = ({
  label,
  mask,
  placeholder,
}: {
  label: string;
  mask: string;
  placeholder?: string;
}) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>{label}</label>
      <InputMask
        mask={mask}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '250px' }}
      />
      <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '14px', color: '#555' }}>
        Current value: {value}
      </div>
    </div>
  );
};

function App() {
  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Maskify React Demo</h1>

      <MaskExample
        label="Phone Number (RU)"
        mask="+7 (###) ###-##-##"
        placeholder="+7 (999) 123-45-67"
      />

      <MaskExample
        label="Credit Card"
        mask="#### #### #### ####"
        placeholder="0000 0000 0000 0000"
      />

      <MaskExample label="Date (YYYY-MM-DD)" mask="####-##-##" placeholder="2024-12-31" />

      <MaskExample label="Time (HH:MM)" mask="##:##" placeholder="23:59" />
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
