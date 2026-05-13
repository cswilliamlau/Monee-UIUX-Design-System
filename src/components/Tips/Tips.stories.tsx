import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tips } from './Tips';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tips> = {
  title: 'Feedback/Tips',
  component: Tips,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Tips

Contextual inline message for guidance, warnings, and status feedback.

**Status**: \`info\` · \`info-grey\` · \`warning\` · \`error\` · \`success\` · \`shopee\` · \`bank\`
**Mode**: \`full-width\` (edge-to-edge, no radius) · \`card\` (rounded, inset)
**Outlined**: adds a 1px coloured border
**Action**: \`arrow\` · \`close\` · \`button\` · \`none\`

### Quick usage
\`\`\`tsx
import { Tips } from '@monee/design-system';

<Tips status="info" content="Your card details have been saved." />
<Tips status="warning" title="Heads up" content="This action will expire in 24 hours." action="arrow" />
<Tips status="error" content="Payment failed." outlined action="button" actionLabel="Retry" />
<Tips status="success" mode="card" content="Verification complete." outlined />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    status:   { control: 'select', options: ['info', 'info-grey', 'warning', 'error', 'success', 'shopee', 'bank'] },
    mode:     { control: 'radio',  options: ['full-width', 'card'] },
    outlined: { control: 'boolean' },
    action:   { control: 'radio',  options: ['none', 'arrow', 'close', 'button'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tips>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: 375 }}><Story /></div>],
  args: {
    status:      'info',
    mode:        'full-width',
    outlined:    false,
    title:       'This is a normal message title',
    content:     'Tips content tips content tips content tips content tips content.',
    action:      'arrow',
    actionLabel: 'Action',
  },
};

// ─── Status × Action ─────────────────────────────────────────────────────────

const STATUSES = ['info', 'info-grey', 'warning', 'error', 'success', 'shopee', 'bank'] as const;
const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
    {children}
  </span>
);

export const AllStatuses: Story = {
  name: 'All Statuses — No Outlined',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 375 }}>
      {STATUSES.map((s) => (
        <Tips key={s} status={s} content="Tips content tips content tips content tips content." action="arrow" />
      ))}
    </div>
  ),
};

export const AllStatusesOutlined: Story = {
  name: 'All Statuses — Outlined',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 375 }}>
      {STATUSES.map((s) => (
        <Tips key={s} status={s} outlined content="Tips content tips content tips content tips content." action="arrow" />
      ))}
    </div>
  ),
};

// ─── With Title ───────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  name: 'With Title',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 375 }}>
      {(['info', 'warning', 'error', 'success'] as const).map((s) => (
        <Tips key={s} status={s} title="This is a normal message title" content="Tips content tips content tips content tips content tips content." action="arrow" />
      ))}
    </div>
  ),
};

// ─── Action variants ─────────────────────────────────────────────────────────

export const Actions: Story = {
  name: 'Right Actions — Arrow / Close / Button',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 375 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Arrow</Label>
        <Tips status="info" content="Navigate to more details." action="arrow" />
        <Tips status="warning" content="Check your settings before continuing." action="arrow" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Close</Label>
        <Tips status="error" content="An error occurred. Dismiss this message." action="close" />
        <Tips status="success" content="Verification complete." action="close" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>Button</Label>
        <Tips status="shopee" content="Your ShopeePay cashback is ready." action="button" actionLabel="Claim" />
        <Tips status="bank" content="Complete your KYC to unlock all features." action="button" actionLabel="Verify" />
      </div>
    </div>
  ),
};

// ─── Mode: full-width vs card ─────────────────────────────────────────────────

export const Modes: Story = {
  name: 'Mode — Full Width vs Card',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>Full Width (edge-to-edge, no radius)</Label>
        <div style={{ width: 375, background: '#f8f8f8' }}>
          <Tips status="info" mode="full-width" content="This tip spans the full width." action="arrow" />
        </div>
        <div style={{ width: 375, background: '#f8f8f8' }}>
          <Tips status="warning" mode="full-width" outlined content="This tip spans the full width with border." action="arrow" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>Card (rounded, used inside a container)</Label>
        <div style={{ width: 375, background: '#f8f8f8', padding: 16, borderRadius: 12 }}>
          <Tips status="info" mode="card" content="Embedded tip inside a card." action="arrow" />
        </div>
        <div style={{ width: 375, background: '#f8f8f8', padding: 16, borderRadius: 12 }}>
          <Tips status="success" mode="card" outlined content="Embedded tip with border inside a card." />
        </div>
      </div>
    </div>
  ),
};

// ─── Brand Tips ──────────────────────────────────────────────────────────────

export const BrandTips: Story = {
  name: 'Brand Announcement Tips — Shopee & Bank',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 375 }}>
      <Tips status="shopee" title="Exclusive Shopee Offer" content="Get 10% cashback on your next ShopeePay top-up. Valid until end of month." action="arrow" />
      <Tips status="shopee" outlined title="Exclusive Shopee Offer" content="Get 10% cashback on your next ShopeePay top-up. Valid until end of month." action="arrow" />
      <Tips status="bank" title="MariBank Promotion" content="Apply for a credit limit increase and enjoy exclusive benefits today." action="button" actionLabel="Apply" />
      <Tips status="bank" outlined title="MariBank Promotion" content="Apply for a credit limit increase and enjoy exclusive benefits today." action="button" actionLabel="Apply" />
    </div>
  ),
};
