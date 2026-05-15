import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof VirtualKeyboard> = {
  title: 'Input/VirtualKeyboard',
  component: VirtualKeyboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Virtual Keyboard

In-app custom keyboard with four layout types.

| Type         | Use case |
|---|---|
| \`pin\`        | 4–6 digit security PIN entry |
| \`transfer\`   | Amount input with decimal/00 shortcut + Done button |
| \`password\`   | Full QWERTY with ABC ↔ 123 switching and shift |
| \`login\`      | Minimal numpad with Face ID / Touch ID button |

### Quick usage
\`\`\`tsx
import { VirtualKeyboard } from '@monee/design-system';

<VirtualKeyboard
  type="pin"
  onKey={(k) => append(k)}
  onDelete={() => removeLast()}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type:            { control: 'radio',   options: ['pin', 'transfer', 'password', 'login'] },
    transferSpecial: { control: 'radio',   options: ['dot', '00', '000'] },
    loginBiometric:  { control: 'radio',   options: ['face-id', 'touch-id', 'none'] },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualKeyboard>;

// ─── Interactive demo wrapper ─────────────────────────────────────────────────

const Demo: React.FC<{
  label:    string;
  children: React.ReactNode;
  value:    string;
}> = ({ label, value, children }) => (
  <div style={{ width: 375 }}>
    <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #eee' }}>
      <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>{label}</div>
      <div style={{
        fontSize: 28,
        fontWeight: 600,
        letterSpacing: 8,
        minHeight: 40,
        color: value ? '#222' : '#ccc',
      }}>
        {value || '—'}
      </div>
    </div>
    {children}
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Output" value={val}>
        <VirtualKeyboard
          {...args}
          onKey={(k) => setVal((v) => v + k)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
          onDone={() => alert(`Confirmed: ${val}`)}
          onBiometric={() => alert('Biometric triggered')}
        />
      </Demo>
    );
  },
  args: {
    type:            'pin',
    transferSpecial: 'dot',
    loginBiometric:  'face-id',
  },
};

// ─── PIN ──────────────────────────────────────────────────────────────────────

export const PIN: Story = {
  name: 'PIN — Security',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Enter PIN (6 digits)" value={val.split('').map(() => '●').join(' ')}>
        <VirtualKeyboard
          type="pin"
          onKey={(k) => setVal((v) => v.length < 6 ? v + k : v)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
        />
      </Demo>
    );
  },
};

// ─── Transfer ─────────────────────────────────────────────────────────────────

export const TransferDot: Story = {
  name: 'Transfer — with Decimal (·)',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Enter amount" value={val ? `₱ ${val}` : ''}>
        <VirtualKeyboard
          type="transfer"
          transferSpecial="dot"
          onKey={(k) => setVal((v) => v + k)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
          onDone={() => alert(`Amount: ₱${val}`)}
        />
      </Demo>
    );
  },
};

export const TransferWith00: Story = {
  name: 'Transfer — with 00',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Enter amount" value={val ? `₱ ${val}` : ''}>
        <VirtualKeyboard
          type="transfer"
          transferSpecial="00"
          onKey={(k) => setVal((v) => v + k)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
          onDone={() => alert(`Amount: ₱${val}`)}
        />
      </Demo>
    );
  },
};

// ─── Password ─────────────────────────────────────────────────────────────────

export const Password: Story = {
  name: 'Password — QWERTY',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Enter password" value={val.split('').map(() => '•').join('')}>
        <VirtualKeyboard
          type="password"
          onKey={(k) => setVal((v) => v + k)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
          onDone={() => alert(`Password set`)}
        />
      </Demo>
    );
  },
};

// ─── Login ────────────────────────────────────────────────────────────────────

export const LoginFaceID: Story = {
  name: 'Login Pad — Face ID',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Enter passcode" value={val.split('').map(() => '●').join(' ')}>
        <VirtualKeyboard
          type="login"
          loginBiometric="face-id"
          onKey={(k) => setVal((v) => v.length < 6 ? v + k : v)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
          onBiometric={() => alert('Face ID triggered')}
        />
      </Demo>
    );
  },
};

export const LoginTouchID: Story = {
  name: 'Login Pad — Touch ID',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Demo label="Enter passcode" value={val.split('').map(() => '●').join(' ')}>
        <VirtualKeyboard
          type="login"
          loginBiometric="touch-id"
          onKey={(k) => setVal((v) => v.length < 6 ? v + k : v)}
          onDelete={() => setVal((v) => v.slice(0, -1))}
          onBiometric={() => alert('Touch ID triggered')}
        />
      </Demo>
    );
  },
};

// ─── All types overview ───────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All Types Overview',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, background: '#e8e8e8' }}>
      {(['PIN', 'Transfer', 'Password ABC', 'Login'] as const).map((label, i) => {
        const types = ['pin', 'transfer', 'password', 'login'] as const;
        return (
          <div key={label} style={{ width: 375 }}>
            <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>{label}</div>
            <VirtualKeyboard
              type={types[i]}
              onKey={() => {}}
              onDelete={() => {}}
            />
          </div>
        );
      })}
    </div>
  ),
};
