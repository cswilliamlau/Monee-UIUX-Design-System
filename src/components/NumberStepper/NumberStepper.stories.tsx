import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NumberStepper } from './NumberStepper';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof NumberStepper> = {
  title: 'Input/NumberStepper',
  component: NumberStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Number Stepper

Increment / decrement control for numeric values with − and + buttons.

| Size      | Button  | Use case |
|---|---|---|
| \`small\`   | 24 × 24 px | Dense lists, inline counters |
| \`regular\` | 28 × 28 px | Default, product cards |
| \`large\`   | 36 × 36 px | Module-level inputs |

Button states are derived automatically from \`value\`, \`min\`, and \`max\`:
- At **min** → − button is disabled
- At **max** → + button is disabled
- \`disabled={true}\` → both buttons disabled

### Quick usage
\`\`\`tsx
import { NumberStepper } from '@monee/design-system';

const [qty, setQty] = useState(1);

<NumberStepper
  value={qty}
  onChange={setQty}
  min={1}
  max={99}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size:         { control: 'radio',   options: ['small', 'regular', 'large'] },
    unitPosition: { control: 'radio',   options: ['left', 'right'] },
    disabled:     { control: 'boolean' },
    min:          { control: 'number' },
    max:          { control: 'number' },
    step:         { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof NumberStepper>;

// ─── Controlled wrapper ───────────────────────────────────────────────────────

const Controlled: React.FC<React.ComponentProps<typeof NumberStepper>> = (props) => {
  const [val, setVal] = useState(props.value ?? props.defaultValue ?? 1);
  return <NumberStepper {...props} value={val} onChange={setVal} />;
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
    <span style={{ fontSize: 12, color: '#999', width: 80, flexShrink: 0 }}>{label}</span>
    {children}
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    defaultValue: 1,
    min:          1,
    max:          99,
    step:         1,
    size:         'regular',
    disabled:     false,
  },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <Row label="Small">
        <Controlled size="small" min={1} defaultValue={1} />
      </Row>
      <Row label="Regular">
        <Controlled size="regular" min={1} defaultValue={1} />
      </Row>
      <Row label="Large">
        <Controlled size="large" min={1} defaultValue={1} />
      </Row>
    </div>
  ),
};

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', gap: '24px 32px', alignItems: 'center' }}>
        <span />
        {['Small', 'Regular', 'Large'].map(s => (
          <span key={s} style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>{s}</span>
        ))}

        <span style={{ fontSize: 12, color: '#999' }}>Default</span>
        <Controlled size="small"   min={1} max={99} defaultValue={1} />
        <Controlled size="regular" min={1} max={99} defaultValue={1} />
        <Controlled size="large"   min={1} max={99} defaultValue={1} />

        <span style={{ fontSize: 12, color: '#999' }}>Disabled</span>
        <NumberStepper size="small"   defaultValue={1} disabled />
        <NumberStepper size="regular" defaultValue={1} disabled />
        <NumberStepper size="large"   defaultValue={1} disabled />

        <span style={{ fontSize: 12, color: '#999' }}>Max Limit</span>
        <NumberStepper size="small"   value={5} max={5} />
        <NumberStepper size="regular" value={5} max={5} />
        <NumberStepper size="large"   value={5} max={5} />

        <span style={{ fontSize: 12, color: '#999' }}>Min Limit</span>
        <NumberStepper size="small"   value={1} min={1} />
        <NumberStepper size="regular" value={1} min={1} />
        <NumberStepper size="large"   value={1} min={1} />

        <span style={{ fontSize: 12, color: '#999' }}>Unit (left)</span>
        <Controlled size="small"   defaultValue={1000} step={100} unit="−" unitPosition="left" />
        <Controlled size="regular" defaultValue={1000} step={100} unit="−" unitPosition="left" />
        <Controlled size="large"   defaultValue={1000} step={100} />

        <span style={{ fontSize: 12, color: '#999' }}>Unit (right)</span>
        <Controlled size="small"   defaultValue={67} unit="°" unitPosition="right" />
        <Controlled size="regular" defaultValue={67} unit="°" unitPosition="right" />
        <Controlled size="large"   defaultValue={67} unit="°" unitPosition="right" />
      </div>
    </div>
  ),
};

// ─── Real-world examples ──────────────────────────────────────────────────────

export const RealWorld: Story = {
  name: 'Real-world Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 16, width: 375 }}>
      {/* Product quantity in card */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Regular Combo Set</div>
          <div style={{ fontSize: 12, color: '#999' }}>₱450.00</div>
        </div>
        <Controlled size="regular" min={0} max={99} defaultValue={1} />
      </div>

      {/* Passenger count */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['Adult (Age 12+)', 'Children (Age 2–11)', 'Infant (Below Age 2)'].map((label, i) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14 }}>{label}</span>
            <Controlled size="small" min={0} max={9} defaultValue={i === 0 ? 2 : 0} />
          </div>
        ))}
      </div>

      {/* Insurance amount */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14 }}>Sum Assured</span>
        <Controlled size="large" defaultValue={10000} step={1000} min={1000} max={100000} unit="₱" unitPosition="left" />
      </div>
    </div>
  ),
};
