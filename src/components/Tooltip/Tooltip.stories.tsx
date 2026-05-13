import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Tooltip

Two types: **basic** (dark overlay pill, quick label) and **onboarding** (white card with title, content, step counter and nav buttons).

12 arrow positions control which edge and alignment the caret appears on.

### Quick usage
\`\`\`tsx
import { Tooltip } from '@monee/design-system';

// Basic dark tooltip, arrow points up (tooltip sits below anchor)
<Tooltip type="basic" content="This is a hint." position="bottom-center" />

// Onboarding step tooltip
<Tooltip
  type="onboarding"
  position="bottom-center"
  title="Title content"
  content="Please input content here."
  step="1/3"
  onSkip={() => {}}
  onNext={() => {}}
/>

// Onboarding — outlined (brand + border)
<Tooltip type="onboarding" variant="brand" outlined position="top-right"
  title="Title content" content="Please input content here."
  step="2/3" onSkip={() => {}} onNext={() => {}} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type:     { control: 'radio',   options: ['basic', 'onboarding'] },
    variant:  { control: 'radio',   options: ['default', 'brand'] },
    outlined: { control: 'boolean' },
    position: { control: 'select', options: [
      'bottom-center', 'bottom-left', 'bottom-right',
      'top-center', 'top-left', 'top-right',
      'left-center', 'left-top', 'left-bottom',
      'right-center', 'right-top', 'right-bottom',
    ]},
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
    {children}
  </span>
);

// Anchor button to show context
const Anchor = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 6, background: '#ee4d2d', color: '#fff', fontSize: 14 }}>
    {children}
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    type:      'onboarding',
    variant:   'default',
    position:  'bottom-center',
    title:     'Title content',
    content:   'Please input content here.',
    step:      '1/3',
    skipLabel: 'Skip',
    nextLabel: 'Next',
  },
  decorators: [(Story) => (
    <div style={{ padding: 40 }}>
      <Story />
    </div>
  )],
};

// ─── Basic Tooltip ────────────────────────────────────────────────────────────

export const BasicTooltip: Story = {
  name: 'Basic — Arrow Positions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 20 }}>

      <div>
        <Label>Pointing Up (tooltip below anchor)</Label>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {(['bottom-center', 'bottom-left', 'bottom-right'] as const).map((p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{p}</span>
              <Tooltip type="basic" position={p} content="Please input content here." />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Pointing Down (tooltip above anchor)</Label>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {(['top-center', 'top-left', 'top-right'] as const).map((p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: '#a3a3a3' }}>{p}</span>
              <Tooltip type="basic" position={p} content="Please input content here." />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Side Arrows</Label>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          {(['left-center', 'left-top', 'left-bottom', 'right-center', 'right-top', 'right-bottom'] as const).map((p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: '#a3a3a3' }}>{p}</span>
              <Tooltip type="basic" position={p} content="Please input content here." />
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};

// ─── Onboarding — Default ─────────────────────────────────────────────────────

export const OnboardingDefault: Story = {
  name: 'Onboarding — Default (white bg, black title)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 20 }}>
      <div>
        <Label>Pointing Up — bottom positions</Label>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {(['bottom-center', 'bottom-left', 'bottom-right'] as const).map((p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{p}</span>
              <Tooltip type="onboarding" position={p} title="Title content" content="Please input content here." step="1/3" onSkip={() => {}} onNext={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Pointing Down — top positions</Label>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {(['top-center', 'top-left', 'top-right'] as const).map((p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{p}</span>
              <Tooltip type="onboarding" position={p} title="Title content" content="Please input content here." step="2/3" onSkip={() => {}} onNext={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Side positions</Label>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {(['left-center', 'right-center'] as const).map((p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{p}</span>
              <Tooltip type="onboarding" position={p} title="Title content" content="Please input content here." step="3/3" onSkip={() => {}} onNext={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const OnboardingBrand: Story = {
  name: 'Onboarding — Brand (white bg, orange title)',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 20 }}>
      {(['bottom-center', 'top-center', 'left-center', 'right-center'] as const).map((p) => (
        <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{p}</span>
          <Tooltip type="onboarding" variant="brand" position={p} title="Title content" content="Please input content here." step="1/3" onSkip={() => {}} onNext={() => {}} />
        </div>
      ))}
    </div>
  ),
};

// ─── Onboarding — Outlined ────────────────────────────────────────────────────

export const OnboardingOutlined: Story = {
  name: 'Onboarding — Outlined',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 20 }}>
      {(['bottom-center', 'top-center', 'left-center', 'right-center'] as const).map((p) => (
        <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 9, color: '#a3a3a3', textAlign: 'center' }}>{p}</span>
          <Tooltip type="onboarding" variant="brand" outlined position={p} title="Title content" content="Please input content here." step="1/3" onSkip={() => {}} onNext={() => {}} />
        </div>
      ))}
    </div>
  ),
};

// ─── In Context ──────────────────────────────────────────────────────────────

export const InContext: Story = {
  name: 'In Context — Attached to Anchor',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 40, alignItems: 'flex-start' }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Basic — hovers below an icon</Label>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Anchor>?</Anchor>
          <Tooltip type="basic" position="bottom-center" content="Tap to get help" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Onboarding — guides a button</Label>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <Tooltip type="onboarding" position="bottom-center" title="Daily Rewards" content="Tap here every day to collect your rewards points." step="1/4" onSkip={() => {}} onNext={() => {}} />
          <Anchor>🎁</Anchor>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Onboarding outlined — side arrow</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <Anchor>+</Anchor>
          <Tooltip type="onboarding" variant="brand" outlined position="right-center" title="Add a Card" content="Link your card to start making payments instantly." step="2/4" onSkip={() => {}} onNext={() => {}} />
        </div>
      </div>

    </div>
  ),
};
