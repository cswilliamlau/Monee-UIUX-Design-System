import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toast } from './Toast';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Toast

Non-blocking status notification that appears briefly without interrupting the user. Supports four statuses (\`success\`, \`warning\`, \`fail\`, \`none\`) and two icon styles (\`color\`, \`white\`).

### Quick usage
\`\`\`tsx
import { Toast } from '@monee/design-system';

<Toast status="success" message="Your changes were saved." />
<Toast status="warning" variant="white" message="Connection is slow." />
<Toast status="fail"    message="Something went wrong. Please try again." />
<Toast status="none"    message="Loading complete." />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    status:  { control: 'radio',  options: ['success', 'warning', 'fail', 'none'] },
    variant: { control: 'radio',  options: ['color', 'white'] },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
    {children}
  </span>
);

const SAMPLE_MSG = "Toasts appear without warning, but they don't block users from interacting with page content. It should stay visible long enough for the user to process the information but not too long to feel intrusive. Only one toast can appear at a time.";

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    status:  'success',
    variant: 'color',
    message: SAMPLE_MSG,
  },
  decorators: [(Story) => (
    <div style={{ padding: 40 }}>
      <Story />
    </div>
  )],
};

// ─── Color Variant ────────────────────────────────────────────────────────────

export const ColorVariant: Story = {
  name: 'Icon Style — Color',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 20 }}>
      {(['success', 'warning', 'fail'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{s}</Label>
          <Toast status={s} variant="color" message={SAMPLE_MSG} />
        </div>
      ))}
    </div>
  ),
};

// ─── White Variant ────────────────────────────────────────────────────────────

export const WhiteVariant: Story = {
  name: 'Icon Style — White',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 20 }}>
      {(['success', 'warning', 'fail'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{s}</Label>
          <Toast status={s} variant="white" message={SAMPLE_MSG} />
        </div>
      ))}
    </div>
  ),
};

// ─── No Icon ──────────────────────────────────────────────────────────────────

export const NoIcon: Story = {
  name: 'No Icon',
  render: () => (
    <div style={{ padding: 20 }}>
      <Label>status="none"</Label>
      <Toast status="none" message={SAMPLE_MSG} />
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 20 }}>

      <div>
        <Label>Color icons</Label>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {(['success', 'warning', 'fail', 'none'] as const).map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{s}</span>
              <Toast status={s} variant="color" message={SAMPLE_MSG} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>White icons</Label>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {(['success', 'warning', 'fail'] as const).map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{s}</span>
              <Toast status={s} variant="white" message={SAMPLE_MSG} />
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};
