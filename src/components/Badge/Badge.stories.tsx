import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Badge> = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Badge

Small indicator element placed on top of icons, list items, tabs, and entry buttons.

Three types: **dot** (unread indicator), **count** (numeric), **new** (text label).
Each has a normal and **inversed** variant for use on coloured surfaces.

### Quick usage
\`\`\`tsx
import { Badge } from '@monee/design-system';

<Badge type="dot" />                    // red dot
<Badge type="count" count={3} />        // "3"
<Badge type="count" count={120} />      // "99+"
<Badge type="new" />                    // "New"
<Badge type="new" inversed />           // white "New" on orange background
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type:     { control: 'radio',   options: ['dot', 'count', 'new'] },
    count:    { control: 'number' },
    inversed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    type:     'count',
    count:    3,
    inversed: false,
  },
};

// ─── All Types ────────────────────────────────────────────────────────────────

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
    {children}
  </span>
);

export const AllTypes: Story = {
  name: 'All Types — Normal',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Dot</Label>
        <Badge type="dot" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Count 1</Label>
        <Badge type="count" count={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Count 2+</Label>
        <Badge type="count" count={99} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Count 99+</Label>
        <Badge type="count" count={120} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>New</Label>
        <Badge type="new" />
      </div>
    </div>
  ),
};

// ─── Inversed ─────────────────────────────────────────────────────────────────

export const Inversed: Story = {
  name: 'All Types — Inversed (on colour)',
  render: () => (
    <div style={{ background: '#ee4d2d', padding: 24, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Dot</Label>
        <Badge type="dot" inversed />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Count 1</Label>
        <Badge type="count" count={1} inversed />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>Count 99+</Label>
        <Badge type="count" count={120} inversed />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Label>New</Label>
        <Badge type="new" inversed />
      </div>
    </div>
  ),
};

// ─── In Context ───────────────────────────────────────────────────────────────

const IconPlaceholder = ({ color = '#ee4d2d' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill={color} opacity="0.15" />
    <rect x="6" y="6" width="12" height="12" rx="2" fill={color} />
  </svg>
);

export const InContext: Story = {
  name: 'In Context — Navigation / List / Tab',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Bottom nav icons */}
      <div>
        <Label>Bottom Navigation Icons</Label>
        <div style={{ display: 'flex', gap: 32, marginTop: 12, alignItems: 'flex-start' }}>
          {/* icon + dot */}
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <IconPlaceholder />
            <span style={{ position: 'absolute', top: -2, right: -2 }}>
              <Badge type="dot" />
            </span>
          </div>
          {/* icon + count 1 */}
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <IconPlaceholder />
            <span style={{ position: 'absolute', top: -6, right: -8 }}>
              <Badge type="count" count={1} />
            </span>
          </div>
          {/* icon + count 99+ */}
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <IconPlaceholder />
            <span style={{ position: 'absolute', top: -6, right: -14 }}>
              <Badge type="count" count={120} />
            </span>
          </div>
        </div>
      </div>

      {/* List row */}
      <div>
        <Label>List Row</Label>
        <div style={{ marginTop: 12, width: 280, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e4e4e4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <IconPlaceholder />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>Promotions</span>
          </div>
          <Badge type="count" count={3} />
        </div>
      </div>

      {/* Entry / Home shortcut */}
      <div>
        <Label>Entry (Home Shortcut)</Label>
        <div style={{ marginTop: 12, display: 'flex', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <IconPlaceholder color="#1fbd6a" />
              <span style={{ position: 'absolute', top: -8, right: -18 }}>
                <Badge type="new" />
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#5b5b5b' }}>Daily Rewards</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <IconPlaceholder color="#fa5e00" />
            <span style={{ fontSize: 11, color: '#5b5b5b' }}>Shopee Food</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <Label>Tabs</Label>
        <div style={{ marginTop: 12, display: 'flex', borderBottom: '1px solid #e4e4e4' }}>
          {[
            { label: 'To Pay', badge: null },
            { label: 'Purchased', badge: <Badge type="count" count={1} /> },
            { label: 'Expired', badge: null },
            { label: 'Cancelled', badge: <Badge type="dot" /> },
          ].map(({ label, badge }) => (
            <div key={label} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: '#5b5b5b', whiteSpace: 'nowrap' }}>
              {label}{badge}
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};
