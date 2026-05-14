import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextInput } from './TextInput';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TextInput> = {
  title: 'Input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Text Input

Single-line text field in two layout variants and five states.

| Variant      | Behaviour |
|---|---|
| \`default\`    | Label acts as placeholder; no floating |
| \`withLabel\`  | Label floats above when focused or filled |

| State      | Visual |
|---|---|
| \`enabled\`  | Default gray field |
| \`error\`    | Pink tint + red bottom border + red helper text |
| \`warning\`  | Yellow tint + amber bottom border + amber helper text |
| \`disabled\` | Dimmed, non-interactive |

### Quick usage
\`\`\`tsx
import { TextInput } from '@monee/design-system';

const [val, setVal] = useState('');

<TextInput
  label="Email"
  variant="withLabel"
  value={val}
  onChange={setVal}
  hintText="We'll never share your email."
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant:  { control: 'radio',   options: ['default', 'withLabel'] },
    state:    { control: 'radio',   options: ['enabled', 'error', 'warning', 'disabled'] },
    size:     { control: 'radio',   options: ['default', 'small'] },
    password: { control: 'boolean' },
    showClear:{ control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// ─── Controlled wrapper ───────────────────────────────────────────────────────

const Controlled: React.FC<React.ComponentProps<typeof TextInput>> = (props) => {
  const [val, setVal] = useState(props.value ?? '');
  return <TextInput {...props} value={val} onChange={setVal} />;
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label:    'Label',
    variant:  'default',
    state:    'enabled',
    size:     'default',
    hintText: 'Hint text',
    password: false,
    showClear: true,
  },
  decorators: [(Story) => <div style={{ width: 375, padding: 16 }}><Story /></div>],
};

// ─── All states — default variant ────────────────────────────────────────────

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <div style={{ fontSize: 10, color: '#999', padding: '6px 0', marginBottom: 4 }}>{label}</div>
    {children}
  </div>
);

export const DefaultVariantStates: Story = {
  name: 'Default — All States',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 20, padding: 16 }}>
      <Row label="Enabled (label text)">
        <Controlled label="Label" variant="default" hintText="Hint text" showClear />
      </Row>
      <Row label="Enabled (input text)">
        <Controlled label="Label" variant="default" value="Input Text" hintText="Hint text" showClear />
      </Row>
      <Row label="Error">
        <Controlled label="Label" variant="default" state="error" helperText="Error text" showClear />
      </Row>
      <Row label="Warning">
        <Controlled label="Label" variant="default" state="warning" helperText="Warning text" showClear />
      </Row>
      <Row label="Disabled">
        <TextInput label="Label" variant="default" state="disabled" hintText="Hint text" />
      </Row>
    </div>
  ),
};

// ─── All states — withLabel variant ──────────────────────────────────────────

export const WithLabelVariantStates: Story = {
  name: 'WithLabel — All States',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 20, padding: 16 }}>
      <Row label="Enabled (empty — label as placeholder)">
        <Controlled label="Label" variant="withLabel" hintText="Hint text" showClear />
      </Row>
      <Row label="Filled (label floated up)">
        <Controlled label="Label" variant="withLabel" value="Input Text" hintText="Hint text" showClear />
      </Row>
      <Row label="Error">
        <Controlled label="Label" variant="withLabel" state="error" value="Input Text" helperText="Error text" showClear />
      </Row>
      <Row label="Warning">
        <Controlled label="Label" variant="withLabel" state="warning" value="Input Text" helperText="Warning text" showClear />
      </Row>
      <Row label="Disabled">
        <TextInput label="Label" variant="withLabel" state="disabled" value="Input Text" hintText="Hint text" />
      </Row>
    </div>
  ),
};

// ─── Small size ───────────────────────────────────────────────────────────────

export const SmallSize: Story = {
  name: 'Small Size',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <Row label="Default / small / enabled">
        <Controlled label="Label" size="small" showClear />
      </Row>
      <Row label="Default / small / error">
        <Controlled label="Label" size="small" state="error" helperText="Error text" showClear />
      </Row>
      <Row label="WithLabel / small / enabled">
        <Controlled label="Label" variant="withLabel" size="small" showClear />
      </Row>
      <Row label="WithLabel / small / filled">
        <Controlled label="Label" variant="withLabel" size="small" value="Input Text" showClear />
      </Row>
    </div>
  ),
};

// ─── Password field ───────────────────────────────────────────────────────────

export const PasswordField: Story = {
  name: 'Password Field',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <Row label="Default / password">
        <Controlled label="Password" password hintText="Min 8 characters" />
      </Row>
      <Row label="WithLabel / password">
        <Controlled label="Password" variant="withLabel" password hintText="Min 8 characters" />
      </Row>
    </div>
  ),
};

// ─── Real-world examples ──────────────────────────────────────────────────────

export const RealWorldExamples: Story = {
  name: 'Real-world Examples',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 20, padding: 16 }}>
      <Controlled label="Full Name" variant="withLabel" showClear />
      <Controlled label="Email Address" variant="withLabel" showClear hintText="e.g. name@example.com" />
      <Controlled label="Password" variant="withLabel" password />
      <Controlled label="Phone Number" variant="withLabel" showClear hintText="+62 xxx xxxx xxxx" />
      <Controlled
        label="Promo Code"
        variant="default"
        state="error"
        value="INVALID123"
        helperText="Promo code is not valid or expired."
        showClear
      />
    </div>
  ),
};
