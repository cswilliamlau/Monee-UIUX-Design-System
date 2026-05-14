import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StepBar } from './StepBar';
import type { StepItem } from './StepBar';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof StepBar> = {
  title: 'Navigation/StepBar',
  component: StepBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Step Bar

A progress step indicator in **vertical** or **horizontal** orientation.

| Status   | Indicator            | Text colour |
|----------|----------------------|-------------|
| \`done\`   | Orange hollow ring   | Primary     |
| \`doing\`  | Orange solid dot     | Shopee orange (active) |
| \`not-yet\`| Gray hollow ring     | Tertiary    |

### Quick usage
\`\`\`tsx
import { StepBar } from '@monee/design-system';

<StepBar
  steps={[
    { key: '1', status: 'done',    title: 'Submitted',  subtitle: 'Apr 08, 12:30' },
    { key: '2', status: 'doing',   title: 'Processing', subtitle: 'In progress' },
    { key: '3', status: 'not-yet', title: 'Completed' },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
};

export default meta;
type Story = StoryObj<typeof StepBar>;

// ─── Sample data ───────────────────────────────────────────────────────────────

const VERTICAL_STEPS: StepItem[] = [
  { key: '1', status: 'done',    title: 'Payment Submitted',  subtitle: 'Submitted on 08 Apr 2021, 12:30' },
  { key: '2', status: 'doing',   title: 'Payment Processing', subtitle: 'Submitted on 08 Apr 2021, 12:30' },
  { key: '3', status: 'not-yet', title: 'Payment Completed',  subtitle: 'Submitted on 08 Apr 2021, 12:30' },
  { key: '4', status: 'not-yet', title: 'Payment Received',   subtitle: 'Submitted on 08 Apr 2021, 12:30' },
];

const HORIZONTAL_STEPS: StepItem[] = [
  { key: '1', status: 'done',    label: 'Title' },
  { key: '2', status: 'done',    label: 'Title' },
  { key: '3', status: 'doing',   label: 'Title' },
  { key: '4', status: 'not-yet', label: 'Title' },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    steps:       VERTICAL_STEPS,
    orientation: 'vertical',
  },
  decorators: [(Story) => <div style={{ width: 375, padding: 16, background: '#fff' }}><Story /></div>],
};

// ─── Vertical — 4 steps ───────────────────────────────────────────────────────

export const Vertical4Steps: Story = {
  name: 'Vertical — 4 Steps',
  render: () => (
    <div style={{ width: 375, padding: 16, background: '#fff' }}>
      <StepBar steps={VERTICAL_STEPS} orientation="vertical" />
    </div>
  ),
};

// ─── Vertical — all statuses ──────────────────────────────────────────────────

export const VerticalAllStatuses: Story = {
  name: 'Vertical — All Statuses',
  render: () => (
    <div style={{ width: 375, padding: 16, background: '#fff' }}>
      <StepBar
        orientation="vertical"
        steps={[
          { key: 'done',    status: 'done',    title: 'Payment Submitted',  subtitle: 'Submitted on 08 Apr 2021, 12:30' },
          { key: 'doing',   status: 'doing',   title: 'Payment Processing', subtitle: 'Submitted on 08 Apr 2021, 12:30' },
          { key: 'notyet',  status: 'not-yet', title: 'Payment Completed',  subtitle: 'Submitted on 08 Apr 2021, 12:30' },
        ]}
      />
    </div>
  ),
};

// ─── Horizontal ───────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Horizontal — 4 Steps',
  render: () => (
    <div style={{ width: 375, background: '#fff', paddingTop: 12, paddingBottom: 12 }}>
      <StepBar steps={HORIZONTAL_STEPS} orientation="horizontal" />
    </div>
  ),
};

// ─── Horizontal — step variations ─────────────────────────────────────────────

export const HorizontalVariations: Story = {
  name: 'Horizontal — Step Variations',
  render: () => {
    const row = (steps: StepItem[], label: string) => (
      <div>
        <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>{label}</div>
        <div style={{ background: '#fff' }}>
          <StepBar steps={steps} orientation="horizontal" />
        </div>
      </div>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 375 }}>
        {row(
          [
            { key: '1', status: 'doing',   label: 'Step 1' },
            { key: '2', status: 'not-yet', label: 'Step 2' },
            { key: '3', status: 'not-yet', label: 'Step 3' },
          ],
          'Step 1 active',
        )}
        {row(
          [
            { key: '1', status: 'done',    label: 'Step 1' },
            { key: '2', status: 'doing',   label: 'Step 2' },
            { key: '3', status: 'not-yet', label: 'Step 3' },
          ],
          'Step 2 active',
        )}
        {row(
          [
            { key: '1', status: 'done',  label: 'Step 1' },
            { key: '2', status: 'done',  label: 'Step 2' },
            { key: '3', status: 'doing', label: 'Step 3' },
          ],
          'Step 3 active (last)',
        )}
        {row(
          [
            { key: '1', status: 'done',    label: 'Title' },
            { key: '2', status: 'done',    label: 'Title' },
            { key: '3', status: 'doing',   label: 'Title' },
            { key: '4', status: 'not-yet', label: 'Title' },
          ],
          '4 steps — step 3 active',
        )}
      </div>
    );
  },
};

// ─── All layouts ──────────────────────────────────────────────────────────────

export const BothOrientations: Story = {
  name: 'Both Orientations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 375 }}>
      <div>
        <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>Vertical</div>
        <div style={{ background: '#fff', padding: '12px 16px' }}>
          <StepBar steps={VERTICAL_STEPS} orientation="vertical" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>Horizontal</div>
        <div style={{ background: '#fff', padding: '12px 0' }}>
          <StepBar steps={HORIZONTAL_STEPS} orientation="horizontal" />
        </div>
      </div>
    </div>
  ),
};
